<?php

use App\Mail\QuoteReceivedConfirmation;
use App\Mail\QuoteRequestSent;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\Mail;

uses(WithoutMiddleware::class);

test('the quote page is displayed', function () {
    $this->get(route('quote'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('frontend/quote'));
});

test('a quote request can be submitted', function () {
    Mail::fake();

    $data = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+27821234567',
        'message' => 'This is a test message.',
    ];

    $this->post(route('quote.store'), $data)
        ->assertRedirect(route('quote'))
        ->assertSessionHas('success', 'Thank you for your quote request! We will get back to you shortly.');

    Mail::assertSent(QuoteRequestSent::class, function (QuoteRequestSent $mail) use ($data) {
        return $mail->hasTo(config('mail.from.address')) &&
               $mail->data == $data;
    });

    Mail::assertSent(QuoteReceivedConfirmation::class, function (QuoteReceivedConfirmation $mail) use ($data) {
        return $mail->hasTo($data['email']) &&
               $mail->data == $data;
    });

    $this->assertDatabaseHas('clients', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+27821234567',
    ]);

    $client = \App\Models\Client::where('email', 'john@example.com')->first();
    $this->assertDatabaseHas('quotes', [
        'client_id' => $client->id,
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+27821234567',
    ]);

    $quote = \App\Models\Quote::first();
    expect($quote->message)->toBe([
        'text' => 'This is a test message.',
        'windows' => [],
    ]);
    expect($quote->client_id)->toBe($client->id);

    // Test that submitting again with same email doesn't create a new client
    $data2 = [
        'name' => 'John Updated',
        'email' => 'john@example.com',
        'phone' => '+27821111111',
        'message' => 'Second message',
    ];

    $this->post(route('quote.store'), $data2);

    expect(\App\Models\Client::count())->toBe(1);
    $client->refresh();
    expect($client->name)->toBe('John Updated');
    expect($client->phone)->toBe('+27821111111');
    expect(\App\Models\Quote::count())->toBe(2);
    expect(\App\Models\Quote::latest()->first()->client_id)->toBe($client->id);
});

test('a quote request fails validation with invalid data', function () {
    Mail::fake();

    $this->post(route('quote.store'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => 'invalid-phone',
        'message' => 'This is a test message.',
    ])
        ->assertRedirect()
        ->assertSessionHasErrors(['phone']);

    Mail::assertNothingSent();
});

test('a quote request fails validation when phone number is null', function () {
    Mail::fake();

    $data = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => null,
        'message' => 'This is a test message with a null phone number.',
    ];

    $this->post(route('quote.store'), $data)
        ->assertRedirect()
        ->assertSessionHasErrors(['phone']);

    Mail::assertNothingSent();
});

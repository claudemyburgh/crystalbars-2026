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

    $this->assertDatabaseHas('quotes', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+27821234567',
    ]);

    $quote = \App\Models\Quote::first();
    expect($quote->message)->toBe([
        'text' => 'This is a test message.',
        'windows' => [],
    ]);
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

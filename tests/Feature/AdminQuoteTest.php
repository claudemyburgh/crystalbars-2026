<?php

use App\Mail\AdminQuoteReply;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view quote list', function () {
    $admin = User::factory()->create();
    $quote = Quote::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.quotes.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/quotes/index')
            ->has('quotes', 1)
        );
});

test('admin can view a quote and it is marked as read', function () {
    $admin = User::factory()->create();
    $quote = Quote::factory()->create(['read_at' => null]);

    $this->actingAs($admin)
        ->get(route('admin.quotes.show', $quote))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/quotes/show')
            ->has('quote', fn (Assert $page) => $page
                ->where('id', $quote->id)
                ->where('name', $quote->name)
                ->etc()
            )
        );

    expect($quote->fresh()->read_at)->not->toBeNull();
});

test('admin can reply to a quote', function () {
    Mail::fake();

    $admin = User::factory()->create();
    $quote = Quote::factory()->create([
        'email' => 'customer@example.com',
        'replied_at' => null,
    ]);

    $replyMessage = 'This is our response to your quote.';

    $this->actingAs($admin)
        ->post(route('admin.quotes.reply', $quote), [
            'message' => $replyMessage,
        ])
        ->assertRedirect(route('admin.quotes.show', $quote))
        ->assertSessionHas('success', 'Reply sent successfully.');

    expect($quote->fresh()->replied_at)->not->toBeNull();

    Mail::assertSent(AdminQuoteReply::class, function (AdminQuoteReply $mail) use ($quote, $replyMessage) {
        return $mail->hasTo($quote->email) &&
               $mail->quote->id === $quote->id &&
               $mail->replyMessage === $replyMessage;
    });
});

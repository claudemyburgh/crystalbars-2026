<?php

namespace App\Listeners;

use App\Events\QuoteSubmitted;
use App\Models\Quote;

class SaveQuoteToDatabase
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(QuoteSubmitted $event): void
    {
        Quote::create([
            'name' => $event->data['name'],
            'email' => $event->data['email'],
            'phone' => $event->data['phone'],
            'message' => [
                'text' => $event->data['message'],
                'windows' => $event->data['windows'] ?? [],
            ],
        ]);
    }
}

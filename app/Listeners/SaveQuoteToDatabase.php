<?php

namespace App\Listeners;

use App\Events\QuoteSubmitted;

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
        $client = \App\Models\Client::updateOrCreate(
            ['email' => $event->data['email']],
            [
                'name' => $event->data['name'],
                'phone' => $event->data['phone'],
            ]
        );

        \App\Models\Quote::create([
            'client_id' => $client->id,
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

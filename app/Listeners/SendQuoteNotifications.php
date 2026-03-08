<?php

namespace App\Listeners;

use App\Events\QuoteSubmitted;
use App\Mail\QuoteReceivedConfirmation;
use App\Mail\QuoteRequestSent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendQuoteNotifications implements ShouldQueue
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
        Mail::to(config('mail.from.address'))->send(new QuoteRequestSent($event->data));
        Mail::to($event->data['email'])->send(new QuoteReceivedConfirmation($event->data));
    }
}

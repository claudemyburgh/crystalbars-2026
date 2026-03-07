<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendQuoteRequest;
use App\Mail\QuoteRequestSent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('frontend/quote');
    }

    public function store(SendQuoteRequest $request): RedirectResponse
    {
        Mail::to(config('mail.from.address'))->send(new QuoteRequestSent($request->validated()));

        return redirect()->route('quote')->with('success', 'Thank you for your quote request! We will get back to you shortly.');
    }
}

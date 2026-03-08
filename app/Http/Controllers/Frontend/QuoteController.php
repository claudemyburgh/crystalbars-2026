<?php

namespace App\Http\Controllers\Frontend;

use App\Events\QuoteSubmitted;
use App\Http\Controllers\Controller;
use App\Http\Requests\SendQuoteRequest;
use Illuminate\Http\RedirectResponse;
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
        $validated = $request->validated();

        QuoteSubmitted::dispatch($validated);

        return redirect()->route('quote')->with('success', 'Thank you for your quote request! We will get back to you shortly.');
    }
}

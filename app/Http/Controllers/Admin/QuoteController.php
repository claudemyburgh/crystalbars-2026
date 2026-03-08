<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AdminQuoteReply;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function index(): Response
    {
        $quotes = Quote::latest()->get();

        return Inertia::render('admin/quotes/index', [
            'quotes' => $quotes,
        ]);
    }

    public function show(Quote $quote): Response
    {
        if (is_null($quote->read_at)) {
            $quote->update(['read_at' => now()]);
        }

        return Inertia::render('admin/quotes/show', [
            'quote' => $quote,
        ]);
    }

    public function reply(Request $request, Quote $quote): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        Mail::to($quote->email)->send(new AdminQuoteReply($quote, $validated['message']));

        $quote->update(['replied_at' => now()]);

        return redirect()->route('admin.quotes.show', $quote)->with('success', 'Reply sent successfully.');
    }
}

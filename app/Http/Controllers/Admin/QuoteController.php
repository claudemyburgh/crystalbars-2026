<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AdminQuoteReply;
use App\Models\Quote;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');
        $status = $request->input('status');

        $quotes = Quote::query()
            ->when($search, function (Builder $query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('name', 'like', "%{$value}%")
                        ->orWhere('email', 'like', "%{$value}%")
                        ->orWhere('phone', 'like', "%{$value}%");
                });
            })
            ->when($status === 'unread', fn (Builder $q) => $q->whereNull('read_at'))
            ->when($status === 'read', fn (Builder $q) => $q->whereNotNull('read_at')->whereNull('replied_at'))
            ->when($status === 'replied', fn (Builder $q) => $q->whereNotNull('replied_at'))
            ->orderBy($sort, $direction)
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/quotes/index', [
            'quotes' => $quotes,
            'filters' => [
                'search' => $request->query('search', ''),
                'sort' => $request->query('sort', 'created_at'),
                'direction' => $request->query('direction', 'desc'),
                'status' => $request->query('status', ''),
            ],
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

    public function destroy(Quote $quote): RedirectResponse
    {
        $quote->delete();

        return redirect()->back()->with('success', 'Quote deleted successfully.');
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:quotes,id',
        ]);

        Quote::whereIn('id', $validated['ids'])->delete();

        return redirect()->back()->with('success', 'Quotes deleted successfully.');
    }
}

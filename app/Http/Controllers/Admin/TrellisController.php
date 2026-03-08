<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Trellis;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrellisController extends Controller
{
    public function index(): Response
    {
        $trellisItems = Trellis::query()
            ->orderBy('order_column')
            ->get(['id', 'width', 'drop', 'price', 'order_column']);

        return Inertia::render('admin/trellis/index', [
            'trellisItems' => $trellisItems,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'width' => ['required', 'string', 'max:255'],
            'drop' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:255'],
        ]);

        Trellis::create($validated);

        return redirect()->route('trellis.index')
            ->with('success', 'Trellis item created successfully.');
    }

    public function update(Request $request, Trellis $trellis): RedirectResponse
    {
        $validated = $request->validate([
            'width' => ['required', 'string', 'max:255'],
            'drop' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:255'],
        ]);

        $trellis->update($validated);

        return redirect()->route('trellis.index')
            ->with('success', 'Trellis item updated successfully.');
    }

    public function destroy(Trellis $trellis): RedirectResponse
    {
        $trellis->delete();

        return redirect()->route('trellis.index')
            ->with('success', 'Trellis item deleted successfully.');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'order' => ['required', 'array'],
            'order.*.id' => ['required', 'integer', 'exists:trellis,id'],
            'order.*.order_column' => ['required', 'integer'],
        ]);

        foreach ($request->input('order') as $item) {
            Trellis::where('id', $item['id'])->update(['order_column' => $item['order_column']]);
        }

        return redirect()->route('trellis.index')
            ->with('success', 'Trellis items reordered successfully.');
    }
}

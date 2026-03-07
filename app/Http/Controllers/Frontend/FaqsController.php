<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class FaqsController
{
    public function __invoke(Request $request): Response
    {
        $faqs = Faq::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'question', 'answer']);

        return Inertia::render('frontend/faqs', [
            'faqs' => $faqs,
        ]);
    }
}

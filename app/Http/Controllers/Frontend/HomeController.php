<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

final class HomeController
{
    public function __invoke(Request $request): Response
    {
        $faqs = Faq::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->limit(5)
            ->get();

        return Inertia::render('frontend/home', [
            'canRegister' => Features::enabled(Features::registration()),
            'faqs' => $faqs,
        ]);
    }
}

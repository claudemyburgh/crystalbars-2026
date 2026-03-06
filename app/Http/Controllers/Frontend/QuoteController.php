<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class QuoteController
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('frontend/quote');
    }
}

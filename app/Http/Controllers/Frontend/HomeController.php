<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

final class HomeController
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('frontend/home', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }
}

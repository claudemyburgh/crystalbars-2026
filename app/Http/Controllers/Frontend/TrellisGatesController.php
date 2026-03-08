<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Trellis;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class TrellisGatesController
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('frontend/trellis-gates', [
            'trellises' => Trellis::ordered()->select(['id', 'width', 'drop', 'price'])->get(),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalClients' => Client::query()->count(),
                'totalQuotes' => Quote::query()->count(),
                'unreadQuotes' => Quote::query()->whereNull('read_at')->count(),
            ],
        ]);
    }
}

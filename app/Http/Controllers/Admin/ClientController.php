<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'desc');

        $clients = Client::query()
            ->when($search, function (Builder $query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('name', 'like', "%{$value}%")
                        ->orWhere('email', 'like', "%{$value}%")
                        ->orWhere('phone', 'like', "%{$value}%");
                });
            })
            ->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/clients/index', [
            'clients' => $clients,
            'filters' => [
                'search' => $request->query('search', ''),
                'sort' => $request->query('sort', 'id'),
                'direction' => $request->query('direction', 'desc'),
            ],
        ]);
    }

    public function export(Request $request): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'desc');

        $clients = Client::query()
            ->when($search, function (Builder $query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('name', 'like', "%{$value}%")
                        ->orWhere('email', 'like', "%{$value}%")
                        ->orWhere('phone', 'like', "%{$value}%");
                });
            })
            ->orderBy($sort, $direction)
            ->lazy();

        return response()->streamDownload(function () use ($clients) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'Name', 'Email', 'Phone', 'Created At']);

            foreach ($clients as $client) {
                fputcsv($handle, [
                    $client->id,
                    $client->name,
                    $client->email,
                    $client->phone,
                    $client->created_at->toDateTimeString(),
                ]);
            }

            fclose($handle);
        }, 'clients-export-'.now()->format('Y-m-d').'.csv', [
            'Content-Type' => 'text/csv',
        ]);
    }
}

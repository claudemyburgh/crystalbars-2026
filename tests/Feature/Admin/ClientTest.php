<?php

use App\Models\Client;
use App\Models\Quote;
use App\Models\User;

test('clients index page is displayed', function () {
    $user = User::factory()->create();
    $client = Client::factory()->create(['name' => 'Test Client']);
    Quote::factory()->count(3)->create(['client_id' => $client->id, 'email' => $client->email]);

    $response = $this->actingAs($user)
        ->get(route('admin.clients.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/clients/index')
        ->has('clients.data', 1)
        ->where('clients.data.0.name', 'Test Client')
    );
});

test('clients can be searched', function () {
    $user = User::factory()->create();
    Client::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
    Client::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com']);

    $response = $this->actingAs($user)
        ->get(route('admin.clients.index', ['search' => 'John']));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/clients/index')
        ->has('clients.data', 1)
        ->where('clients.data.0.name', 'John Doe')
    );
});

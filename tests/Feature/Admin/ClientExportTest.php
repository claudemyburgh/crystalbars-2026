<?php

use App\Models\Client;
use App\Models\User;

test('authenticated user can export clients to csv', function () {
    $user = User::factory()->create();
    Client::factory()->count(3)->create();

    $response = $this->actingAs($user)
        ->get(route('admin.clients.export'));

    $response->assertOk();
    $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
    $response->assertHeader('Content-Disposition', 'attachment; filename=clients-export-'.now()->format('Y-m-d').'.csv');
});

test('clients export respects search filters', function () {
    $user = User::factory()->create();
    Client::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
    Client::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com']);

    $response = $this->actingAs($user)
        ->get(route('admin.clients.export', ['search' => 'John']));

    $response->assertOk();
    $content = $response->streamedContent();

    expect($content)->toContain('John Doe');
    expect($content)->not->toContain('Jane Smith');
});

test('clients export respects sort filters', function () {
    $user = User::factory()->create();
    Client::factory()->create(['name' => 'Alice', 'created_at' => now()->subDay()]);
    Client::factory()->create(['name' => 'Zebra', 'created_at' => now()]);

    $response = $this->actingAs($user)
        ->get(route('admin.clients.export', ['sort' => 'name', 'direction' => 'asc']));

    $response->assertOk();
    $content = $response->streamedContent();
    $lines = explode("\n", trim($content));

    // Header is line 0, Alice should be line 1, Zebra should be line 2
    expect($lines[1])->toContain('Alice');
    expect($lines[2])->toContain('Zebra');

    $responseDesc = $this->actingAs($user)
        ->get(route('admin.clients.export', ['sort' => 'name', 'direction' => 'desc']));

    $contentDesc = $responseDesc->streamedContent();
    $linesDesc = explode("\n", trim($contentDesc));

    expect($linesDesc[1])->toContain('Zebra');
    expect($linesDesc[2])->toContain('Alice');
});

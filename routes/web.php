<?php

use App\Http\Controllers\Frontend\FaqsController;
use App\Http\Controllers\Frontend\GalleryController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\QuoteController;
use App\Http\Controllers\Frontend\TrellisGatesController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/trellis-gates', TrellisGatesController::class)->name('trellis.gates');
Route::get('/gallery', GalleryController::class)->name('gallery');
Route::get('/faqs', FaqsController::class)->name('faqs');
Route::get('/quote', [QuoteController::class, 'create'])->name('quote');
Route::post('/quote', [QuoteController::class, 'store'])->name('quote.store');

require __DIR__.'/settings.php';

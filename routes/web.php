<?php

use App\Http\Controllers\Admin\QuoteController as AdminQuoteController;
use App\Http\Controllers\Admin\TrellisController;
use App\Http\Controllers\Frontend\FaqsController;
use App\Http\Controllers\Frontend\GalleryController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\QuoteController;
use App\Http\Controllers\Frontend\TrellisGatesController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::prefix('admin/quotes')->name('admin.quotes.')->group(function () {
        Route::get('/', [AdminQuoteController::class, 'index'])->name('index');
        Route::get('/{quote}', [AdminQuoteController::class, 'show'])->name('show');
        Route::post('/{quote}/reply', [AdminQuoteController::class, 'reply'])->name('reply');
    });

    Route::prefix('admin/trellis')->name('trellis.')->group(function () {
        Route::get('/', [TrellisController::class, 'index'])->name('index');
        Route::post('/', [TrellisController::class, 'store'])->name('store');
        Route::put('/{trellis}', [TrellisController::class, 'update'])->name('update');
        Route::delete('/{trellis}', [TrellisController::class, 'destroy'])->name('destroy');
        Route::post('/reorder', [TrellisController::class, 'reorder'])->name('reorder');
    });
});

Route::get('/trellis-gates', TrellisGatesController::class)->name('trellis.gates');
Route::get('/gallery', GalleryController::class)->name('gallery');
Route::get('/faqs', FaqsController::class)->name('faqs');
Route::get('/quote', [QuoteController::class, 'create'])->name('quote');
Route::post('/quote', [QuoteController::class, 'store'])->name('quote.store');

require __DIR__.'/settings.php';

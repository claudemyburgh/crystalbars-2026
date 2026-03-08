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
    Route::get('dashboard', \App\Http\Controllers\Admin\DashboardController::class)->name('dashboard');
    Route::prefix('admin/clients', [\App\Http\Controllers\Admin\ClientController::class])->name('admin.clients.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Admin\ClientController::class, 'index'])->name('index');
        Route::get('/export', [\App\Http\Controllers\Admin\ClientController::class, 'export'])->name('export');
    });

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

    Route::prefix('admin/galleries')->name('admin.')->group(function () {
        Route::resource('gallery-groups', \App\Http\Controllers\Admin\GalleryGroupController::class);
        Route::post('gallery-groups/{gallery_group}/upload', [\App\Http\Controllers\Admin\GalleryController::class, 'upload'])->name('gallery-groups.upload');
        Route::post('gallery-groups/{gallery_group}/reorder', [\App\Http\Controllers\Admin\GalleryController::class, 'reorder'])->name('gallery-groups.reorder');
        Route::delete('gallery-items/{gallery}', [\App\Http\Controllers\Admin\GalleryController::class, 'destroy'])->name('gallery-items.destroy');
        Route::post('gallery-items/bulk-destroy', [\App\Http\Controllers\Admin\GalleryController::class, 'bulkDestroy'])->name('gallery-items.bulk-destroy');
    });
});

Route::get('/trellis-gates', TrellisGatesController::class)->name('trellis.gates');
Route::get('/gallery', GalleryController::class)->name('gallery');
Route::get('/faqs', FaqsController::class)->name('faqs');
Route::get('/quote', [QuoteController::class, 'create'])->name('quote');
Route::post('/quote', [QuoteController::class, 'store'])->name('quote.store');

require __DIR__.'/settings.php';

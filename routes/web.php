<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductView;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductView::class, 'index'])->name("home");

Route::get("/search", [ProductView::class, 'search'])->name("search");

Route::get("/detail/{product}", [ProductView::class, 'show']);

Route::middleware(['auth', 'checkIsCustomer'])->group(function () {
    Route::resource("/cart", CartController::class);
});

Route::middleware(['auth', 'checkIsAdmin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name("dashboard");

    Route::resource("/dashboard/products", ProductController::class)->except("show");

    Route::get('/dashboard/orders', function () {
        return Inertia::render('Admin/Orders');
    })->name("orders");
});

require __DIR__ . '/auth.php';

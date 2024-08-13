<?php

use App\Http\Controllers\ClothController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name("home");

Route::middleware(['auth', 'checkUser'])->group(function () {
    Route::get("/cart", function () {
        return Inertia::render("Cart");
    });
});

Route::middleware(['auth', 'checkAdmin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name("dashboard");

    Route::resource("/dashboard/products", ClothController::class);

    Route::get('/dashboard/orders', function () {
        return Inertia::render('Admin/Orders');
    })->name("orders");
});

require __DIR__ . '/auth.php';

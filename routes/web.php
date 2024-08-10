<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name("home");

Route::middleware(['auth', 'roleCheck'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name("dashboard");

    Route::get('/products', function () {
        return Inertia::render('Admin/Products');
    })->name("products");

    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders');
    })->name("orders");
});

require __DIR__ . '/auth.php';

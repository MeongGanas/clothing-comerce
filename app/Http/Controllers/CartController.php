<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Cart");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "user_id" => "required|string",
            "product_id" => "required|string",
            "selected_size" => "required|string",
            "amount" => "required|integer",
            "total_price" => "required|integer",
        ]);
        $validatedData["amount"] = intval($request->amount);
        $validatedData["total_price"] = intval($request->total_price);

        Cart::create($validatedData);

        return redirect()->intended(route('cart.index', absolute: false));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Cart;
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

        $cartQuery = Cart::where('product_id', $validatedData["product_id"])
            ->where('user_id', $validatedData["user_id"])
            ->where('selected_size', $validatedData["selected_size"]);

        $existData = $cartQuery->first();

        if (!$existData) {
            Cart::create($validatedData);
        } else {
            $newData = [
                "amount" => $validatedData["amount"] + $existData["amount"],
                "total_price" => $validatedData["total_price"] + $existData["total_price"],
            ];

            $cartQuery->update($newData);
        }

        return redirect()->intended(route('cart.index', absolute: false));
    }

    public function update(Request $request, Cart $cart)
    {
        $validatedData = $request->validate([
            "amount" => "required|integer",
        ]);

        Cart::where('id', $cart->id)->update($validatedData);

        return $request->all();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();

        return redirect()->intended(route('cart.index', absolute: false));
    }
}

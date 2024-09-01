<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductView extends Controller
{
    public function index()
    {
        $query = Product::latest();

        if ($category = request('category')) {
            $query->where('category', $category);
        }

        if ($product = request('product')) {
            $query->where('product', $product);
        }

        return Inertia::render('Products', [
            "products" => $query->paginate(10)
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render("ProductDetail", [
            "product" => $product,
            "recommendation" => Product::where('id', '!=', $product->id)
                ->where('category', '=', $product->category)
                ->where('product', '=', $product->product)
                ->take(8)
                ->get()
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreproductRequest;
use App\Http\Requests\UpdateproductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Product/Products', [
            "products" => Product::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/AddProduct');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|min:2|max:255",
            "description" => "required|string",
            "category" => "required|string",
            "product" => "required|string",
            "color" => "required|string|min:2",
            "caption" => "required|string|min:2|max:255",
            "available_size" => "required|string",
            "price" => "required|string",
            "stocks" => "required|string",
            "isFeatured" => "required|string",
            "isArchived" => "required|string",
            "image" => "required"
        ]);

        Product::create([
            "name" => $request->name,
            "description" => $request->description,
            "category" => $request->category,
            "product" => $request->product,
            "color" => $request->color,
            "caption" => $request->caption,
            "available_size" => $request->available_size,
            "price" => intval($request->price),
            "stocks" => intval($request->stocks),
            "isFeatured" => $request->isFeatured === "true" ? true : false,
            "isArchived" => $request->isArchived === "true" ? true : false,
            "image" => $request->file("image")->store("product-image", 'public')
        ]);

        return redirect()->intended(route('products.index', absolute: false));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Storage::delete($product->image);

        Product::destroy($product->id);

        return redirect("/dashboard/products");
    }
}

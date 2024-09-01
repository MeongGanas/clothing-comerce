<?php

namespace App\Http\Controllers;

use App\Models\Product;
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
        $query = Product::latest();

        if (request('type') && request("type") === "featured") {
            $query->where('isFeatured', 1);
        }

        if (request('type') && request("type") === "archived") {
            $query->where('isArchived', 1);
        }

        if ($category = request("category")) {
            $query->where('category', $category);
        }

        return Inertia::render('Admin/Product/Products', [
            "allProducts" => $query->paginate(10),
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
        $validatedData = $request->validate([
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

        $validatedData["price"] = intval($request->price);
        $validatedData["stocks"] = intval($request->stocks);
        $validatedData["isFeatured"] = $request->isFeatured === "true" ? true : false;
        $validatedData["isArchived"] = $request->isArchived === "true" ? true : false;
        $validatedData["image"] = "/storage/" . $request->file("image")->store("product-image", "public");

        Product::create($validatedData);

        return redirect()->intended(route('products.index', absolute: false));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render("Admin/Product/EditProduct", [
            "product" => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
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
        ]);

        $validatedData["price"] = intval($request->price);
        $validatedData["stocks"] = intval($request->stocks);
        $validatedData["isFeatured"] = $request->isFeatured === "true" ? true : false;
        $validatedData["isArchived"] = $request->isArchived === "true" ? true : false;

        if ($request->has("image")) {
            Storage::delete($product->image);
            $validatedData["image"] = "/storage/" . $request->file("image")->store("product-image", "public");
        }

        Product::where('id', $product->id)->update($validatedData);

        return redirect()->intended(route('products.index', absolute: false));
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

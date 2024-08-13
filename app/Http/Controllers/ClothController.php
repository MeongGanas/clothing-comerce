<?php

namespace App\Http\Controllers;

use App\Models\Cloth;
use App\Http\Requests\StoreClothRequest;
use App\Http\Requests\UpdateClothRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClothController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Product/Products');
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
        return $request->file("image");
    }

    /**
     * Display the specified resource.
     */
    public function show(Cloth $cloth)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cloth $cloth)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cloth $cloth)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cloth $cloth)
    {
        //
    }
}

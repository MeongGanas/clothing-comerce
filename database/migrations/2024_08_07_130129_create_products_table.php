<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("name");
            $table->text("description");
            $table->enum("category", ["man", "women", "kids"]);
            $table->enum("product", ["tshirt", "jacket", "shoes", "pants", "sunglasses", "tuxedo"]);
            $table->boolean("isFeatured");
            $table->boolean("isArchived");
            $table->string("color");
            $table->integer("price");
            $table->integer("stocks");
            $table->string("image");
            $table->timestamps();
        });

        Schema::create('product_colors', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid('product_id');
            $table->string('color');
            $table->timestamps();
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid('product_id');
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cloths');
        Schema::dropIfExists('cloth_colors');
        Schema::dropIfExists('cloth_images');
    }
};

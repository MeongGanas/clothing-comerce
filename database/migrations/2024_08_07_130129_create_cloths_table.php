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
        Schema::create('cloths', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("name");
            $table->string("description");
            $table->enum("category", ["man", "women", "kids"]);
            $table->enum("product", ["tshirt", "jacket", "shoes", "pants", "sunglasses", "tuxedo"]);
            $table->enum("size", ["xs", "s", "m", 'l', 'xl', 'xxl']);
            $table->boolean("isFutured");
            $table->boolean("isArchived");
            $table->string("color");
            $table->integer("price");
            $table->string("image");
            $table->timestamps();
        });

        Schema::create('cloth_colors', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid('product_id');
            $table->string('color');
            $table->timestamps();
        });

        Schema::create('cloth_images', function (Blueprint $table) {
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

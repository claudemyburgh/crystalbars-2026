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
        Schema::table('galleries', function (Blueprint $table) {
            $table->foreignId('gallery_group_id')->after('id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('order_column')->after('gallery_group_id')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('galleries', function (Blueprint $table) {
            $table->dropConstrainedForeignId('gallery_group_id');
            $table->dropColumn('order_column');
        });
    }
};

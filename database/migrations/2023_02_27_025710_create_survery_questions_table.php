<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('survery_questions', function (Blueprint $table) {
            $table->id();
            $table->string('type',45);
            $table->string('question',2000);
            $table->longText('data')->nullable();
            $table->longText('description')->nullable();
            $table->foreignIdFor(\App\Models\Survery::class,'survery_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('survery_questions');
    }
};

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::post('/auth/sign-up', [AuthController::class, 'register']);
Route::put('/auth/update', [AuthController::class, 'update']);
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products/create', [ProductController::class, 'store']);
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\LoginController;

// 認証不要のルート
Route::post('/auth/sign-up', [AuthController::class, 'register']);
Route::post('/auth/login', [LoginController::class, 'login']);

// 認証が必要なAPI
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products/create', [ProductController::class, 'store']);
    Route::get('/auth/mypage', [AuthController::class, 'mypage']);   // GETのほうが一般的
    Route::put('/auth/update', [AuthController::class, 'update']);
    Route::post('/auth/logout', [LoginController::class, 'logout']);  // ログアウトも必要なら
});

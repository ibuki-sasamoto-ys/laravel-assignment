<?php

use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
})->middleware('web');

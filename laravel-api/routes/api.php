<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\Backend\ProductController;
use App\Http\Controllers\Api\Frontend\PageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('store-user', [UserController::class, 'store']);
Route::post('login-user', [UserController::class, 'login']);


Route::prefix('frontend')->group(function () {
    Route::get('products', [PageController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function (){
    Route::get('check-login', [UserController::class, 'checkLogin']);
    Route::post('logout-user', [UserController::class, 'logOut']);

    Route::prefix('backend')->group(function () {
        Route::post('product/store', [ProductController::class, 'store']);

        /**
         * User Access Only Own Created Items
         */
        Route::middleware('backend.user.scope')->group(function () {
            Route::get('products', [ProductController::class, 'index']);
            Route::delete('product/delete/{product_uuid}', [ProductController::class, 'destroy']);
        });
    });
});




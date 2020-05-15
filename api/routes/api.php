<?php

use App\Http\Resources\ProductCollection;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Authentication
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('user', 'AuthController@user');
});

Route::group([
    'middleware' => 'auth:api'
], function () {

    // Shopping Cart
    Route::get('shopping-cart/add/{productId}/{quantity}', 'ShoppingCartController@add');
    Route::apiResource('shopping-cart', 'ShoppingCartController')->except([
        'index',
        'show',
        'store'
    ]);

    // Products
    Route::apiResource('products', 'ProductController')->except([
        'index'
    ]);

    Route::get('cart/add/{productId}/{quantity}', 'ShoppingCartController@add');
});

Route::get('products', 'ProductController@index')->name('products.index');

Route::get('test', function () {
    return new ProductCollection(Product::paginate(12));
});
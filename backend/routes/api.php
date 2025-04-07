<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\ShippingController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\AccountController;
use App\Http\Controllers\front\CartController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use App\Http\Controllers\front\ShippingController as FrontShippingController;
use App\Http\Controllers\OrderController;
use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login',[AuthController::class,'authenticate']);
Route::get('get-latest-products',[FrontProductController::class,'latestProducts']);
Route::get('get-featured-products',[FrontProductController::class,'featuredProducts']);
Route::get('get-categories',[FrontProductController::class,'getCategories']);
Route::get('get-brands',[FrontProductController::class,'getBrands']);
Route::get('get-products',[FrontProductController::class,'getProducts']);
Route::get('get-product/{id}',[FrontProductController::class,'getProduct']);
Route::post('register',[AccountController::class,'register']);
Route::post('login',[AccountController::class,'authenticate']);
Route::get('login',[AccountController::class,'show']);
Route::get('get-shipping-front', [FrontShippingController::class, 'getShipping']);

Route::group(['middleware' => ['auth:sanctum','checkUserRole']],function(){
    Route::post('save-order',[OrderController::class,'saveOrder']);
    Route::get('save-order',[OrderController::class,'show']);
    Route::get('save-order/{id}',[OrderController::class,'confirm']);
    Route::get('order-details/{id}',[OrderController::class,'order_details']);
    Route::get('profile/{id}',[AccountController::class,'show_2']);
    Route::post('password/{id}',[AccountController::class,'changePassword']);
    Route::post('update-profile',[AccountController::class,'updateProfile']);
    Route::get('get-account-detail',[AccountController::class,'getAccountdetails']);
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => ['auth:sanctum','checkAdminRole']],function(){
    // Route::get('categories',[CategoryController::class,'index']);
    // Route::get('categories/{id}',[CategoryController::class,'show']);
    // Route::put('categories/{id}',[CategoryController::class,'update']);
    // Route::delete('categories/{id}',[CategoryController::class,'destroy']);
    // Route::post('categories',[CategoryController::class,'store']);

    Route::resource('categories',CategoryController::class);
    Route::resource('brands',BrandController::class);
    Route::get('sizes',[SizeController::class,'index']);
    Route::resource('products',ProductController::class);
    Route::post('temp-images',[TempImageController::class,'store']);
    Route::post('save-product-image',[ProductController::class,'saveProductImage']);
    Route::get('change-product-default-image',[ProductController::class,'updateDefaultImage']);
    Route::delete('delete-product-image/{id}',[ProductController::class,'deleteProductImage']);
    Route::get('save-order',[OrderController::class,'show']);
    Route::get('/shipping/{order_id}', [OrderController::class, 'view']);
    Route::get('/order-detail/{order_id}', [OrderController::class, 'detail']);
    Route::patch('/order/update/{id}', [OrderController::class, 'updateStatus']);
    
    Route::get('/all-items', [OrderController::class, 'shipping']);

    Route::get('get-shipping', [ShippingController::class, 'getShipping']);
    Route::post('save-shipping', [ShippingController::class, 'updateShipping']);

    Route::post('change-password', [AuthController::class, 'changePassword']);


    // Route::get('/cart', [CartController::class, 'index']);
    // Route::post('/cart/add', [CartController::class, 'addToCart']);
    // Route::put('/cart/update/{id}', [CartController::class, 'updateCartItem']);
    // Route::delete('/cart/delete/{id}', [CartController::class, 'deleteCartItem']);

});

<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/{any}', function () {
    return response()->json(['message' => 'Not Found'], 404);
})->where('any', '.*');

// Catch-all route for the React application
Route::get('{any}', function () {
    return view('app');
})->where('any', '^(?!api).*$');

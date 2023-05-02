<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('regular');
})->middleware('auth')->name('home');

Route::get('/random', function () {
    return view('random');
})->middleware('auth')->name('home');

require __DIR__ . '/auth.php';
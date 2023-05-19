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
    return view('exact');
})->middleware('auth')->name('home');

Route::get('/interval', function () {
    return view('interval');
})->middleware('auth')->name('interval');

require __DIR__ . '/auth.php';
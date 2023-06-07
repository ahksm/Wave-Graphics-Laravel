<?php

use App\Http\Controllers\FavouriteController;
use App\Models\Favourite;
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
    return view('exact', ['canvases' => Favourite::all()]);
})->middleware('auth')->name('home');

Route::get('/interval', function () {
    return view('interval', ['canvases' => Favourite::all()]);
})->middleware('auth')->name('interval');

Route::post('/favourite', [FavouriteController::class, 'store']);
Route::get('/favourites', [FavouriteController::class, 'index']);

require __DIR__ . '/auth.php';
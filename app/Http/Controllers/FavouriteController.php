<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{
    public function index()
    {
        $favourites = Favourite::all();

        return view('favourite', ['canvases' => $favourites]);
    }

    public function store(Request $request)
    {
        $favouriteData = $request->validate([
            'params' => 'required',
            'canvas_path' => 'required|image',
            'layers' => 'required|integer'
        ]);

        $existingFavourite = Favourite::where('params', $favouriteData['params'])->first();
        if ($existingFavourite) {
            $existingFavourite->delete();
        } else {
            $imagePath = $request->file('canvas_path')->store('canvases', 'public');

            Favourite::create([
                'params' => $favouriteData['params'],
                'canvas_path' => $imagePath,
                'layers' => $favouriteData['layers']
            ]);
        }

        return Favourite::count();
    }
}

<?php
/**
 * Created by PhpStorm.
 * User: skorotko
 * Date: 10/22/18
 * Time: 11:49 AM
 */

namespace App\Http\Controllers\Films;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use Avatar;
use Storage;
use App\UsersWatchedFilmsOneMonths;

class FilmsController extends Controller
{
    public function createFilmsWatchedUsers(Request $request){
        if(empty($request->id_film))
            die;
        $filmExist = UsersWatchedFilmsOneMonths::where('id_film', $request->id_film)->first();
        if(!empty($filmExist)){
            UsersWatchedFilmsOneMonths::where('id_film', $request->id_film)->update(['updated_at' => date("Y-m-d H:i:s")]);
        }else{
            $filmNew = new UsersWatchedFilmsOneMonths;
            $filmNew->id_film = $request->id_film;
            $filmNew->save();
        }
        $filmNew = true;
        return response()->json($filmNew);
    }

    public function returnFilmsMoreMonth(){
        $filmsArray = UsersWatchedFilmsOneMonths::whereExists(function ($query) {
                $query->whereRaw('updated_at <= now() - interval 30 day');
            })
            ->get();
        return response()->json($filmsArray);
    }
}
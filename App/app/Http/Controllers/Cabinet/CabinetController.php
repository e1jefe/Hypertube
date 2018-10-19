<?php
/**
 * Created by PhpStorm.
 * User: skorotko
 * Date: 9/28/18
 * Time: 2:42 PM
 */

namespace App\Http\Controllers\Cabinet;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;
use Avatar;
use Storage;
use App\WatchedFilmsUser;

class CabinetController extends Controller
{
    public $successStatus = 200;

    public function userInfo(){
        $user = auth()->guard('api')->user();
        $user->avatar = 'data:image/' . "jpeg" . ';base64,' . base64_encode(file_get_contents($user->avatar));
        return response()->json($user);
    }

    public function changeInfo(Request $request){
        $user = auth()->guard('api')->user();
        if(strcmp($request->email, $user->email) === 0){
            $request->validate([
                'name' => 'required|string'
            ]);
        }else{
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users'
            ]);
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
        return response()->json($user);
    }

    public function changePass(Request $request){
        $request->validate([
            'password' => 'required|string|confirmed'
        ]);
        $userToken = auth()->guard('api')->user();
        $userBase = User::where('email', $userToken->email)->first();
        $userBase->password = bcrypt($request->password);
        $userBase->save();
        return response()->json($userBase);
    }

    public function changeAvatar(Request $request){
        $user = auth()->guard('api')->user();
        $img = $request->avatar;
        $avatarPath = 'users_avatar/' . $user->id;
        if(!file_exists('users_avatar')){
            mkdir('users_avatar');
        }
        if(!file_exists($avatarPath)) {
            mkdir($avatarPath);
        }
        if(file_exists($user->avatar)) {
            unlink($user->avatar);
        }
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace('data:image/jpeg;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $img = base64_decode($img);
        $img1 = imagecreatefromstring($img);
        header('Content-type: image/jpeg');
        $img = uniqid() . '.jpeg';
        imagejpeg($img1, "$avatarPath/$img");
        $avatar = $avatarPath . '/' . $img;
        $user->avatar = $avatar;
        $user->save();
        return response()->json($user);
    }

    public function watchedFilmsUsersReturn(){
        $user = auth()->guard('api')->user();
        $filmsArray = WatchedFilmsUser::where('id_user', $user->id)->orderBy('updated_at', 'desc')->get();
        return response()->json($filmsArray);
    }

    public function watchedFilmsUsersCreate(Request $request){
        if(empty($request->id_film))
            die;
        $filmExist = WatchedFilmsUser::where('id_film', $request->id_film)->first();
        $user = auth()->guard('api')->user();
        $filmsArray = WatchedFilmsUser::where('id_user', $user->id)->get();
        if(!empty($filmExist)){
            WatchedFilmsUser::where('id_film', $request->id_film)->update(['updated_at' => date("Y-m-d H:i:s")]);
        }else{
            if (count($filmsArray) === 10)
                WatchedFilmsUser::where('id_user', $user->id)->orderBy('updated_at', 'asc')->first()->delete();
            $filmNew = new WatchedFilmsUser;
            $filmNew->id_film = $request->id_film;
            $filmNew->id_user = $user->id;
            $filmNew->save();
        }
        $filmNew = true;
        return response()->json($filmNew);
    }
}
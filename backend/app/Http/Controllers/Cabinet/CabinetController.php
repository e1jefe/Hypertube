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

    public function userInfo()
    {
        $user = auth()->guard('api')->user();
        $user->avatar = 'data:image/' . "jpeg" . ';base64,' . base64_encode(file_get_contents($user->avatar));
        return response()->json($user);
    }

    public function changeInfo(Request $request)
    {
        $user = auth()->guard('api')->user();
        if (strcmp($request->email, $user->email) === 0) {
            $request->validate([
                'name' => 'string',
                'firstname' => 'string',
                'lastname' => 'string'
            ]);
        } else {
            $request->validate([
                'name' => 'string',
                'firstname' => 'string',
                'lastname' => 'string',
                'email' => 'string|email|unique:users'
            ]);
        }
        if(!empty($request->name))
            $user->name = $request->name;
        if(!empty($request->email))
            $user->email = $request->email;
        if(!empty($request->firstname))
            $user->firstname = $request->firstname;
        if(!empty($request->lastname))
            $user->lastname = $request->lastname;
        $user->save();
        return response()->json($user);
    }

    public function changePass(Request $request)
    {
        $request->validate([
            'password' => 'required|string|confirmed|min:7|regex:/^(?=.*[a-z])(?=.*\d)(?:[^A-Z\n\r]*[A-Z]){1}[^A-Z\n\r]*$/'
        ]);
        $userToken = auth()->guard('api')->user();
        $userBase = User::where('email', $userToken->email)->first();
        $userBase->password = bcrypt($request->password);
        $userBase->save();
        return response()->json($userBase);
    }

    public function changeAvatar(Request $request)
    {
        $user = auth()->guard('api')->user();
        $img = $request->avatar;
        $avatarPath = 'users_avatar/' . $user->id;
        if (!file_exists('users_avatar')) {
            mkdir('users_avatar');
        }
        if (!file_exists($avatarPath)) {
            mkdir($avatarPath);
        }
        if (file_exists($user->avatar)) {
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

    public function watchedFilmsUsersReturn()
    {
        $user = auth()->guard('api')->user();
        $filmsArray = WatchedFilmsUser::where('id_user', $user->id)->orderBy('updated_at', 'desc')->get();

        $ids = [];
        $posters = [];
        foreach($filmsArray as $item) {
            array_push($ids, $item['id_film']);
        }
        foreach($ids as $movie) {
            $details = json_decode(file_get_contents('https://api.themoviedb.org/3/movie/' . $movie . "?api_key=1dc667ca439220e3356ddd92cdee3e5e"));
            $currentPoster = $details->poster_path !== null ? 'https://image.tmdb.org/t/p/w500' . $details->poster_path : './pics/No_image_poster.png';
            array_push($posters, $currentPoster);
        }
        return response()->json($posters);
    }

    public function watchedFilmsUsersCreate(Request $request)
    {
        if (empty($request->id_film))
            return response()->json(false);
        $filmExist = WatchedFilmsUser::where('id_film', $request->id_film)->first();
        $user = auth()->guard('api')->user();
        $filmsArray = WatchedFilmsUser::where('id_user', $user->id)->get();
        if (!empty($filmExist)) {
            WatchedFilmsUser::where('id_film', $request->id_film)->update(['updated_at' => date("Y-m-d H:i:s")]);
        } else {
            if (count($filmsArray) === 6)
                WatchedFilmsUser::where('id_user', $user->id)->orderBy('updated_at', 'asc')->first()->delete();
            $filmNew = new WatchedFilmsUser;
            $filmNew->id_film = $request->id_film;
            $filmNew->id_user = $user->id;
            $filmNew->save();
        }
        $filmNew = true;
        return response()->json($filmNew);
    }

    public function returnAllWatchedFilms(Request $request)
    {
        $user = auth()->guard('api')->user();
        $filmsArray = WatchedFilmsUser::select('id_film')->where('id_user', $user->id)->get();
        $res = [];
        foreach ($filmsArray as $val) {
            array_push($res, intval($val["id_film"]));
        }
        return response()->json($res);
    }
}
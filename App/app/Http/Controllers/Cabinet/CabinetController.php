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
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Notifications\SignupActivate;
use Avatar;
use Storage;

class CabinetController extends Controller
{
    public $successStatus = 200;

    public function userInfo(){
        return response()->json(auth()->guard('api')->user());
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
}
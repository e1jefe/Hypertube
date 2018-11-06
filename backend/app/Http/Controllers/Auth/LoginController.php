<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Socialite;
use Carbon\Carbon;

class LoginController extends Controller
{
    protected $redirectTo = 'http://localhost:3000/social/';

    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return Response
     */
    public function handleProviderCallback($provider)
    {
        $github = Socialite::driver($provider)->stateless()->user();

        $user = $this->findOrCreateUser($github, $provider);
        if ($user) {
            $tokenResult = $user->createToken('Personal Access Token');
            return redirect($this->redirectTo . $tokenResult->accessToken);
        } else {
            return redirect('http://localhost:3000/404');
        }
            //return abort(404);
//            return response()->json( 404);
    }

    /**
     * Return user if exists; create and return if doesn't
     *
     * @param $githubUser
     * @return User
     */
    private function findOrCreateUser($githubUser, $provider)
    {
        if ($authUser = User::where('provider_id', $githubUser->id)->first()) {
            return $authUser;
        }
        $mail = $githubUser->getEmail();
        $authUser = User::where('email', $mail)->first();

        if (!empty($authUser)) {
            return false;
        }
        return User::create([
            'name' => ($provider == "github") ? $githubUser->nickname : $githubUser->getName(),
            'email' => $githubUser->getEmail(),
            'provider_id' => ($provider == "intra") ? $githubUser->id : $githubUser->getId(),
            'provider' => $provider
        ]);
    }
}

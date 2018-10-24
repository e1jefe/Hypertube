<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Socialite;

class LoginController extends Controller
{
    protected $redirectTo = 'http://localhost:3000';

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
        if($user) {
            Auth::login($user, true);
            return redirect($this->redirectTo);
        } else
            return response()->json(false, 401);
    }

    /**
     * Return user if exists; create and return if doesn't
     *
     * @param $githubUser
     * @return User
     */
    private function findOrCreateUser($githubUser, $provider)
    {
        if ($authUser = User::where('provider', $provider)->first()) {
            return $authUser;
        }
        $mail = $githubUser->getEmail();
        $authUser = User::where('email', $mail)->first();

        if (!empty($authUser)) {
            return false;
        }
        return User::create([
            'name' => $githubUser->getName(),
            'email' => $githubUser->getEmail(),
            'provider_id' => $githubUser->getId(),
            'provider' => $provider
        ]);

    }
}

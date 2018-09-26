<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Profile;
use App\Http\Resources\Profile as ProfileResource;

class ProfileController extends Controller
{
    public function show ($user_id)
    {
        return new ProfileResource(Profile::where_user_id($user_id));
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class mailController extends Controller
{
    public function send()
    {
        Mail::send(['text' => 'mail'], ['name', 'hypertube'], function ($message) {
            $message->to('dmitry.sheptun@gmail.com', 'To Dimas!')->subject('Hola brat');
            $message->from('dmitry.sheptun@gmail.com', 'Dimas');
        });
    }
}

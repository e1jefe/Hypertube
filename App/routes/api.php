<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::get('signup/activate/{token}', 'AuthController@signupActivate');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});
Route::group([
    'namespace' => 'Auth',
    'middleware' => 'api',
    'prefix' => 'password'
], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
    Route::post('reset', 'PasswordResetController@reset');
});

/*Route::group([
    'prefix' => 'cabinet',
    'namespace' => 'Cabinet'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::get('signup/activate/{token}', 'AuthController@signupActivate');

    Route::group([
        'middleware' => 'cabinet:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user-info', 'CabinetController@userInfo');
    });
});*/
Route::group([
    'namespace' => 'Cabinet',
    'middleware' => 'api',
    'prefix' => 'cabinet'
], function () {
    Route::get('user-info', 'CabinetController@userInfo');
    Route::any('change-info', 'CabinetController@changeInfo')/*->name('change')*/;
    Route::any('change-pass', 'CabinetController@changePass')/*->name('change')*/;
    /*Route::match(['get', 'post'], '/', ['uses' => '', 'as'=> '']);*/
});
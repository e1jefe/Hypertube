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

Route::group([
    'namespace' => 'Cabinet',
    'middleware' => 'api',
    'prefix' => 'cabinet'
], function () {
    Route::get('user-info', 'CabinetController@userInfo');
    Route::post('change-info', 'CabinetController@changeInfo');
    Route::post('change-pass', 'CabinetController@changePass');
    Route::post('change-avatar', 'CabinetController@changeAvatar');
    Route::post('watched-films_return', 'CabinetController@watchedFilmsUsersReturn');
    Route::post('watched-films_create', 'CabinetController@watchedFilmsUsersCreate');
});

Route::group([
    'namespace' => 'Comments',
    'middleware' => 'api',
    'prefix' => 'comments'
], function () {
    Route::post('all-comments', 'CommentsController@returnAllCommentsToFilm');
    Route::post('create-comment', 'CommentsController@createUserCommentToFilm');
    Route::post('delete-comment', 'CommentsController@deleteUserCommentToFilm');
});

Route::group([
    'namespace' => 'Films',
    'middleware' => 'api',
    'prefix' => 'films'
], function () {
    Route::post('create-films', 'FilmsController@createFilmsWatchedUsers');
    Route::post('return-films', 'FilmsController@returnFilmsMoreMonth');
});

header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization, X-Requested-With');
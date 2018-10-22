<?php
namespace App\Http\Controllers\Comments;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use App\CommentsToFilm;


class CommentsController extends Controller
{
    public function returnAllCommentsToFilm(Request $request){
        $commentsArray = CommentsToFilm::where('id_film', $request->id_film)->get();
        $user = CommentsToFilm::where('id_film', $request->id_film)
        ->join('users', 'id_user', '=', 'users.id')
            ->select('comments_to_films.*', 'name', 'firstname', 'lastname', 'avatar')
            ->get();
        return response()->json($user);
    }

    public function createUserCommentToFilm(Request $request){
        if(empty($request->comment)){
            die;
        }
        $request->validate([
            'comment' => 'required|string'
        ]);
        $user = auth()->guard('api')->user();
        $comment = new CommentsToFilm;
        $comment->id_film = $request->id_film;
        $comment->id_user = $user->id;
        $comment->comment = $request->comment;
        $comment->save();
        $comment->name = $user->name;
        $comment->firtsname = $user->firstname;
        $comment->lastname = $user->lastname;
        $comment->avatar = $user->avatar;
        return response()->json($comment);
    }

    public function deleteUserCommentToFilm(Request $request){
        $user = auth()->guard('api')->user();
        $comment = CommentsToFilm::where('id', $request->id_comment)->first();
        if(!strcmp($comment->id_user, $user->id)) {
            CommentsToFilm::where('id', $request->id_comment)->delete();
            $comment = true;
        }
        else
            $comment = false;
        return response()->json($comment);
    }
}
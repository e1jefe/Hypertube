<?php
/**
 * Created by PhpStorm.
 * User: skorotko
 * Date: 10/10/18
 * Time: 6:38 PM
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommentsToFilm extends Model
{
    protected $fillable = [
        'id_film', 'id_user', 'comment'
    ];
}
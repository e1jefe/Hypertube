<?php
/**
 * Created by PhpStorm.
 * User: skorotko
 * Date: 10/22/18
 * Time: 11:46 AM
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersWatchedFilmsOneMonths extends Model
{
    protected $fillable = [
        'id_film'
    ];
}
<?php
/**
 * Created by PhpStorm.
 * User: skorotko
 * Date: 10/17/18
 * Time: 3:02 PM
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class WatchedFilmsUser extends Model
{
    protected $fillable = [
        'id_film', 'id_user'
    ];
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $fillable = [
        'order_id', 'address', 'city', 'state', 'zip', 'url'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'cart';
    protected $fillable = ['user_id', 'product_id', 'size', 'qty', 'price'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}

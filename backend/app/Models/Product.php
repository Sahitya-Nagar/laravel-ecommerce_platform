<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $appends = ['image_url']; //array to store image url index

    public function getImageUrlAttribute()
    {
        if($this->image == "")
        {
            return "";
        }

        return asset('/uploads/products/small/'.$this->image);
    }

    function product_images()
    {
        return $this->hasMany(ProductImage::class);
    }

    function product_sizes()
    {
        return $this->hasMany(ProductSize::class, 'product_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}

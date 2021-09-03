<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Product extends Model
{
    use SoftDeletes, HasFactory;


    protected $appends = [
        'thumbnail_path'
    ];

    public function getThumbnailPathAttribute()
    {
        return url('/') .'/'. $this->thumbnail;
    }

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->uuid =  Str::uuid();
            $model->slug =  Str::slug($model->title);
        });
    }
}

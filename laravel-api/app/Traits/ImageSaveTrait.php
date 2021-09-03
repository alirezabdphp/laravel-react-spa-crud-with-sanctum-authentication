<?php


namespace App\Traits;


use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use File;

trait ImageSaveTrait
{
    private function saveImage($destination, $attribute , $width, $height):string
    {
        if (!File::isDirectory(base_path().'/public/uploads/'.$destination)){
            File::makeDirectory(base_path().'/public/uploads/'.$destination, 0755, true, true);
        }

        $img = Image::make($attribute);
        $img->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $path = 'uploads/'. $destination .'/' . Str::random(40) . '.' . $attribute->extension();
        $img->save($path);
        return $path;
    }

    private function deleteFile($path)
    {
        File::delete($path);
    }
}

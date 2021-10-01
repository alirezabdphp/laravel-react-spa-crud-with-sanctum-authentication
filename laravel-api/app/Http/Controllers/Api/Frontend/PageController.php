<?php

namespace App\Http\Controllers\Api\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Models\Product;
use App\Traits\ResponseControlTrait;
use Illuminate\Http\Request;

class PageController extends Controller
{
    use ResponseControlTrait;

    public function index(){
        $data['products'] = Product::orderBy('id', 'DESC')->get();
        return $this->sendResponse($data, 'Product List');
    }
}

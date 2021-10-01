<?php

namespace App\Http\Controllers\Api\Backend;

use App\Http\Controllers\Controller;
use App\Models\Models\Product;
use App\Traits\ImageSaveTrait;
use App\Traits\ResponseControlTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ImageSaveTrait, ResponseControlTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['products'] = Product::orderBy('id', 'DESC')->get();
        return $this->sendResponse($data, 'Product List');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->description = $request->description;
        $this->saveImages($request, $product); //Save Thumbnail

        if ($product->save()){
            $data['product'] = $product;
            return $this->sendResponse($data, 'Product Successfully Created');
        }else{
            return $this->sendError('Something is wrong. Try Again', 'Something is wrong. Try Again', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($uuid)
    {
        $product = Product::whereUuid($uuid)->first();
        if ($product){
            $product->delete();

            $data = '';
            return $this->sendResponse($data, 'Product Successfully Deleted');
        }else{
            return $this->sendError('Product Not Found', '404');
        }

    }

    private function saveImages($request, $model)
    {
        if($request->hasFile('thumbnail')){
            $this->deleteFile($model->thumbnail);
            $model->thumbnail = $this->saveImage('product', $request->thumbnail, 'null', '215');
        }
    }
}

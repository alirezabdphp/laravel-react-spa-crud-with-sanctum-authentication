<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use App\Traits\ResponseControlTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ResponseControlTrait;

    public function store(UserStoreRequest $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        if ($user->save()) {
            return $this->sendResponse($user, 'User registered successful.');
        } else {
            return $this->sendError("Invalid Data", [], 401);
        }
    }


    public function login(Request $request){
        $user = User::whereEmail($request->email)->first();



        if ($user){
            $data['status'] = 'success';
            $data['user'] = $user;

            return response($data);
        }else{
            $data['status'] = 'false';
            $data['user'] = [];
            $data['message'] = ['Email or password not matched'];

            return response($data);
        }
    }
}

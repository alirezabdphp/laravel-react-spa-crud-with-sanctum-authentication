<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use App\Traits\ResponseControlTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    use ResponseControlTrait;

    /**
     * Register new user
     * Generate sanctum token
     *
     * @param UserStoreRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserStoreRequest $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        $data['user_name'] = $user->name;
        $data['token'] = $user->createToken($user->email.'_Token')->plainTextToken;

        if ($user->save()) {
            return $this->sendResponse($data, 'User registered successful.');
        } else {
            return $this->sendError("Invalid Data", [], 401);
        }
    }


    /**
     * Login user
     * Generate sanctum token
     *
     * @param UserLoginRequest $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function login(UserLoginRequest $request){
        $user = User::whereEmail($request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $data['user_name'] = $user->name;
        $data['token'] = $user->createToken($user->email.'_Token')->plainTextToken;

        return $this->sendResponse($data, 'User login success.');
    }


    /**
     * Revoke the token that was used to authenticate the current request...
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function logOut(){
        if (Auth::check()){
            Auth::user()->currentAccessToken()->delete();
            $data = [];
            return $this->sendResponse($data, 'User logout success.');
        }else{
            return $this->sendError("Invalid Data", [], 401);
        }
    }


    public function checkLogin(){
        if (Auth::check()){
            $data['auth_user'] = Auth::user()->name;
            return $this->sendResponse($data, 'User Loged in');
        }else{
            return $this->sendError("Un Authorization", [], 401);
        }
    }
}

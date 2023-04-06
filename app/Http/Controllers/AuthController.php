<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request){
        try{

            $data = $request->validate([
                'name'=> 'required|string',
                'email' => 'required|email|string|unique:users,email',
                'password'=>[
                    'required',
                    'confirmed',
                    Password::min(4)->numbers()
                ]
            ]);

            /** @var User  $user */
            $user = User::create([
                'name'=> $data['name'],
                'email'=>$data['email'],
                'password'=> bcrypt($data['password']),
            ]);

            $token = $user->createToken('main')->plainTextToken;


            return response([
                'user'=> $user,
                'token'=> $token
            ]);
        }catch (\Exception $exception){
            return response([
                'message'=> $exception->getMessage(),
            ],400);
        }
    }

    public function login(Request $request): Response|Application|ResponseFactory
    {

        $credentials = $request->validate([
            'email' => 'required|email|string',
            'password'=>['required'],
            'remember'=>'boolean',
        ]);

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials,$remember)){
            return response([
                'error'=>'the Provided credentials are not correct'
            ],422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user'=> $user,
            'token'=> $token
        ]);

    }

    /**
     * @return Response|Application|ResponseFactory
     */
    public function logout(): Response|Application|ResponseFactory
    {

        $user = Auth::user();

        $user->currentAccesstoken()->delete();

        return response([
            'success'=>true,
        ]);
    }
}

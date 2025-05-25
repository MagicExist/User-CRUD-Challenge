<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

final class AuthController extends Controller
{
    final public function login(): JsonResponse
    {
        request()->validate([
            'email'=>'required|email|max:255',
            'password' => 'required',
            'device_name' => 'required'
        ]);

        $user = User::where('email',request()->email)->first();

        if(!$user || !Hash::check(request()->password, $user->password)){
            return response()->json([
                'message'=>'The provided credentials are incorrect'
            ],401);
        }

        return response()->json([
            'token' => $user->createToken(request()->device_name)->plainTextToken
        ]);
    }

    final public function logout(): JsonResponse
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}

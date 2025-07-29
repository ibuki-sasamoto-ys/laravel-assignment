<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::guard("web")->attempt($credentials)) {
            return response()->json([
                'message' => 'ログイン情報が正しくありません。',
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'ログイン成功',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}


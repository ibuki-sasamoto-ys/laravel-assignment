<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        // バリデーション
        $validated = $request->validate([
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name_kana' => 'required|string|max:255',
            'first_name_kana' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'tel' => 'required|string|max:20',
            'postal' => 'required|string|max:10',
            'prefecture' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'address' => 'required|string|max:255',
            'building' => 'nullable|string|max:255',

        ]);

        // ユーザー作成
        $user = User::create([
            'last_name' => $validated['last_name'],
            'first_name' => $validated['first_name'],
            'last_name_kana' => $validated['last_name_kana'],
            'first_name_kana' => $validated['first_name_kana'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['tel'],
            'postal_code' => $validated['postal'],
            'prefecture' => $validated['prefecture'],
            'city' => $validated['city'],
            'address' => $validated['address'],
            'building' => $validated['building'] ?? null,
        ]);

        // 成功レスポンス（201 Created）
        return response()->json([
            'message' => 'ユーザー登録に成功しました。',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
            ],
        ], 201);
    }

    public function update(UpdateUserRequest $request)
    {
    \Log::debug('Auth user:', ['user' => auth()->user()]);
    // 現在ログインしているユーザーを取得
    $user = $request->user();

    if (!$user) {
        return response()->json(['message' => '認証ユーザーが取得できません'], 401);
    }

    // バリデーション済みのデータを取得
    $validated = $request->validated();

    // パスワードが渡されていた場合はハッシュ化
    if (!empty($validated['password'])) {
        $validated['password'] = Hash::make($validated['password']);
    } else {
        // パスワードが空なら更新対象から除外（空で上書きされないように）
        unset($validated['password']);
    }

    // ユーザー情報を更新
    $user->update($validated);

    // 成功レスポンスを返す
    return response()->json([
        'message' => 'ユーザー情報を更新しました。',
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'address' => $user->address,
            'phone' => $user->phone,
            'email' => $user->email,
        ]
    ], 200);
}

public function login(Request $request)
    {
        // バリデーション
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 認証試行
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => '認証に失敗しました'], 401);
        }

        $user = Auth::user();

        // トークン発行（Sanctum利用）
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}

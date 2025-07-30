<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    // このリクエストを誰でも使えるようにする（今回は認証不要の登録なので true）
    public function authorize(): bool
    {
        return true;
    }

    // バリデーションルールをここに記述
    public function rules(): array
    {
        return [
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
        ];
    }
}

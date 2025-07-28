<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // 認証不要APIなのでtrue
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'genre_type' => 'required|string|in:ALL,MAN,WOMAN',
            'summary' => 'nullable|string',
            'detail' => 'nullable|string',
            'category.name' => 'required|string|max:255',
            'images' => 'array',
            'images.*' => 'required|url',
            'sizes' => 'array',
            'sizes.*.name' => 'required|string|max:10',
            'sizes.*.code' => 'required|string|max:10',
        ];
    }
}

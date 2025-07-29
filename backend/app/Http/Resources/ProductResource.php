<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'productId' => (string) $this->id,
            'name' => $this->name,
            'genreType' => $this->genre_type, // 例: 'ALL', 'MAN', 'WOMAN'
            'category' => [
                'categoryId' => (string) $this->category->id,
                'name' => $this->category->name,
            ],
            'images' => $this->images->pluck('url'), // ProductImageのurlを配列で返す想定
            'price' => $this->price,
            'sizes' => $this->sizes->map(function($size) {
                return [
                    'code' => (string) $size->id,
                    'name' => $size->name,
                ];
            }),
            'summary' => $this->summary,
            'detail' => $this->detail,
            'isFavorite' => false, // 今は固定値。後でログインユーザーの情報を入れても良い
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Size;
use App\Models\ProductImage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // ここでフィルタリング処理は別メソッドに分けます
        $query = Product::query();

        $query = $this->applyFilters($query, $request);

        $products = $query->paginate(
            $request->input('offset', 50),
            ['*'],
            'page',
            $request->input('page', 1)
        );

        return response()->json([
            'result' => ProductResource::collection($products),
            'status' => true,
            'pagination' => [
                'total' => $products->total(),
                'page' => $products->currentPage(),
                'offset' => $products->perPage(),
                'isPrevActive' => $products->previousPageUrl() !== null,
                'isNextActive' => $products->nextPageUrl() !== null,
            ],
        ]);
    }

    // フィルタリングのロジックは次で実装します
    private function applyFilters($query, Request $request)
    {
        // カテゴリ絞り込み
    if ($category = $request->query('category')) {
        $query->whereHas('category', function($q) use ($category) {
            $q->where('name', $category);
        });
    }

    // サイズ絞り込み（配列）
    if ($sizes = $request->query('sizes')) {
        if (!is_array($sizes)) {
            $sizes = explode(',', $sizes);
        }
        $query->whereHas('sizes', function($q) use ($sizes) {
            $q->whereIn('code', $sizes);
        });
    }

    // 価格帯絞り込み（配列: [min, max]）
    if ($prices = $request->query('prices')) {
        if (!is_array($prices)) {
            $prices = explode(',', $prices);
        }
        if (isset($prices[0])) {
            $query->where('price', '>=', $prices[0]);
        }
        if (isset($prices[1])) {
            $query->where('price', '<=', $prices[1]);
        }
    }

    // ジャンル絞り込み
    if ($genreType = $request->query('genreType')) {
        if ($genreType !== 'ALL') {
            $query->where('genre_type', $genreType);
        }
    }
        return $query;
    }

    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        // カテゴリの get_or_create
        $category = Category::firstOrCreate(['name' => $validated['category']['name']]);

        // 商品本体の作成
        $product = Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'genre_type' => $validated['genre_type'],
            'summary' => $validated['summary'] ?? '',
            'detail' => $validated['detail'] ?? '',
            'category_id' => $category->id,
        ]);

        // 画像登録
        if (!empty($request['images']) && is_array($request['images'])) {
            foreach ($request['images'] as $imageUrl) {
                // dd($imageUrl);
                if (!empty($imageUrl)) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'url' => $imageUrl,
                    ]);
                }
            }
        }

        // サイズ登録（中間テーブル）
        if (!empty($validated['sizes'])) {
            foreach ($validated['sizes'] as $sizeData) {
                $size = Size::firstOrCreate([
                    'code' => $sizeData['code'],
                    'name' => $sizeData['name'],
                ]);
                $product->sizes()->attach($size->id);
            }
        }

        return response()->json([
            'status' => true,
            'message' => '商品を作成しました。',
            'productId' => $product->id,
        ], 201);
    }
}

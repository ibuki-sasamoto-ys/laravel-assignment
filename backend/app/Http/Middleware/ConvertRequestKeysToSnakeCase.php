<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class ConvertRequestKeysToSnakeCase
{
    public function handle($request, Closure $next)
    {
        $request->merge($this->convertKeysToSnakeCase($request->all()));
        return $next($request);
    }

    private function convertKeysToSnakeCase(array $data)
    {
        $result = [];
        foreach ($data as $key => $value) {
            $newKey = Str::snake($key);
            if (is_array($value)) {
                $value = $this->convertKeysToSnakeCase($value);
            }
            $result[$newKey] = $value;
        }
        return $result;
    }
}

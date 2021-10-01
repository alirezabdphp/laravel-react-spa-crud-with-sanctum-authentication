<?php

namespace App\Http\Middleware\Scope;

use App\Models\Models\Product;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BackendUserScopeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()){
            Product::addGlobalScope('user', function (Builder $builder) {
                $builder->where('user_id',  Auth::id());
            });
        }
        
        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class SetLoggedUser
{
    public function handle($request, Closure $next)
    {
        // Verifica se o usuário está autenticado
        if (Auth::check()) {
            // Armazena o usuário logado numa variável global
            view()->share('loggedUser', Auth::user());
        }

        return $next($request);
    }
}
<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        
        
        $allowedOrigins = [
            'http://dobleelectricidad.gatmatic.com',
            'https://dobleelectricidad.gatmatic.com',
            'http://localhost:4200',
            'https://localhost:4200',
        ];
        
        if( isset($_SERVER['HTTP_ORIGIN']) ) {
            preg_match('/http:\/\/dobleelectricidad.gatmatic.com/', $_SERVER['HTTP_ORIGIN'], $matches_1);
            preg_match('/https:\/\/dobleelectricidad.gatmatic.com/', $_SERVER['HTTP_ORIGIN'], $matches_2);
            preg_match('/http:\/\/localhost/', $_SERVER['HTTP_ORIGIN'], $matches_3);
            preg_match('/https:\/\/localhost/', $_SERVER['HTTP_ORIGIN'], $matches_4);
        }
        else
            if( isset($_SERVER['HTTP_REFERER']) ) {
            preg_match('/http:\/\/dobleelectricidad.gatmatic.com/', $_SERVER['HTTP_REFERER'], $matches_1);
            preg_match('/https:\/\/dobleelectricidad.gatmatic.com/', $_SERVER['HTTP_REFERER'], $matches_2);
            preg_match('/http:\/\/localhost/', $_SERVER['HTTP_REFERER'], $matches_3);
            preg_match('/https:\/\/localhost/', $_SERVER['HTTP_REFERER'], $matches_4);
            
        } else {
            preg_match('/http:\/\/dobleelectricidad.gatmatic.com/', $_SERVER['SERVER_NAME'], $matches_1);
            preg_match('/https:\/\/dobleelectricidad.gatmatic.com/', $_SERVER['SERVER_NAME'], $matches_2);
            preg_match('/http:\/\/localhost/', $_SERVER['SERVER_NAME'], $matches_3);
            preg_match('/https:\/\/localhost/', $_SERVER['SERVER_NAME'], $matches_4);
        }

        $origin = '';
        if( $matches_1 && $matches_1[0]!='' ) {
            $origin = $allowedOrigins[0];
        } else if( $matches_2 && $matches_2[0]!='' ) {
            $origin = $allowedOrigins[1];
        } else if( $matches_3 && $matches_3[0]!='' ) {
            $origin = $allowedOrigins[2];
        } else if( $matches_4 && $matches_4[0]!='' ) {
            $origin = $allowedOrigins[3];
        } 

        
        return $next($request)
            ->header('Access-Control-Allow-Origin', $origin)
            ->header('Access-Control-Allow-Credentials','true')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, X-CSRF-TOKEN, Authorization');
    

        
    }
}

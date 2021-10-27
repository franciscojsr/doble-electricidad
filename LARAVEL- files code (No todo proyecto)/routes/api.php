<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('api')->post('/login', 'Auth\LoginController@login_user_data');
Route::middleware('api')->post('/logout', 'Auth\LoginController@logout_user_data');

Route::middleware('api')->post('/getfacturas', 'Json\FacturasController@get_facturas_data');
Route::middleware('api')->post('/upfacturas', 'Json\FacturasController@update_facturas');
// Route::middleware('api')->post('/addfacturas', 'Json\FacturasController@add_facturas');
// Route::middleware('api')->post('/delfacturas', 'Json\FacturasController@delete_facturas');
Route::middleware('api')->post('/getdatospersonales', 'Json\DatosPersonalesController@get_datos_personales_data');
Route::middleware('api')->post('/updatospersonales', 'Json\DatosPersonalesController@update_datos_personales');
// Route::middleware('api')->post('/addpersonales', 'Json\DatosPersonalesController@add_datos_personales');
// Route::middleware('api')->post('/delpersonales', 'Json\DatosPersonalesController@delete_datos_personales');


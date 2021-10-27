<?php

namespace App\Http\Controllers\Json;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\DatosPersonale;

class DatosPersonalesController extends Controller
{
    //




    /*
    |--------------------------------------------------------------------------
    | Datospersonales Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the data of facturas section
    | 
    |
    */


    /*
    * get all data
    */
    protected function get_datos_personales_data() {
        try{
            $datos_personales = DatosPersonale::all();
            $data = [
                'id_status' => '1',
                'data' => $datos_personales,
            ];
        }
        catch(\Illuminate\Database\QueryException $e) {
            $data = [
                'id_status' => '0',
                'data' => [],
                'error' => 'Something wrong',
            ];
        } catch(Exception $e) { 
            $data = [
                'id_status' => '0',
                'data' => [],
                'error' => 'Something wrong',
            ];
        }
        return $data;
    }


    /**
     * Actualizar datos_personales con id_user
     *
     * @param  array  $data
     * @return \App\DatosPersonale
     */
    protected function update_datos_personales() {

       

        try{

            $id                 = $_REQUEST['id'];
            $nombre_titular     = $_REQUEST['nombre_titular'];
            $email              = $_REQUEST['email'];
            $fecha_alta         = $_REQUEST['fecha_alta'];
            $direccion_envio    = $_REQUEST['direccion_envio'];

            $result = DatosPersonale::where('id_datos_personales', (string) $id)
                     ->update([
                        'nombre_titular' => $nombre_titular,
                        'email' => $email,
                        'fecha_alta' => $fecha_alta,
                        'direccion_envio' => $direccion_envio,
                        ]
                    );
                        
            $data = [
                'id_status' => $result,
            ];
        }
        catch(\Illuminate\Database\QueryException $e) {
            $data = [
                'id_status' => '0',
                'error' => 'Something wrong',
            ];
        } catch(Exception $e) { 
            $data = [
                'id_status' => '0',
                'error' => 'Something wrong',
            ];
        }
        return $data;

    }


}
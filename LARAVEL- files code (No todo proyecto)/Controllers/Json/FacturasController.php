<?php

namespace App\Http\Controllers\Json;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Factura;

class FacturasController extends Controller
{
    //




    /*
    |--------------------------------------------------------------------------
    | Facturas Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the data of facturas section
    | 
    |
    */


    /*
    * get all data
    */
    protected function get_facturas_data() {
        try{
            $facturas = Factura::all();
            $data = [
                'id_status' => '1',
                'data' => $facturas,
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
     * Actualizar facturas con id_user
     *
     * @param  array  $data
     * @return \App\Factura
     */
    protected function update_facturas() {

        try{

            $id                     = $_REQUEST['id'];
            $nombre_factura         = $_REQUEST['nombre_factura'];
            $fecha_emision          = $_REQUEST['fecha_emision'];
            $importe                = $_REQUEST['importe'];
            $direccion_suministro   = $_REQUEST['direccion_suministro'];
            
    
            $result = Factura::where('id_facturas', (string) $id)
                         ->update([
                            'nombre_factura' => $nombre_factura,
                            'fecha_emision' => $fecha_emision,
                            'importe' => $importe,
                            'direccion_suministro' => $direccion_suministro,
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
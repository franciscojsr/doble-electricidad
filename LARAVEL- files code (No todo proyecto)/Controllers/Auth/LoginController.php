<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Foundation\Auth\User;

use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Hash;




class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */



    public function login_user_data(Request $request) {

        try{

            $name_email = $request->name_email;
            $pass = $request->pass;

            // $all = $request->all();

            $user = User::where('name', $name_email)
                        ->orwhere('email', $name_email)->first();

            if( $user && password_verify($pass, $user->password) ){

                $this->update_status($user->id_usuarios, 1);

                $result = [
                    "id_status" => "1",
                    "login" => "OK",
                    "section" => "login",
                    "error" => ""
                ];
            }
            else {

                $result = [
                    "id_status" => "0",
                    "mesg" => "Usuario o contraseña incorrecto",
                    "status" => "Not allowed",
                    "section" => "login",
                    "error" => "",
                ];
            }
            
        } catch(\Illuminate\Database\QueryException $e) {
            $result = [
                "id_status" => "0",
                "mesg" => "Ha habido un error! Inténtelo más tarde",
                "status" => "Error",
                "section" => "login",
                "error" => $e,
                "tipo" => "eloquent"
            ];
        } catch(Exception $e) { 
            $result = [
                "id_status" => "0",
                "mesg" => "Ha habido un error! Inténtelo más tarde",
                "status" => "Error",
                "section" => "login",
                "error" => $e,
                "tipo" => "eloquent"
            ];
        }
        return $result;

    }
    public function logout_user_data(Request $request) {

        try{
            $result = '0';
            $name_email = $request->name_email;

            $user = User::where('name', $name_email)
                        ->orwhere('name', $name_email)->first();
            if( $user ){
                $result = $this->update_status($user->id_usuarios, 1);
            }
            
        }
        catch(\Illuminate\Database\QueryException $e) {
            $result = [
                "id_status" => "0",
                "mesg" => "Ha habido un error! Inténtelo más tarde",
                "status" => "Error",
                "section" => "login",
                "error" => $e,
                "tipo" => "eloquent"
            ];
        } catch(Exception $e) { 
            $result = [
                "id_status" => "0",
                "mesg" => "Ha habido un error! Inténtelo más tarde",
                "status" => "Error",
                "section" => "login",
                "error" => $e,
                "tipo" => "eloquent"
            ];
        }

        return $result;

    }


    public static function update_status(string $id_user, $status){
        return User::where('id_usuarios', $id_user)
            ->update([
                "status" => $status
            ]);
    }








}

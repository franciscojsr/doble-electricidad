import { Injectable, Inject, Output, EventEmitter, Directive } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
let headers_file = new HttpHeaders ({'Content-Type':'multipart/form-data'});
let headers_json = new HttpHeaders ({'Content-Type':'application/json'});


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  /** Auth section **/
  private isLoggedIn = false;
  // private isLoggedIn: boolean;
  redirectUrl: string = '';
  private userName: string = '';
  private passWord: string = '';

  private path_raiz                 = 'https://dobleelectricidadlaravel.gatmatic.com/api/';

  private path_login = this.path_raiz + 'login';
  private path_logout = this.path_raiz + 'logout';
  private path_facturas_get = this.path_raiz + 'getfacturas';
  private path_add_facturas_campo = this.path_raiz + 'addfacturas';
  private path_update_facturas_campo = this.path_raiz + 'upfacturas';
  private path_del_facturas_campo = this.path_raiz + 'delfacturas';
  private path_datos_personales_get = this.path_raiz + 'getdatospersonales';
  private path_datos_personales_add = this.path_raiz + 'adddatospersonales';
  private path_update_datos_personales_campo = this.path_raiz + 'updatospersonales';
  private path_datos_personales_del = this.path_raiz + 'deldatospersonales';
  

  // config

  private config: any;
  private config_file: any;
  private config_json: any;

  constructor(
    private http: HttpClient,
  ) { 

    this.getCsrfTokenConfigHeaders();


  }




  /** HTTPS REQUEST */

  getCsrfTokenConfigHeaders() {
    
    // config
    this.config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
      },
      withCredentials: true
    };
    this.config_json = {
      headers: {
        "Content-Type": "application/json;"
      },
      withCredentials: true
    };
    this.config_file = {
      headers: {
        "Content-Type": "multipart/form-data;"
      },
      withCredentials: true
    };
  }


  getConfig(){
    return [this.config, this.config_json, this.config_file];
  }

  /** LOGIN - LOGOUT */

  /** Login Usuarios */
  login(name_email: string, pass: string) {

    let dataForm = new FormData();

    dataForm.append('name_email' , name_email);
    dataForm.append('pass' , pass);

    return this.http.post(this.path_login, dataForm, {})
      .pipe(
        catchError(this.handleError)
      );
  }
  /** Logout usuarios*/
  logout(name_email: string) {

    let dataForm = new FormData();  
    dataForm.append('name_email', name_email);

    return this.http.post(this.path_logout, dataForm, {})
      .pipe(
        catchError(this.handleError)
      );

  }



  getFacturasData() {

    let dataForm = null;

    return this.http.post(this.path_facturas_get, dataForm, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  getDatosPersonalesData() {

    let dataForm = null;

    return this.http.post(this.path_datos_personales_get, dataForm, {})
      .pipe(
        catchError(this.handleError)
      );
  }


  updateTablaCampo(tabla: string, data: any){
    let func;
    if(tabla=='facturas'){
      func = this.updateFacturasCampo(data);
    }
    else if(tabla == 'datos_personales'){
      func = this.updateDatosPersonalesCampo(data);
    }
    return func;
  }

  updateFacturasCampo(data: any){
    let dataForm = new FormData();

    dataForm.append('id', data.opciones.id);
    dataForm.append('nombre_factura', data['nombre']);
    dataForm.append('fecha_emision', data['fecha_emision'])
    dataForm.append('importe', data['importe'])
    dataForm.append('direccion_suministro', data['dir_suministro'])

    return this.http.post(this.path_update_facturas_campo, dataForm, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDatosPersonalesCampo(data: any){
    let dataForm = new FormData();

    dataForm.append('id', data.opciones.id);
    dataForm.append('nombre_titular', data['nombre']);
    dataForm.append('email', data['email']);
    dataForm.append('fecha_alta', data['fecha_alta']);
    dataForm.append('direccion_envio', data['dir_envio']);

    return this.http.post(this.path_update_datos_personales_campo, dataForm, {})
      .pipe(
        catchError(this.handleError)
      );
  }


  /** HTTPS REQUEST */




  /** localstorage methods **/
  /**
   * Get localstorage 
   * @param localKeyName 
   * @returns localStorage
   */
  getLocalStorage(localKeyName: string) {
    const item: any = localStorage.getItem(localKeyName);
    if(typeof item === 'undefined' || item === 'undefined' || item === undefined){
      localStorage.removeItem(localKeyName)
      return null;
    }
    else{
      return JSON.parse(item); 
    }
    // return JSON.parse(sessionStorage.getItem(localKeyName)); 
  }
  /**
   * Set data to localstorage
   * @param localKeyName 
   * @param valueKeyName 
   */
  setLocalStorage(localKeyName: string, valueKeyName: any) {
    try{
      localStorage.setItem(localKeyName, JSON.stringify(valueKeyName));
      // sessionStorage.setItem(localKeyName, JSON.stringify(valueKeyName));
    } catch (e) {
      console.log('LocalStorage QuotaExceededError - ' + localKeyName + ' is_full');
      console.log("Uncaught QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'dataURL' exceeded the quota.");
    }
  }
  /**
   * Remove localstorage
   * @param localKeyName 
   */
  removeLocalStorage(localKeyName: string) {
    localStorage.removeItem(localKeyName);
    // sessionStorage.removeItem(localKeyName);
  }
  /**
   * Clear all localstorage
   */
  clearLocalStorage(){
    localStorage.clear();
    // sessionStorage.clear();
  }






  private handleError(error: HttpErrorResponse) {
    
    console.log('error.status');
    console.log('error.status');
    console.log('error.status');
    console.log(error.status);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}`
      );
      console.error(
        `body was: ${error.error}` +
        `error was: ${error}`
      );
      console.error(
        `erro 2: ${error.error.message}`
      );
      console.error(
        `erro 3: ${error.error}`
      );
      console.error(
        `erro 4: ${error.message}`
      );
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };






}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_text = 'LOGIN PAGE';

  login_data: any = {};

  name_email: string = '';
  pass: string = '';
  loading = '';
  success = '';
  error = '';

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    if(this.apiService.getLocalStorage('isLoggedIn')==null){
      this.apiService.setLocalStorage('isLoggedIn', false);
    }
    else {
      this.router.navigate(['/home']);
    }
  }


  systemLogin(name_email: string, pass: string): Observable<boolean> {
    let result_val = new Subject<boolean>();
    this.apiService.login(name_email, pass).subscribe(
        res => {
            let resLogin: any = res;
            if( resLogin.id_status == '1') {
              this.apiService.setLocalStorage('isLoggedIn', true);
              // Se guarda el nombre de usuario o id usuario
              this.apiService.setLocalStorage('user_name', name_email);
              result_val.next(true);
              
            } else {
                this.apiService.setLocalStorage('isLoggedIn', false);
                result_val.next(false);
            }
        }
    );
    return result_val.asObservable();
  }

  login() {
      this.loading = 'Espere...';
      this.loading = '';
      this.systemLogin(this.form.value.username, this.form.value.password).subscribe(  
        res => {
          if( res ){
            this.loading = 'Espere. Cagando perfil privado...';
            this.error = '';
            this.success = 'Login ok!';
            setTimeout( () => {
              // Para ver mensaje login ok
              this.router.navigate(['/home']);
            },1000);
          }
          else{
            // alert('usuario o contraseña incorrectos');
            this.error = 'Usuario o contraseña incorrecta';
            this.success = '';
            this.loading = '';
          }
      });
  }

}

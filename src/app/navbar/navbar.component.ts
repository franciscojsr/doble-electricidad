import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  login = true;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.checkSession();
  }

  /**
   * Método para mostrar menu en login
   */
  checkSession() {

    if(this.apiService.getLocalStorage('isLoggedIn')) { 
      this.login = true 
    }
    else {
      this.login = false;
    }

  }

}

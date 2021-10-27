import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  logout_str = 'Logout';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  logout(){
    let name = this.apiService.getLocalStorage('user_name');
    this.apiService.logout(name).subscribe(
        res => {
          if( res == '1') {
              this.apiService.setLocalStorage('isLoggedIn', false);
              this.apiService.setLocalStorage('user_name', null);
              // this.router.navigate(['/login']);
              this.router.navigate(['/login']);
            } else {
              alert('error intentelo más tarde');
            }
        }
    );
  }


}

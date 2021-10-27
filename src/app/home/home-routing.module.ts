import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { HomeComponent } from './home.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { FacturasComponent } from './facturas/facturas.component';

import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'facturas', component: FacturasComponent, canActivate: [AuthGuard]},
  { path: 'datospersonales', component: DatosPersonalesComponent, canActivate: [AuthGuard]},
  { path: '404', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

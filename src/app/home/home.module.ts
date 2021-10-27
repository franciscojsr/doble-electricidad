import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { FacturasComponent } from './facturas/facturas.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { HomeComponent } from './home.component';
import { TablasComponent } from '../componentes/tablas/tablas.component';
import { MaterialModule } from '../material.module';
import { CapitalizePipesPipe } from '../pipes/capitalize-pipes.pipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { LogoutComponent } from '../logout/logout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    LogoutComponent,
    HomeComponent,
    FacturasComponent,
    DatosPersonalesComponent,
    TablasComponent,
    CapitalizePipesPipe,
  ],
  exports: [
    NavbarComponent
    // CapitalizePipesPipe,
    // HomeComponent,
    // FacturasComponent,
    // DatosPersonalesComponent,
    // TablasComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    FormsModule,
  ]
})
export class HomeModule { }

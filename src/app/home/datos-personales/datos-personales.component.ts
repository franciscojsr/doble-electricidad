import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {

  data = {};

  constructor() { }

  ngOnInit(): void {

    this.data = {tabla:'datos_personales', data: []};

  }

}

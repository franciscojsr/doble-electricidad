import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  data = {};

  constructor(  ) { }

  ngOnInit(): void {

    this.data = {tabla:'facturas', data: []};
  }

}

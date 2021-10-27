import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatosPersonales } from '../interfaces/datos-personales';

import { Facturas } from '../interfaces/facturas';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent implements AfterViewInit, OnInit {

  @Input() tabla_data: any= {}; // input item de app-opcioens-popup
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChildren('tr', {read: ElementRef}) tabla_tr!: QueryList<ElementRef>;

  ELEMENT_DATA!: any[];
  columns!: string[];
  dataSource: any;
  nombre  = 'nombre';
  email = 'email';
  fecha_emision = 'fecha emision';
  fecha_alta = 'fecha alta';
  importe = 'importe';
  dir_suministro = 'dirección suministro';
  dir_envio = 'dirección suministro';
  opciones = 'opciones';
  searchText: string = '';
  tabla: string = '';
  add_row = false;
  error = '';

  msg_modal = '';

  constructor( 
    public elem: ElementRef,
    private cdRef: ChangeDetectorRef,
    private apiService: ApiService
   ) { 

  }

  ngOnInit(): void {
    this.getData(this.tabla_data.tabla);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.tabla_tr.changes.subscribe((els: QueryList <ElementRef>) =>
    // {
    //     this.cdRef.detectChanges();
    //     // Si se añaden nuevo row, se actualiza queryList al fist
    //     if(this.new_row){
    //       this.new_row = false;
    //       let tdElemens = this.tabla_tr['_results'];
    //       const first = els.first;
    //       const last = els.last;
    //       tdElemens.unshift(tdElemens[tdElemens.length-1]);
    //       tdElemens.pop();
    //       // this.tabla_tr.first.nativeElement = last.nativeElement;
    //       // this.tabla_tr.last.nativeElement = tdElemens[tdElemens.length-2].nativeElement;
    //       console.log('tdElemens');
    //       console.log(tdElemens);
    //       console.log(tdElemens[0]);
    //     }
    // });
  }
  

  getData(tabla: string){
    
    this.tabla = tabla;
  
    if(tabla == 'facturas'){

      this.columns = ['nombre', 'fecha_emision', 'importe', 'dir_suministro', 'opciones'];

      this.getFacturas(); // Get data server
      // const ELEMENT_DATA: Facturas[] = [
      //   {nombre: 'pedro', fecha_emision: '1-1-2021',   importe: 1.00,  dir_suministro: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '4-4-2021',   importe: 4.00,  dir_suministro: 'calle tal pal 4', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '6-6-2021',   importe: 6.9,   dir_suministro: 'calle tal pal 6', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '9-9-2021',   importe: 9.01,  dir_suministro: 'calle tal pal 9', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '10-10-2021', importe: 10.8,  dir_suministro: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '12-12-2021', importe: 12.01, dir_suministro: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '14-14-2021', importe: 14.00, dir_suministro: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '15-15-2021', importe: 15.99, dir_suministro: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '18-18-2021', importe: 18.99, dir_suministro: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '20-20-2021', importe: 20.17, dir_suministro: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '22-22-2021', importe: 22.98, dir_suministro: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '24-24-2021', importe: 24.3,  dir_suministro: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '26-26-2021', importe: 26.98, dir_suministro: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '28-28-2021', importe: 28.08, dir_suministro: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '30-30-2021', importe: 30.97, dir_suministro: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '3-2-2021',   importe: 32.0,  dir_suministro: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '5-5-2021',   importe: 35.4,  dir_suministro: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '9-9-2021',   importe: 39.9,  dir_suministro: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '9-3-2021',   importe: 39.09, dir_suministro: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', fecha_emision: '10-4-2021',  importe: 40.0,  dir_suministro: 'calle tal pal 4', opciones: { guardar: false, editar: true, eliminar: true} },
      // ];
      // this.ELEMENT_DATA = ELEMENT_DATA;
      // this.dataSource = new MatTableDataSource<Facturas>(ELEMENT_DATA);
    }
    else if(tabla == 'datos_personales') {

      this.columns = ['nombre', 'email', 'fecha_alta', 'dir_envio', 'opciones'];

      this.getDatosPersonales(); // Get data server
      // const ELEMENT_DATA: DatosPersonales[] = [
      //   {nombre: 'pedro', email: 'miemail@as13d.com',   fecha_alta: '1-1-2021',   dir_envio: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as43d.com',   fecha_alta: '4-4-2021',   dir_envio: 'calle tal pal 4', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as63d.com',   fecha_alta: '6-6-2021',   dir_envio: 'calle tal pal 6', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as93d.com',   fecha_alta: '9-9-2021',   dir_envio: 'calle tal pal 9', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as103d.com',  fecha_alta: '10-10-2021', dir_envio: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as123d.com',  fecha_alta: '12-12-2021', dir_envio: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as143d.com',  fecha_alta: '14-14-2021', dir_envio: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as153d.com',  fecha_alta: '15-15-2021', dir_envio: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as183d.com',  fecha_alta: '18-18-2021', dir_envio: 'calle tal pal 1', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as203d.com',  fecha_alta: '20-20-2021', dir_envio: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as223d.com',  fecha_alta: '22-22-2021', dir_envio: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as243d.com',  fecha_alta: '24-24-2021', dir_envio: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as263d.com',  fecha_alta: '26-26-2021', dir_envio: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as283d.com',  fecha_alta: '28-28-2021', dir_envio: 'calle tal pal 2', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as303d.com',  fecha_alta: '30-30-2021', dir_envio: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as33d.com',   fecha_alta: '3-2-2021',   dir_envio: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as53d.com',   fecha_alta: '5-5-2021',   dir_envio: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as93d.com',   fecha_alta: '9-9-2021',   dir_envio: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as93d.com',   fecha_alta: '9-3-2021',   dir_envio: 'calle tal pal 3', opciones: { guardar: false, editar: true, eliminar: true} },
      //   {nombre: 'pedro', email: 'miemail@as103d.com',  fecha_alta: '10-4-2021',  dir_envio: 'calle tal pal 4', opciones: { guardar: false, editar: true, eliminar: true} },
      // ];
      // this.ELEMENT_DATA = ELEMENT_DATA;
      // this.dataSource = new MatTableDataSource<DatosPersonales>(ELEMENT_DATA);
    }
  }

  /**
   * Obtiene datos facturas
   */
  getFacturas(){
    const ELEMENT_DATA: Facturas[] = [];
    this.apiService.getFacturasData().subscribe(
      (res)=> {
        let result: any = res;
        if(result.id_status == '1'){

          for(let d of result.data){
            ELEMENT_DATA.push(
              {
                nombre: d.nombre_factura, 
                fecha_emision: d.fecha_emision,
                importe: d.importe, 
                dir_suministro: d.direccion_suministro, 
                opciones: { 
                  guardar: false, 
                  editar: true, 
                  eliminar: false,
                  id: d.id_facturas
                } 
              }
            );
          }
          this.ELEMENT_DATA = ELEMENT_DATA
          this.dataSource = new MatTableDataSource<Facturas>(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        }
        else {
          this.error = 'Intenleto más tarde, algo no ha ido bien!';
        }
      }
    );

  }

  /**
   * Obtiene datos personales
   */
  getDatosPersonales() {
    const ELEMENT_DATA: DatosPersonales[] = [];
    this.apiService.getDatosPersonalesData().subscribe(
      (res)=> {
        let result: any = res;
        if(result.id_status == '1'){
          for(let d of result.data){
            ELEMENT_DATA.push(
              {
                nombre: d.nombre_titular, 
                email: d.email, 
                fecha_alta: d.fecha_alta,
                dir_envio: d.direccion_envio, 
                opciones: { 
                  guardar: false, 
                  editar: true, 
                  eliminar: false,
                  id: d.id_datos_personales
                } 
              }
            );
          }
          this.ELEMENT_DATA = ELEMENT_DATA
          this.dataSource = new MatTableDataSource<DatosPersonales>(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        }
        else {
          this.error = 'Intenleto más tarde, algo no ha ido bien!';
        }
      }
    );
  }


  /**
   * Método para realizar búsquedas en la tabla
   * @param e 
   */
  searchTable(e: any){
    let filterValue = e.target.value;
    console.log('filterValue');
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Métodos para imprimir tabla en PDF
   */
  printTable() {
    const doc = new jsPDF();
    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    autoTable(doc, 
      { 
        html: '#table' 
      });
    doc.save('table.pdf')
  }

  /**
   * Método cerrar modal
   * @param e 
   */
  closeModal(e: any){
    this.msg_modal = '';
  }


  disableTdEditables(els: any){
    let cont = 0;
    for (let el of els) {
      if(cont < els.length-1){
        el.style.background = 'initial';
        el.style.color = '#fff';
        // el.contentEditable = false;
        el.children[0].style.pointerEvents = 'none';
        el.children[0].style.background = 'transparent';
        el.children[0].style.border = 'none';
        el.children[0].style.color = 'white';
      }
      cont++;
    }
    this.last_edit_elements = null;
  }

  /**
   * Método para editar filas de la tabla
   */
  last_edit_elements: any;
  prev_index: any = null;
  editRow(e: any, index: number) {
    // Si añadir está activo
    let data = this.dataSource.data;
    if(!this.add_row){
      this.dataSource.data[0].opciones.guardar = false;
      this.dataSource.data[0].opciones.editar = true;
      // this.dataSource.data[0].opciones.eliminar = true;
    }
    this.dataSource.data = data;
    // this.add_row = true;
    // Si hay alguno seleccionado con index
    if(this.prev_index != null){
      this.dataSource.data[this.prev_index].opciones.guardar = false;
      this.dataSource.data[this.prev_index].opciones.editar = true;
      // this.dataSource.data[this.prev_index].opciones.eliminar = true;
      this.prev_index = null;
    }
    this.prev_index = index;
    this.dataSource.data[index].opciones.guardar = true;
    this.dataSource.data[index].opciones.editar = false;
    this.dataSource.data[index].opciones.eliminar = false;
    // let tdElemens = e.target.parentElement.parentElement.parentElement.parentElement.children;
    let tdElemens = this.tabla_tr['_results'][index].nativeElement.children;
    // Se desabilitan los editables de los previso activos
    if(this.last_edit_elements){
      this.disableTdEditables(this.last_edit_elements);
    }
    this.last_edit_elements = tdElemens;
    let cont = 0;
    for (let el of tdElemens) {
      if(cont < tdElemens.length-1){
        el.style.background = '#ddd';
        el.style.color = '#000';
        // el.contentEditable = true;
        el.children[0].style.pointerEvents = 'initial';
        el.children[0].style.background = '#bbb';
        el.children[0].style.border = '1px solid #bbb';
        el.children[0].style.color = '#000';
        if(cont == 0){
          el.children[0].focus();
        }
      }
      cont++;
    }
  }


  /**
   * Método para guardar los datos de la tabla
   */
   guardarRow(index:  number) {
    this.msg_modal = 'Espere. Guardando...';
    let data = this.dataSource.data[index];
    this.apiService.updateTablaCampo(this.tabla, data)?.subscribe(
      res => {
        let result: any = res;
        if(result.id_status == '1'){
          if(this.prev_index == index){
            this.prev_index = null;
          }
          this.dataSource.data[index].opciones.guardar = false;
          this.dataSource.data[index].opciones.editar = true;
          // this.dataSource.data[index].opciones.eliminar = true;
          
          // Se desabilitan los editables de los previso activos
          if(this.last_edit_elements){
            this.disableTdEditables(this.last_edit_elements);
          }
          setTimeout(() => { // Se espera 1 segundo para cambiar el texto
            this.msg_modal = 'Guardado correctamente';
            setTimeout(() => {
              this.msg_modal = ''; // Se cierra pasados 5 segundos
            },5000);
          },1000);
          
        }
        else {
          setTimeout(() => {// Se espera 1 segundo para cambiar el texto
            this.msg_modal = 'Ha habido un error, inténtelo más tarde';
            setTimeout(() => {
              this.msg_modal = ''; // Se cierra pasados 5 segundos
            },5000);
          },1000);
        }
      }
    );
  }



  /**
   * Método para agregar nuevos elementos a la tabla
   * Para añadirlo y testeo, 
   */
  // flag_new_row = false;
  addRow(){


    //   // Si hay alguno seleccionado con index en editar
    //   if(this.prev_index != null){
    //     this.dataSource.data[this.prev_index].opciones.guardar = false;
    //     this.dataSource.data[this.prev_index].opciones.editar = true;
    //     this.dataSource.data[this.prev_index].opciones.eliminar = true;
    //     this.prev_index = null;
    //   }
  
    //   // this.add_row = false;
    //   let new_row = {nombre: '', email: '',  fecha_alta: '',  dir_envio: '', opciones: { guardar: true, editar: false, eliminar: true} }
  
    //   const data = this.dataSource.data;
    //   data.unshift(new_row);
    //   this.dataSource.data = data;
    //   this.flag_new_row = true;
      
      
    //   // Se desabilitan los editables de los previso activos
    //   if(this.last_edit_elements){
    //     this.disableTdEditables(this.last_edit_elements);
    //   }
  
      
    //   console.log(this.tabla_tr);
  
    //   console.log('added row');
    //   console.log('added row');
    //   console.log('added row');
  
  }


  /**
   * Método para eliminar elementos de la tabla
   * No se hace
   */
  // deleteRow(index: number){

  //   console.log('index');
  //   console.log(index);

  //   if(this.prev_index != null){
  //     this.dataSource.data[this.prev_index].opciones.guardar = false;
  //     this.dataSource.data[this.prev_index].opciones.editar = true;
  //     this.dataSource.data[this.prev_index].opciones.eliminar = true;
  //     this.prev_index = null;
  //   }

  //   let data = this.dataSource.data;
  //   if(!this.add_row){ // Si es añadir nuevo
  //     data.splice(0,1);
  //   }
  //   else {
  //     data.splice(index,1);
  //   }
    
  //   this.dataSource.data = data;
  //   // this.add_row = true;


  //   // Se desabilitan los editables de los previso activos
  //   if(this.last_edit_elements){
  //     this.disableTdEditables(this.last_edit_elements);
  //   }

  // }

}

import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modelos
import { Producto, TipoProducto } from 'src/app/shared/models/index.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class MenuService {

  public tickets: Producto [] = []
  public productos: Producto [] = []
  public tipoProducto: TipoProducto [] = []

  //PRODUCTOS observable
  private tiposObservable: BehaviorSubject <TipoProducto[]> = new BehaviorSubject<TipoProducto[]>(
    null
  );

  //TIPOS observable
  private productoObservable: BehaviorSubject <Producto[]> = new BehaviorSubject<Producto[]>(
    null
  );

  //TICKETS bservable
  public ticketObservable: BehaviorSubject <Producto[]> = new BehaviorSubject<Producto[]>(
    null
  );

  //TOTAL bservable
  private totalObservable: BehaviorSubject <number> = new BehaviorSubject<number>(
    null
  );

  //MENU observable
  private menuObservable: BehaviorSubject <Producto[]> = new BehaviorSubject<Producto[]>(
    null
  );

  // Obtenemos el observable
  getTipo = this.tiposObservable.asObservable();
  getProducto = this.productoObservable.asObservable();
  getTickets = this.ticketObservable.asObservable();
  getTotal = this.totalObservable.asObservable();
  getMenus = this.menuObservable.asObservable();
  
  // Enviamos el TIPO al arreglo 
  set setTipo(tipo: TipoProducto[]){
    this.tiposObservable.next(tipo)
  }

  // Enviamos el PRODUCTO al arreglo 
  set setProducto(producto: Producto[]){
    this.productoObservable.next(producto);
  }

  // Enviamos los TICKET al arreglo 
  set setTickets(data: Producto){
    this.tickets.push(data);
    this.ticketObservable.next(this.tickets);
    this.setTotal(this.tickets)
  }

  // Enviamos el MENU al arreglo 
  set setMenu(menu: Producto[]){
    this.menuObservable.next(menu);
  }


  // Url api
  API_URI = environment.wsUrl;

  constructor(private http: HttpClient) {
    this.getProductos();
    this.getTipos();
    
  }
  resetTicket(){
    this.tickets = []
    this.ticketObservable.next(this.tickets)
    this.setTotal(this.tickets)
  }

  setTotal(data: Producto[]){
    const total = data.reduce((suma, d) => suma + d.valor, 0);
    this.totalObservable.next(total);
  }

  //Obtenemos los tipos de los productos
  getTipos() {
    return this.http.get<TipoProducto[]>(`${this.API_URI}/producto/tipo/producto/`)
    .subscribe(tipos => {
      if(tipos.length > 0){
        this.setTipo = tipos
      }});
  }

  //Obetenemos los productos
  getProductos() {
    return this.http.get<Producto[]>(`${this.API_URI}/producto`)
    .subscribe( data =>{
      if(data.length > 0){
        this.setProducto = data;
        this.getMenu(data);
      }
    })
  }

  //Obtenemos el menu activo
  
  getMenu(data: Producto[]) {    
    const menu = data.filter( d => d.menu == true);
    this.setMenu = menu;    
  }

}

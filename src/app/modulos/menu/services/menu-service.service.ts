import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// Modelos
import { Producto, TipoProducto } from 'src/app/shared/models/index.models';
import { environment } from 'src/environments/environment';
import { StoreProducts } from '../Class/storeProducts';


@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public store: StoreProducts = new StoreProducts();

  // Store observable
  private StoreObservable: BehaviorSubject <StoreProducts> = new BehaviorSubject<StoreProducts>(this.store);

  // Obtiene los Datos de la Store
  get getStore(){
    return this.StoreObservable.asObservable();
  }

  set setStoreProductos( productos: Producto[]){
    this.store.productos = productos;
    this.StoreObservable.next(this.store);
    console.log(this.store);
  }

  set setStoreTipos(tipos: TipoProducto[]){
    this.store.tipoProducto = tipos;
    this.StoreObservable.next(this.store);
  }

  set setStoreTickets(ticket: Producto){
    this.store.tickets.push(ticket);
    this.StoreObservable.next(this.store);
  }

  set setDeletTickets(id: number){
    this.store.tickets.splice(id, 1);
    this.StoreObservable.next(this.store);
  }

  set DeletTickets(tickets: Producto[]){
    this.store.tickets = tickets;
    this.StoreObservable.next(this.store);
  }

  // MENU observable
  private menuObservable: BehaviorSubject <Producto[]> = new BehaviorSubject<Producto[]>(
    null
  );

  getMenus = this.menuObservable.asObservable();

  set setMenu(menu: Producto[]){
    this.menuObservable.next(menu);
  }

  // Url api
  API_URI = environment.wsUrl;

  constructor(private http: HttpClient) {
    this.getProductos();
    this.getTipos();

  }
      // Obetenemos los PRODUCTOS
      getProductos() {
        return this.http.get<Producto[]>(`${this.API_URI}/producto`)
        .subscribe( data => {
          if (data.length > 0){
            this.setStoreProductos = data;
            const menu = this.store.getMenu();
            this.setMenu = menu;
          }
        });
      }

      // Obtiene los tipos de PRODUCTOS
      getTipos() {
        return this.http.get<TipoProducto[]>(`${this.API_URI}/producto/tipo/producto/`)
        .subscribe(tipos => {
          if (tipos.length > 0){
            this.setStoreTipos = tipos;
          }});
      }

}

import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class ReservaService {

  API_URI = 'http://localhost:3000/api';
  
  
  

  constructor(private http: HttpClient) {

   }

 
   userPedidos(id: string){
    return this.http.get( `${this.API_URI}/pedido/user/${id}`);
  }

    getUserPedidos(id: number){
    return this.http.get( `${this.API_URI}/pedido/dataPedido/${id}`);
  }

  
}

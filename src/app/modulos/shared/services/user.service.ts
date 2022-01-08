import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interfaces
import { User } from '../models/index.models';
import { environment } from 'src/app/shared/http/environments/environment';




@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  //Variable Auth0
  public user: User;
  

  private API_URI = environment.wsUrl;

  constructor(
    private http: HttpClient
  ) { 
  }

  // CRUD user.
  //Obetenemos todos los usuarios.
  getUsers() {
    return this.http.get<User[]>(`${this.API_URI}/user`);
  }

  //Obtenemos un usuario.
  getUser(id: string | number) {
    return this.http.get<User>(`${this.API_URI}/user/${id}`);
  }

  //Obtenemos el usuario.
  getUserPedido(id: number) {
    return this.http.get(`${this.API_URI}/user/Upedido/${id}`);
  }

  //Eliminamos usuario.
  deleteUser(id: string) {
    return this.http.delete(`${this.API_URI}/user/${id}`);
  }

  //Guardamos usuario.
  saveUser(user: User) {
    return this.http.post(`${this.API_URI}/user`, user);
  }

}

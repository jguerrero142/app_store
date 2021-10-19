import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Interfaces
import { User } from '../models/index.models';

//Servicios
import { AuthService } from '../../core/auth/auth.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  //Variable Auth0
  public user: User;
  

  private API_URI = environment.wsUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { 
  }

  //Validamos el usuario Auth
  // getAuth() {
  //   this.auth.userProfile$.subscribe((perfil: User) => {
  //     this.user = perfil;
  //     if (this.user) {
  //       this.loginUser(this.user.sub, this.user).subscribe((resp) => {});
  //       this.updateUser(this.user.sub, this.user).subscribe((res) => {});
  //     }
  //   });
  // }

  // loginUser(id: string | number, updateUser: User): Observable<User> {
  //   return this.http.post<User>(`${this.API_URI}/user/login/${id}`, updateUser);
  // }

  // updateUser(id: string | number, updateUser: User) {
  //   return this.http.put<User>(`${this.API_URI}/user/${id}`, updateUser).pipe(
  //     map((res) => {
  //       return res;
  //     })
  //   );
  // }


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

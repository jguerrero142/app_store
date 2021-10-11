import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../core/auth/auth.service';





@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  roleS = new EventEmitter<number>();
  userSID = new EventEmitter<number>();
  getUs = new EventEmitter<User>();
  getImg = new EventEmitter<string>();

  //Variable Auth0
  public user: User;
  public role: any;
  public id: any;
  public userId: number;
  
  
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
              private auth: AuthService,){}
  
  //Validamos el usuario Auth
  getAuth(){
      this.auth.userProfile$.subscribe((perfil: User) => {
        this.user = perfil;   
        if(this.user){
          this.loginUser(this.user.sub,this.user).subscribe(resp=>{})
          this.updateUser(this.user.sub,this.user).subscribe(res=>{this.getUs.emit(res);})              
        }
      });
    }

  loginUser(id: string | number, updateUser: User): Observable<User>{
        return this.http.post(`${this.API_URI}/user/login/${id}`, updateUser);
      }


  updateUser(id: string | number, updateUser: User){
        return this.http.put(`${this.API_URI}/user/${id}`, updateUser)
        .pipe(map((res: User)=>{
          this.id = res.id_user;
          this.userId = this.id;
          this.userSID.emit(this.id);
          this.role = res.role;
          this.roleS.emit(this.role);
          return res;
        }));
  }


         
  // CRUD user.
  //Obetenemos todos los usuarios.
  getUsers(){
      return this.http.get(`${this.API_URI}/user`);
    }

  //Obtenemos un usuario.
  getUser(id: string | number){
      return this.http.get(`${this.API_URI}/user/${id}`)
    }

  //Obtenemos el usuario.
  getUserPedido(id: number){
      return this.http.get(`${this.API_URI}/user/Upedido/${id}`)
    }

  //Eliminamos usuario.
  deleteUser(id: string){
      return this.http.delete(`${this.API_URI}/user/${id}`);
    }

  //Guardamos usuario.
  saveUser(user: User){
      return this.http.post(`${this.API_URI}/user`, user);
    }

  //Actualizamos usuario.
  // updateUser(id: string | number, updateUser: User): Observable<User>{
  //     return this.http.put(`${this.API_URI}/user/${id}`, updateUser);
  //   }
    
}

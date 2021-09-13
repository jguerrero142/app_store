import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../shared/models/User';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';





@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  roleS = new EventEmitter<number>();
  userSID = new EventEmitter<number>();
  getUs = new EventEmitter<any>();

  //Variable Auth0
  user: User;
  role: any;
  id: any;
  
  
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
              private auth: AuthService,)
  {
    this.getEvent();
  }
    //Obtenemos el usuario Auth / Se dispara el evento Id del usuario.
    getAuth(){
      this.auth.userProfile$.subscribe((perfil: User) => {
        this.user = perfil;   
        if(this.user){
          this.getUs.emit(this.user.sub);          
        }
      });
    }
    //Enviamos el Token google para consultar el usuario
    //base de datos propia
    getEvent(){
      this.getUs.subscribe((res: any) =>{this.id = res;
      this.validarUser(this.id)
      .subscribe(res=>{})
      });
  }
  //Validamos el user en base de datos / Se dispara el evento Role y userSID
  validarUser(id: string | number){      
      return this.http.get(`${this.API_URI}/user/${id}`)
        .pipe(map((res: User)=>{          
          this.role = res.role;
          this.id = res.id_user;
          this.userSID.emit(this.id);
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
    updateUser(id: string | number, updateUser: User): Observable<User>{
      return this.http.put(`${this.API_URI}/user/${id}`, updateUser);
    }
    
}

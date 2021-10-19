import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modals
import { User } from '../shared/models/index.models';
import { environment } from 'src/environments/environment';

//Servicios
import { AuthService } from './auth/auth.service';
import { Store } from './modal/Store.modal';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  //Variable Auth0
  private store: Store [] = [];
  public user: User;
  
  private storeObservable: BehaviorSubject<Store[]> = new BehaviorSubject<Store[]>(
    null
  );

  private userObservable: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );

  getStore = this.storeObservable.asObservable();
  getUser = this.userObservable.asObservable();
  // get userGetObs() {
  //   return this.userObservable.asObservable();
  // }

  set setStore(store: Store) { 
    this.store.push(store);   
    this.storeObservable.next(this.store);
    console.log(this.store)
  }

  set userSetObs(data: User) {    
    this.userObservable.next(data);
  }

  // Url api
  API_URI = environment.wsUrl;

  constructor(  private auth: AuthService,
                private http: HttpClient
                ){ 
                
                }

  getAuth() {
    this.auth.userProfile$.subscribe((perfil: User) => {
      this.user = perfil;
      if (this.user) {
        this.loginUser(this.user.sub, this.user).subscribe(s => {
        this.userSetObs = s;
        this.setStore = s;
      });
      }
    });
  }

  loginUser(id: string | number, updateUser: User): Observable<User> {
    return this.http.post<User>(`${this.API_URI}/user/login/${id}`, updateUser);
  }
  

  

}
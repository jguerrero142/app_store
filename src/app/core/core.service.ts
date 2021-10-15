import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/index.models';
import { Users } from '../shared/Class/User.class';

@Injectable()
export class CoreService {
  public role: number;
  private userObservable: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );
  private roleObservable: BehaviorSubject<number> = new BehaviorSubject<number>(
    null
  );

  get userGetObs() {
    return this.userObservable.asObservable().pipe(
      map((d) => {
        return new Users(
          d.id_user,
          d.sub,
          d.name,
          d.picture,
          d.email,
          d.created_at,
          d.given_name,
          d.family_name,
          d.nickname,
          d.locale,
          d.updated_at,
          d.email_verified,
          d.role,
          d.id_empresa
        );
      })
    );
  }

  set userSetObs(data: User) {
    this.userObservable.next(data);
  }

  //   get userGetObs(){
  //     return this.userObservable.asObservable();
  //   }

  //   set userSetObs(data: User) {
  //     this.userObservable.next(data);
  //   }

  //   get roleGetObs(): Observable<number> {
  //     return this.roleObservable.asObservable();
  //   }

  //   set roleSetObs(data: number) {
  //     this.roleObservable.next(data);
  //   }

  // get userRoleObs(): Observable<User>{
  //     return this.userObservable.asObservable()
  //     .pipe(map( d  => new Users (d.role) ))

  // }
}

// export interface Users{
//     name: string
// }

// @Injectable()
// export class CoreService {
//     private sharingObservable: BehaviorSubject<Users> =
//     new BehaviorSubject<Users>({name:'julian andres'})

//     get userObservable(){
//         return this.sharingObservable.asObservable();
//     }

//     set userData(data: Users){

//         this.sharingObservable.next(data);
//     }

// }

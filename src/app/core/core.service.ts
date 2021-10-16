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
  
  getUser = this.userObservable.asObservable();
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

}
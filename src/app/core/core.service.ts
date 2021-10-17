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
    return this.userObservable.asObservable();
  }

  set userSetObs(data: User) {
    this.userObservable.next(data);
  }

}
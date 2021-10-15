import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/User';
import { Users } from '../shared/models/User.class';


@Injectable()
export class CoreService {

    public role: number;
    private userObservable: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    get userGetObs(){
        return this.userObservable.asObservable();
    }

    set userSetObs(data:User){
        this.userObservable.next(data);
    }

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
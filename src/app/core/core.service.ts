import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Users{
    name: string
}

@Injectable()
export class CoreService {
    private sharingObservable: BehaviorSubject<Users> = 
    new BehaviorSubject<Users>({name:'julian andres'})

    get userObservable(){
        return this.sharingObservable.asObservable();
    }

    set userData(data: Users){

        this.sharingObservable.next(data);
    }


}
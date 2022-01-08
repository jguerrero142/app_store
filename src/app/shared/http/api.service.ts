import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/shared/http/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URI = environment.wsUrl;

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T>{
    return this.http.get<T>(`${this.API_URI}/${url}`)
  }
}

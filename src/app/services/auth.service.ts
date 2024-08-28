import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private http = inject(HttpClient)

  base_url ="http://localhost:7000/api/auth"

  // 
  register(data: User): Observable<any> {
    return this.http.post<User>(`${this.base_url}/signup`, data)
  }

}

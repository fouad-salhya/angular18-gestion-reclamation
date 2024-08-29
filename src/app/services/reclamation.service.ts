import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reclamation } from '../models/reclamation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  http = inject(HttpClient)

  base_url = "localhost:8002/reclamation";

  saveRecl(data: Reclamation): Observable<any> {
    return this.http.post<Reclamation>(`${this.base_url}/create`, data)
  }
}

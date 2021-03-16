import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  connexion(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}

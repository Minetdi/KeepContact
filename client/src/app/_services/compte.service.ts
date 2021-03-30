import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utilisateur } from '../_models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private source = new ReplaySubject<Utilisateur>(1);
  utilisateurCourrant$ = this.source.asObservable();

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  connexion(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: Utilisateur) => {
        const utilisateur = response;
        if (utilisateur) {
          localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
          this.source.next(utilisateur);
        }
      }) 
    );
  }

  inscription(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((utilisateur: Utilisateur) => {
        if (utilisateur) {
          localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
          this.source.next(utilisateur);
        }
      }) 
    );
  }
  
  deconnexion() {
    localStorage.removeItem('utilisateur');
    this.source.next(null);
  }


  setUtilisateurCourrant(utilisateur : Utilisateur) {
    this.source.next(utilisateur);
  }

}



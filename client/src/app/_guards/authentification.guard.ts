import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompteService } from '../_services/compte.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {
  constructor(private compte: CompteService, private notifications: ToastrService) {
    
  }

  canActivate(): Observable<boolean> {
    return this.compte.utilisateurCourrant$.pipe(
      map(utilisateur => {
        if (utilisateur) return true;
        this.notifications.error("Connexion impossible");
      })
    )
  }
  
}

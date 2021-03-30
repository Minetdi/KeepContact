import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../_models/utilisateur';
import { CompteService } from '../_services/compte.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  utilisateursCourrants$ : Observable<Utilisateur>;

  constructor(private compteService : CompteService ) { }

  ngOnInit(): void {
    this.utilisateursCourrants$ = this.compteService.utilisateurCourrant$;
  }

  // Retourne un service pour de connexion
  connexion() {
    this.compteService.connexion(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  deconnexion() {
    this.compteService.deconnexion();
  }

  

}

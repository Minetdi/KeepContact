import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public compteService : CompteService, private router : Router, private notifications: ToastrService ) { }

  ngOnInit(): void {

  }

  // Retourne un service pour de connexion
  connexion() {
    this.compteService.connexion(this.model).subscribe(response => {
      this.router.navigateByUrl('/members')
    }, error => {
      console.log(error);
      this.notifications.error(error.error);
    });
  }

  deconnexion() {
    this.compteService.deconnexion();
    this.router.navigateByUrl('/')
  }

  

}

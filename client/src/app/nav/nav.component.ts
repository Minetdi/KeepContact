import { Component, OnInit } from '@angular/core';
import { CompteService } from '../_services/compte.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  connecte : boolean

  constructor(private compteService : CompteService ) { }

  ngOnInit(): void {
  }

  // Retourne un service pour de connexion
  connexion() {
    this.compteService.connexion(this.model).subscribe(response => {
      console.log(response);
      this.connecte = true;
    }, error => {
      console.log(error);
    });
  }

  deconnexion() {
    this.connecte = false;
  }

}

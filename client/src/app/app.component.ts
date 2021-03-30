import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './_models/utilisateur';
import { CompteService } from './_services/compte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'keep Contact';
  users: any;

  constructor(private compteService : CompteService) {}

  ngOnInit(): void {
    this.setUtilisateurCourrant();
  }


  setUtilisateurCourrant() {
    const utilisateur: Utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    this.compteService.setUtilisateurCourrant(utilisateur)
  }

}

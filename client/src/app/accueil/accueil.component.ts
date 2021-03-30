import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit {
  modeInscription = false;
  utilisateurs : any;

  constructor() { }

  ngOnInit(): void {
  }

  Inscription() {
    this.modeInscription = !this.modeInscription;
  }

  annulerModeInscription(event: boolean) {
    this.modeInscription = event
  }

}

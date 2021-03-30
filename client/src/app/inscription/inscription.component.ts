import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompteService } from '../_services/compte.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  @Output() annulerInscription = new EventEmitter();
  model: any = {};
  
  constructor(private compte: CompteService) { }

  ngOnInit(): void {
  }

  inscription () {
    this.compte.inscription(this.model).subscribe(response => {
      console.log(response);
      this.annuler();
    }, error => {
      console.log(error);
    })
  }

  annuler() {
    this.annulerInscription.emit(false);
  }
}

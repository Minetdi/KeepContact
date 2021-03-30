import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompteService } from '../_services/compte.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  @Output() annulerInscription = new EventEmitter();
  model: any = {};
  
  constructor(private compte: CompteService, private notifications: ToastrService) { }

  ngOnInit(): void {
  }

  inscription () {
    this.compte.inscription(this.model).subscribe(response => {
      console.log(response);
      this.annuler();
    }, error => {
      console.log(error);
      this.notifications.error(error.error);
    })
  }

  annuler() {
    this.annulerInscription.emit(false);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ListesComponent } from './listes/listes.component';
import { DetailMembreComponent } from './membres/detail-membre/detail-membre.component';
import { ListeMembresComponent } from './membres/liste-membres/liste-membres.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthentificationGuard } from './_guards/authentification.guard';

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthentificationGuard],
    children: [
      {path: '', component: AccueilComponent},
      {path: 'members', component: ListeMembresComponent, canActivate: [AuthentificationGuard]},
      {path: 'members/:id', component: DetailMembreComponent},
      {path: 'lists', component: ListesComponent},
      {path: 'messages', component: MessagesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

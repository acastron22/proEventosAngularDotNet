// imports angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// telas básicas
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ContatosComponent } from './componentes/contatos/contatos.component';

//tela palestrantes
import { PalestrantesComponent } from './componentes/palestrantes/palestrantes.component';

// telas de usuário - registro e login
import { UserComponent } from './componentes/user/user.component';
import { LoginComponent } from './componentes/user/login/login.component';
import { RegistrarComponent } from './componentes/user/registrar/registrar.component';
import { PerfilComponent } from './componentes/user/perfil/perfil.component';

// telas do eventos - lista de eventos e detalhe do evento
import { EventosComponent } from './componentes/eventos/eventos.component';
import { EventoListaComponent } from './componentes/eventos/evento-lista/evento-lista.component';
import { EventoDetalheComponent } from './componentes/eventos/evento-detalhe/evento-detalhe.component';

//AuthGuard - Guardião de rotas
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'user', redirectTo: 'user/perfil'},
      { path: 'user/perfil', component: PerfilComponent },
      { path: 'eventos', redirectTo: 'eventos/lista'},
      {
        path: 'eventos',
        component: EventosComponent,
        children: [
          { path: 'detalhe/:id', component: EventoDetalheComponent },
          { path: 'detalhe', component: EventoDetalheComponent },
          { path: 'lista', component: EventoListaComponent },
        ],
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'palestrantes', component: PalestrantesComponent },
      { path: 'contatos', component: ContatosComponent },
    ]
  },

  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registrar', component: RegistrarComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

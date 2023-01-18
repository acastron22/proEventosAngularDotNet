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

const routes: Routes = [
    { path: 'eventos', redirectTo: 'eventos/lista', pathMatch: 'full' },
    {
        path: 'eventos',
        component: EventosComponent,
        children: [
            { path: 'detalhe/:id', component: EventoDetalheComponent },
            { path: 'detalhe', component: EventoDetalheComponent },
            { path: 'lista', component: EventoListaComponent },
        ],
    },
    {
        path: 'user',
        component: UserComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'registrar', component: RegistrarComponent },
        ],
    },
    { path: 'user/perfil', component: PerfilComponent },
    { path: 'contatos', component: ContatosComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'palestrantes', component: PalestrantesComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

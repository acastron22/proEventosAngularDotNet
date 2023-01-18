import { RegistrarComponent } from './componentes/user/registrar/registrar.component';
import { UserComponent } from './componentes/user/user.component';
import { EventoDetalheComponent } from './componentes/eventos/evento-detalhe/evento-detalhe.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PalestrantesComponent } from './componentes/palestrantes/palestrantes.component';
import { ContatosComponent } from './componentes/contatos/contatos.component';
import { EventoListaComponent } from './componentes/eventos/evento-lista/evento-lista.component';
import { LoginComponent } from './componentes/user/login/login.component';

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
    { path: 'contatos', component: ContatosComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'palestrantes', component: PalestrantesComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

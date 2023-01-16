import { EventosComponent } from './componentes/eventos/eventos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PalestrantesComponent } from './componentes/palestrantes/palestrantes.component';
import { ContatosComponent } from './componentes/contatos/contatos.component';

const routes: Routes = [
    { path: 'contatos', component: ContatosComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'eventos', component: EventosComponent },
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

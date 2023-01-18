// Componentes da aplicação
import { AppComponent } from './app.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { NavegacaoComponent } from './shared/navegacao/navegacao.component';
import { PalestrantesComponent } from './componentes/palestrantes/palestrantes.component';
import { AppRoutingModule } from './app-routing.module';
import { TituloComponent } from './shared/titulo/titulo.component';
import { ContatosComponent } from './componentes/contatos/contatos.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { PerfilComponent } from './componentes/user/perfil/perfil.component';

// Services da aplicação
import { EventoService } from './services/evento.service';

// Angular Components
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DateTimeFormatPipe } from './helpers/date-time-format.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

// ngx
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EventoDetalheComponent } from './componentes/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './componentes/eventos/evento-lista/evento-lista.component';
import { UserComponent } from './componentes/user/user.component';
import { LoginComponent } from './componentes/user/login/login.component';
import { RegistrarComponent } from './componentes/user/registrar/registrar.component';

@NgModule({
    declarations: [
        AppComponent,
        EventosComponent,
        PalestrantesComponent,
        NavegacaoComponent,
        DateTimeFormatPipe,
        TituloComponent,
        ContatosComponent,
        DashboardComponent,
        PerfilComponent,
        EventoDetalheComponent,
        EventoListaComponent,
        UserComponent,
        LoginComponent,
        RegistrarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        FormsModule,
        TooltipModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            progressBar: true,
        }),
        NgxSpinnerModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [EventoService],
    bootstrap: [AppComponent],
})
export class AppModule {}

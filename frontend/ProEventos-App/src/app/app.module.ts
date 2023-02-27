// Componentes da aplicação
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContatosComponent } from './componentes/contatos/contatos.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { EventoDetalheComponent } from './componentes/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './componentes/eventos/evento-lista/evento-lista.component';
import { LoginComponent } from './componentes/user/login/login.component';
import { NavegacaoComponent } from './shared/navegacao/navegacao.component';
import { PalestrantesComponent } from './componentes/palestrantes/palestrantes.component';
import { PalestranteListaComponent } from './componentes/palestrantes/palestrante-lista/palestrante-lista.component';
import { PalestranteDetalheComponent } from './componentes/palestrantes/palestrante-detalhe/palestrante-detalhe.component';
import { PerfilComponent } from './componentes/user/perfil/perfil.component';
import { PerfilDetalheComponent } from './componentes/user/perfil/perfil-detalhe/perfil-detalhe.component';
import { RegistrarComponent } from './componentes/user/registrar/registrar.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { UserComponent } from './componentes/user/user.component';

// Services da aplicação
import { EventoService } from './services/evento.service';
import { LoteService } from './services/lote.service';
import { AccountService } from './services/account.service';
import { DateTimeFormatPipe } from './helpers/date-time-format.pipe';

// Interceptor
import { JwtInterceptor } from './interceptors/jwt.interceptor';

// Angular Components
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

// ngx
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCurrencyModule } from 'ngx-currency';
import { HomeComponent } from './componentes/home/home.component';

defineLocale('pt-br', ptBrLocale); //ngx bootstrap

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
    PerfilDetalheComponent,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrarComponent,
    HomeComponent,
    PalestranteListaComponent,
    PalestranteDetalheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    TooltipModule, //ngx bootstrap
    CollapseModule.forRoot(), //ngx bootstrap
    TabsModule.forRoot(), //ngx bootstrap
    BsDatepickerModule.forRoot(), //ngx bootstrap
    PaginationModule.forRoot(), //ngx bootstrap
    BsDropdownModule.forRoot(), //ngx bootstrap
    ModalModule.forRoot(), //ngx bootstrap
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  providers: [
    EventoService,
    LoteService,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

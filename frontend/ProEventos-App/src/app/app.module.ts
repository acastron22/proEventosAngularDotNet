// Componentes da aplicação
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { AppRoutingModule } from './app-routing.module';

// Services da aplicação
import { EventoService } from './services/evento.service';

// Angular Components
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DateTimeFormatPipe } from './helpers/date-time-format.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

// ngx
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    declarations: [
        AppComponent,
        EventosComponent,
        PalestrantesComponent,
        NavegacaoComponent,
        DateTimeFormatPipe,
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

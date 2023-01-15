import { EventoService } from './services/evento.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';

// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
    declarations: [
        AppComponent,
        EventosComponent,
        PalestrantesComponent,
        NavegacaoComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        FormsModule
    ],
    providers: [EventoService],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { IEvento } from '../../models/IEvento';
import { EventoService } from '../../services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

BrowserModule;

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

    ngOnInit(): void {

    }

    
}

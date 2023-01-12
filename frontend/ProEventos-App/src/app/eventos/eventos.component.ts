import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
    public eventos: any;

    constructor(private http: HttpClientModule) {}

    ngOnInit(): void {
        this.getEventos();
    }

    public getEventos(): void {
        this.eventos;
    }
}

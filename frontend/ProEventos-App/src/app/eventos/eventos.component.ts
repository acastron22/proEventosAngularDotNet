import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
BrowserModule

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
    public eventos: any;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getEventos();
    }

    public getEventos(): void {
        this.http.get('https:localhost:5001/api/evento').subscribe(
            (response: any) => (this.eventos = response),
            (error: any) => console.log(error)
        );
    }
}

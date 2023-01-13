import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
BrowserModule;

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
    public eventos: any = [];
    widthImg: number = 150;
    marginImg: number = 2;
    showImg: boolean = false;
    showText: string = 'Exibir Imagem';

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

    showImgFunction() {
        this.showImg = !this.showImg;
        this.showImg
            ? (this.showText = 'Ocultar Imagem')
            : (this.showText = 'Exibir Imagem');
    }
}

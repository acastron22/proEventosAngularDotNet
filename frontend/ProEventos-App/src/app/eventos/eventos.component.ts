import { EventoService } from './../services/evento.service';
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
    public eventosFiltrados: any = [];
    private _filtroLista: string = '';

    widthImg: number = 150;
    marginImg: number = 2;
    showImg: boolean = false;
    showText: string = 'Exibir Imagem';

    public get filtroLista() {
        return this._filtroLista;
    }

    public set filtroLista(value: string) {
        this._filtroLista = value;
        this.eventosFiltrados = this.filtroLista
            ? this.filtrarEventos(this.filtroLista)
            : this.eventos;
    }

    filtrarEventos(filtrarPor: string): any {
        filtrarPor = filtrarPor.toLocaleLowerCase();
        return this.eventos.filter(
            (evento: any) =>
                evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
    }

    constructor(private eventoService: EventoService) {}

    ngOnInit(): void {
        this.getEventos();
    }

    public getEventos(): void {
        this.eventoService.getEvento().subscribe(
            (response: any) => {
                this.eventos = response;
                this.eventosFiltrados = this.eventos;
            },
            (error: any) => console.log(error)
        );
        console.log(this.eventos);
    }

    showImgFunction() {
        this.showImg = !this.showImg;
        this.showImg
            ? (this.showText = 'Ocultar Imagem')
            : (this.showText = 'Exibir Imagem');
    }
}

import { IEvento } from './../models/IEvento';
import { EventoService } from './../services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
BrowserModule;

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
    public eventos: IEvento[] = [];
    public eventosFiltrados: IEvento[] = [];
    private _filtroLista: string = '';

    modalRef?: BsModalRef;
    message?: string;

    widthImg: number = 150;
    marginImg: number = 2;
    showImg: boolean = false;
    showText: string = 'Exibir';

    public get filtroLista() {
        return this._filtroLista;
    }

    public set filtroLista(value: string) {
        this._filtroLista = value;
        this.eventosFiltrados = this.filtroLista
            ? this.filtrarEventos(this.filtroLista)
            : this.eventos;
    }

    filtrarEventos(filtrarPor: string): IEvento[] {
        filtrarPor = filtrarPor.toLocaleLowerCase();
        return this.eventos.filter(
            (evento: any) =>
                evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
    }

    constructor(
        private eventoService: EventoService,
        private modalService: BsModalService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.spinner.show();
        this.getEventos();
    }

    public getEventos(): void {
        const observer = {
            next: (_eventos: IEvento[]) => {
                this.eventos = _eventos;
                this.eventosFiltrados = this.eventos;
                console.log(this.eventos);
            },
            erro: (error: any) => {
                this.spinner.hide();
                this.toastr.error('Erro ao Carregar os Eventos', 'Erro!');
            },
            complete: () => {
                this.spinner.hide();
            },
        };
        this.eventoService.getEvento().subscribe(observer);
    }

    public showImgFunction(): void {
        this.showImg = !this.showImg;
        this.showImg ? (this.showText = 'Ocultar') : (this.showText = 'Exibir');
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    confirm(): void {
        this.modalRef?.hide();
        this.toastr.success('O evento foi deletado!', 'Deletado!');
    }

    decline(): void {
        this.modalRef?.hide();
    }
}

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from './../../../services/evento.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEvento } from './../../../models/IEvento';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit {
  public eventos: IEvento[] = [];
  public eventosFiltrados: IEvento[] = [];
  public eventoName: string = '';
  public eventoId: number = 0;

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
    private spinner: NgxSpinnerService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.carregarEventos();
  }

  public carregarEventos(): void {
    const observer = {
      next: (_eventos: IEvento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
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

  openModal(
    event: any,
    template: TemplateRef<any>,
    eventoName: string,
    eventoId: number
  ) {
    event.stopPropagation();
    this.eventoName = eventoName;
    console.log(this.eventoId);
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        console.log(result);
        this.toastr.success(
          `O evento ${this.eventoName} foi deletado!`,
          'Deletado!'
        );
        this.spinner.hide();
        this.carregarEventos();
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(
          `Erro ao tentar deletar o evento ${this.eventoName}`,
          'Erro'
        );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number) {
    this.route.navigate([`eventos/detalhe/${id}`]);
  }
  mostrarImagem(imagemURL: string): string {
    return imagemURL !== ''
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : 'assets/imagensAngular/semImagem.jpeg';
  }
}

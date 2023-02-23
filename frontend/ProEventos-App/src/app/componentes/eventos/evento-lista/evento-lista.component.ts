import { PaginatedResult, Pagination } from './../../../models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from './../../../services/evento.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEvento } from './../../../models/IEvento';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit {
  public eventoName: string = '';
  public eventos: IEvento[] = [];
  public eventoId: number = 0;
  public pagination = {} as Pagination;

  modalRef?: BsModalRef;
  message?: string;

  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = false;
  showText: string = 'Exibir';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  filtrarEventos(evt: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filtrarPor) => {
          this.spinner.show();
          this.eventoService
            .getEvento(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filtrarPor
            )
            .subscribe(
              (paginatedResult: PaginatedResult<IEvento[]>) => {
                this.eventos = paginatedResult.result!;
                this.pagination = paginatedResult.pagination!;
              },
              (error: any) => {
                this.spinner.hide();
                this.toastr.error('Erro ao carregar os eventos', 'Erro!');
              }
            )
            .add(() => this.spinner.hide());
        });
    }
    this.termoBuscaChanged.next(evt.value);
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItem: 1,
      totalPages: 10,
    } as Pagination;

    this.carregarEventos();
  }

  carregarEventos(): void {
    this.spinner.show();
    this.eventoService
      .getEvento(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (paginatedResult: PaginatedResult<IEvento[]>) => {
          this.eventos = paginatedResult.result!;
          this.pagination = paginatedResult.pagination!;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os eventos', 'Erro!');
        },
        complete: () => this.spinner.hide(),
      });
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

  pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarEventos();
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
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

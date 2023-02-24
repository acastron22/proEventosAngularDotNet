import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { IPalestrante } from 'src/app/models/IPalestrante';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';
import { PalestranteService } from 'src/app/services/palestrante.service';

@Component({
  selector: 'app-palestrante-lista',
  templateUrl: './palestrante-lista.component.html',
  styleUrls: ['./palestrante-lista.component.scss'],
})
export class PalestranteListaComponent implements OnInit {
  public palestrantes: IPalestrante[] = [];
  public palestranteId: number = 0;
  public pagination = {} as Pagination;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(
    private palestranteService: PalestranteService,
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

    this.carregarPalestrantes();
  }

  filtrarPalestrante(evt: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filtrarPor) => {
          this.spinner.show();
          this.palestranteService
            .getPalestrantes(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filtrarPor
            )
            .subscribe(
              (paginatedResult: PaginatedResult<IPalestrante[]>) => {
                this.palestrantes = paginatedResult.result!;
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

  carregarPalestrantes(): void {
    this.spinner.show();
    this.palestranteService
      .getPalestrantes(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (paginatedResult: PaginatedResult<IPalestrante[]>) => {
          this.palestrantes = paginatedResult.result!;
          this.pagination = paginatedResult.pagination!;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os eventos', 'Erro!');
        },
        complete: () => this.spinner.hide(),
      });
  }
}

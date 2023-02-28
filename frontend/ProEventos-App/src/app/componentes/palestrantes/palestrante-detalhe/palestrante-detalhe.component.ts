import { IPalestrante } from './../../../models/IPalestrante';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PalestranteService } from './../../../services/palestrante.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-palestrante-detalhe',
  templateUrl: './palestrante-detalhe.component.html',
  styleUrls: ['./palestrante-detalhe.component.scss'],
})
export class PalestranteDetalheComponent implements OnInit {
  form!: FormGroup;
  situacaoDoForm = '';
  corDaDescricao = '';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    public palestranteService: PalestranteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.verificaForm();
    this.carregarPalestrante();
  }

  private validation(): void {
    this.form = this.fb.group({
      miniCurriculo: ['', [Validators.maxLength(400)]],
    });
  }

  private verificaForm(): void {
    this.form.valueChanges
      .pipe(
        map(() => {
          this.situacaoDoForm = 'Minicurrículo está sendo atualizado ';
          this.corDaDescricao = 'text-warning';
        }),
        debounceTime(1500),
        tap(() => this.spinner.show())
      )
      .subscribe(() => {
        this.palestranteService
          .put({ ...this.form.value })
          .subscribe(
            () => {
              this.situacaoDoForm = 'Minicurrículo foi atualizado!';
              this.corDaDescricao = 'text-success';

              setTimeout(() => {
                this.situacaoDoForm = 'Minicurrículo carregado ';
                this.corDaDescricao = 'text-muted';
              }, 2000);
            },
            () => {
              this.toastr.error('Minicurrículo não foi atualizado', 'Erro!');
            }
          )
          .add(() => this.spinner.hide());
      });
  }

  private carregarPalestrante(): void {
    this.spinner.show();
    this.palestranteService.getPalestrante().subscribe(
      (palestrante: IPalestrante) => {
        this.form.patchValue(palestrante);
      },
      (error: any) => {
        this.toastr.error('Erro ao carregar palestrante', 'Erro');
      }
    );
  }
}

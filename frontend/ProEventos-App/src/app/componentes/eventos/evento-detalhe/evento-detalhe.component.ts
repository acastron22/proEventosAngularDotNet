import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { EventoService } from './../../../services/evento.service';
import { IEvento } from 'src/app/models/IEvento';
import { ILotes } from 'src/app/models/ILotes';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  eventoId?: number;
  evento = {} as IEvento;
  form: FormGroup = this.formBuilder.group({});
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD.MM.YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService,
    private activeRouter: ActivatedRoute,
    private eventoService: EventoService,
    private loteService: LoteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarevento();
    console.log(this.carregarevento);
    this.validation();
  }

  carregarevento(): void {
    this.eventoId = +this.activeRouter.snapshot.paramMap.get('id')!;

    if (this.eventoId !== null || this.eventoId === 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(this.eventoId).subscribe({
        next: (evento: IEvento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
          this.carregarLotes();
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar o Evento', 'Erro!');
        },
      });
    } else {
      this.spinner.hide();
    }
  }

  carregarLotes(): void {
    this.loteService
      .getLotesByEventoId(this.eventoId!)
      .subscribe(
        (lotesRetorno: ILotes[]) => {
          lotesRetorno.forEach((lote) => {
            this.lotes.push(this.criarLote(lote));
          });
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar lotes', 'Erro');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public validation(): void {
    this.form = this.formBuilder.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      dataEvento: ['', [Validators.required]],
      qtdPessoas: [
        '',
        [Validators.required, Validators.min(1), Validators.max(120000)],
      ],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      imageUrl: ['', [Validators.required]],
      lotes: this.formBuilder.array([]),
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as ILotes));
  }

  criarLote(lote: ILotes): FormGroup {
    return this.formBuilder.group({
      id: [lote.id, [Validators.required]],
      nome: [lote.nome, [Validators.required]],
      preco: [lote.preco, [Validators.required]],
      quantidade: [
        lote.quantidade,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    });
  }

  resetForm(): void {
    this.form.reset();
    this.router.navigate(['/eventos/lista']);
  }

  cssValidator(campoForm: FormControl | AbstractControl | null): any {
    return { 'is-invalid': campoForm?.errors && campoForm?.touched };
  }

  salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.evento =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.evento.id, ...this.form.value };

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        (eventoRetorno: IEvento) => {
          this.toastr.success('Evento salvo com sucesso', 'Sucesso');
          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar o evento', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvarLote(): void {
    this.spinner.show();
    if (this.form.controls['lotes'].valid) {
      this.loteService
        .saveLote(this.eventoId!, this.form.value.lotes)
        .subscribe(
          () => {
            this.toastr.success('Lotes salvos com Sucesso!', 'Sucesso!');
            this.lotes.reset();
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar salvar lotes.', 'Error!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }
}

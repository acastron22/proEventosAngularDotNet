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

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
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

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService,
    private activeRouter: ActivatedRoute,
    private eventoService: EventoService,
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
    const eventoIdParam = this.activeRouter.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe({
        next: (evento: IEvento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar o Evento', 'Erro!');
        },
        complete: () => {
          this.spinner.hide();
        },
      });
    } else {
      this.spinner.hide();
    }
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
      preco: [
        lote.preco,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
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
        () => this.toastr.success('Evento salvo com sucesso', 'Sucesso'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar o evento', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }
}

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
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
  modalRef?: BsModalRef;
  eventoData?: Date;
  eventoNome?: string;
  eventoId?: number;
  evento = {} as IEvento;
  form: FormGroup = this.formBuilder.group({});
  estadoSalvar = 'post';
  loteAtual = { id: 0, nome: '', indice: 0 };
  imagemUrl = './assets/imagensAngular/cloudUpload.png';
  file?: File;

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
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarevento();
    this.validation();
  }

  carregarevento(): void {
    this.eventoId = +this.activeRouter.snapshot.paramMap.get('id')!;

    if (this.eventoId !== null && this.eventoId !== 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(this.eventoId).subscribe({
        next: (evento: IEvento) => {
          this.evento = { ...evento };
          this.eventoData = this.evento.dataEvento;
          this.form.patchValue(this.evento);
          // this.carregarLotes();
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar o Evento', 'Erro!');
        },
      });
    } else {
      this.spinner.hide();
    } this.carregarLotes()
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

  retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do lote' : nome;
  }

  validation(): void {
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

  mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  resetForm(): void {
    this.form.reset();
    this.router.navigate(['/eventos/lista']);
  }

  cssValidator(campoForm: FormControl | AbstractControl | null): any {
    return { 'is-invalid': campoForm?.errors && campoForm?.touched };
  }

  salvarEvento(): void {
    if (this.form.valid) {
      this.spinner.show();
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
    if (this.form.controls['lotes'].valid) {
      this.spinner.show();
      this.loteService
        .saveLote(this.eventoId!, this.form.value.lotes)
        .subscribe(
          () => {
            this.toastr.success('Lotes salvos com Sucesso!', 'Sucesso!');
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar salvar lotes.', 'Error!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id')!.value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome')!.value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    //
  }

  confirmarDeleteLote(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.loteService
      .deleteLote(this.eventoId!, this.loteAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Lote deletado com sucesso!', 'Sucesso');
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => {
          this.toastr.error(
            `Erro ao tentar deletar o Lote ${this.loteAtual.nome}`,
            'Erro'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
  recusarDeleteLote(): void {
    this.modalRef?.hide();
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.imagemUrl = event.target.result);

    this.file = ev.target.files;
    reader.readAsDataURL(this.file![0]);
    this.uploadImage();
  }

  uploadImage(): void {
    this.spinner.show();
    this.eventoService
      .postUpload(this.eventoId!, this.file!)
      .subscribe(
        () => {
          this.carregarevento();
          this.toastr.success('Imagem atualizada com sucesso!', 'Sucesso');
        },
        (error: any) => {
          console.error('Erro ao fazer o upload de imagem', 'Erro!');
          console.log(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}

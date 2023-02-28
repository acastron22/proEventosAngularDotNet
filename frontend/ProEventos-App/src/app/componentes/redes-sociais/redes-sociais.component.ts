import { IRedeSocial } from './../../models/IRedeSocial';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RedeSocialService } from 'src/app/services/rede-social.service';

@Component({
  selector: 'app-redes-sociais',
  templateUrl: './redes-sociais.component.html',
  styleUrls: ['./redes-sociais.component.scss'],
})
export class RedesSociaisComponent implements OnInit {
  modalRef?: BsModalRef;
  public eventoId = 0;
  formRS?: FormGroup;
  redeSocialAtual = { id: 0, nome: '', indice: 0 };

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private redeSocialService: RedeSocialService,
    private modalService: BsModalService
  ) {}

  get redesSociais(): FormArray {
    return this.formRS!.get('redesSociais') as FormArray;
  }

  ngOnInit(): void {
    this.validation();
  }

  validation(): void {
    this.formRS = this.fb.group({
      redesSociais: this.fb.array([]),
    });
  }

  adicionarRedeSocial(): void {
    this.redesSociais.push(this.criarRedeSocial({ id: 0 } as IRedeSocial));
  }

  criarRedeSocial(redeSocial: IRedeSocial): FormGroup {
    return this.fb.group({
      id: [redeSocial.id, [Validators.required]],
      nome: [redeSocial.nome, [Validators.required]],
      url: [redeSocial.url, Validators.required],
    });
  }

  retornaTitulo(nome: string): string {
    return nome === null || nome === '' ? 'Nome da Rede Social' : nome;
  }

  cssValidator(campoForm: FormControl | AbstractControl | null): any {
    return { 'is-invalid': campoForm?.errors && campoForm?.touched };
  }

  salvarRedesSociais(): void {
    if (this.formRS!.controls['redesSociais'].valid) {
      this.spinner.show();
      this.redeSocialService
        .salvarRedeSocial(this.eventoId!, this.formRS!.value.redesSociais)
        .subscribe(
          () => {
            this.toastr.success('redesSociais salvos com Sucesso!', 'Sucesso!');
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar salvar redesSociais.', 'Error!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  removerRedeSocial(template: TemplateRef<any>, indice: number): void {
    this.redeSocialAtual.id = this.redesSociais.get(indice + '.id')!.value;
    this.redeSocialAtual.nome = this.redesSociais.get(indice + '.nome')!.value;
    this.redeSocialAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    //
  }
  confirmarDeleteredeSocial(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.redeSocialService
      .deleteRedeSocial(this.eventoId!, this.redeSocialAtual.id)
      .subscribe(
        () => {
          this.toastr.success('redeSocial deletado com sucesso!', 'Sucesso');
          this.redesSociais.removeAt(this.redeSocialAtual.indice);
        },
        (error: any) => {
          this.toastr.error(
            `Erro ao tentar deletar o redeSocial ${this.redeSocialAtual.nome}`,
            'Erro'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}

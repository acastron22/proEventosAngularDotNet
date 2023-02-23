import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidatorFields } from 'src/app/helpers/validator-fields';
import { IUserUpdate } from 'src/app/models/identity/iuser-update';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss'],
})
export class PerfilDetalheComponent implements OnInit {
  @Output() changeFormValue = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private tostr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  form: FormGroup = this.formBuilder.group({});
  userUpdate = {} as IUserUpdate;

  get registro(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validacaoPerfil();
    this.carregarUsuario();
    this.verificaForm();
  }

  private verificaForm(): void {
    this.form.valueChanges.subscribe(() => {
      this.changeFormValue.emit({ ...this.form.value });
    });
  }

  validacaoPerfil(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('password', 'confirmaPassword'),
    };

    this.form = this.formBuilder.group(
      {
        userName: [''],
        imagemUrl: [''],
        titulo: ['NaoInformado', [Validators.required]],
        primeiroNome: ['', [Validators.required, Validators.maxLength(25)]],
        ultimoNome: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ],
        descricao: ['', [Validators.required]],
        funcao: ['NaoInformado'],
        password: ['', [Validators.minLength(6)]],
        confirmaPassword: ['', [Validators.minLength(6)]],
      },
      formOptions
    );
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService
      .getUser()
      .subscribe(
        (userReturn: IUserUpdate) => {
          this.userUpdate = userReturn;
          this.form.patchValue(this.userUpdate);
          this.tostr.success('Usuário Carregado', 'Sucesso');
        },
        (error) => {
          console.error(error);
          this.tostr.error('Usuário não carregado', 'Erro');
          this.router.navigate(['/dashboard']);
        }
      )
      .add(() => this.spinner.hide());
  }

  onSubmit(): void {
    this.atualizarUsuario();
  }

  public atualizarUsuario() {
    this.userUpdate = { ...this.form.value };
    this.spinner.show();

    this.accountService
      .updateUser(this.userUpdate)
      .subscribe(
        () => {
          console.log(this.userUpdate);
          this.tostr.success('Usuário atualizado', 'Sucesso');
        },
        (error) => {
          console.log(this.userUpdate);
          this.tostr.error(error.error);
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}

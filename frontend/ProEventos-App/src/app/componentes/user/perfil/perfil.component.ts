import { IUserUpdate } from './../../../models/identity/iuser-update';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import {
  FormGroup,
  FormBuilder,
  AbstractControlOptions,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorFields } from 'src/app/helpers/validator-fields';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  userUpdate = {} as IUserUpdate;

  get registro(): any {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private tostr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.validacaoPerfil();
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService
      .getUser()
      .subscribe(
        (userReturn: IUserUpdate) => {
          console.log(userReturn);
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

  validacaoPerfil(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('password', 'confirmaPassword'),
    };

    this.form = this.formBuilder.group(
      {
        userName: [''],
        titulo: ['', [Validators.required]],
        primeiroNome: ['', [Validators.required, Validators.maxLength(25)]],
        ultimoNome: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ],
        descricao: ['', [Validators.required]],
        funcao: [''],
        password: ['', [Validators.minLength(6)]],
        confirmaPassword: ['', [Validators.minLength(6)]],
      },
      formOptions
    );
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
        () => console.log(this.userUpdate),
        (error) => {
          console.log(this.userUpdate);
          this.tostr.error(error.error);
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}

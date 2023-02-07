import { ToastrService } from 'ngx-toastr';
import { IUser } from './../../../models/identity/IUser';
import { ValidatorFields } from './../../../helpers/validator-fields';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  user = {} as IUser;
  form: FormGroup = this.formBuilder.group({});
  checkbox?: boolean = false;

  get registro(): any {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.validacaoRegistro();
  }

  validacaoRegistro(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('password', 'confirmaPassword'),
    };

    this.form = this.formBuilder.group(
      {
        primeiroNome: ['', [Validators.required, Validators.maxLength(25)]],
        ultimoNome: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmaPassword: ['', [Validators.required]],
        // termo: ['', [Validators.required, Validators.pattern('true')]],
      },
      formOptions
    );
  }

  termoaceito(): void {
    this.checkbox = !this.checkbox;
    console.log(this.checkbox);
  }

  resetForm(): void {
    this.form.reset;
    this.router.navigate(['/user/login']);
  }

  register(): void {
    this.user = { ...this.form.value };
    this.accountService.register(this.user).subscribe(
      () => this.router.navigateByUrl('/dashboard'),
      (error: any) => this.toaster.error(error.error),
      () => {}
    );
  }
}

import { ValidatorFields } from './../../../helpers/validator-fields';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  checkbox: boolean = false;

  get registro(): any {
    return this.form.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validacaoRegistro();
  }


  validacaoRegistro(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('senha', 'confirmaSenha')
    };

    this.form = this.formBuilder.group(
      {
        primeiroNome: ['', [Validators.required, Validators.maxLength(25)]],
        ultimoNome: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        usuario: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        confirmaSenha: ['', [Validators.required]],
      },
      formOptions
    );
  }
}

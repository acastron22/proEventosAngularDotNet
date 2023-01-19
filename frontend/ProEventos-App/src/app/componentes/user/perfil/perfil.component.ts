import {
  FormGroup,
  FormBuilder,
  AbstractControlOptions,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorFields } from 'src/app/helpers/validator-fields';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});

  get registro(): any {
    return this.form.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validacaoPerfil();
  }
  validacaoPerfil(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('senha', 'confirmaSenha'),
    };

    this.form = this.formBuilder.group(
      {
        titulo: ['', [Validators.required]],
        primeiroNome: ['', [Validators.required, Validators.maxLength(25)]],
        ultimoNome: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        descricao: ['', [Validators.required]],
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
        termo: ['', [Validators.required, Validators.pattern('true')]],
      },
      formOptions
    );
  }
}

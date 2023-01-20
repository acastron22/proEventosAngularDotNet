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

  fromsfields: string[] = [
    'Bacharel',
    'Ariel',
    'Castro Neves',
    'ariel@ariel',
    '9130343536',
    'Participante',
    'Ariel é um estudante',
  ];

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
        titulo: [this.fromsfields[0], [Validators.required]],
        primeiroNome: [this.fromsfields[1], [Validators.required, Validators.maxLength(25)]],
        ultimoNome: [this.fromsfields[2], [Validators.required, Validators.maxLength(30)]],
        email: [this.fromsfields[3], [Validators.required, Validators.email]],
        telefone: [this.fromsfields[4], [Validators.required, Validators.pattern('^[0-9]*$')]],
        funcao: [this.fromsfields[5]],
        descricao: [this.fromsfields[6], [Validators.required]],
        senha: ['', [Validators.minLength(8)]],
        confirmaSenha: ['', [Validators.minLength(8)]],
      },
      formOptions
    );
  }
}

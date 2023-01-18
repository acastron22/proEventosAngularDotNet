import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-evento-detalhe',
    templateUrl: './evento-detalhe.component.html',
    styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
    form: FormGroup = this.formBuilder.group({});
    get f(): any {
        return this.form.controls;
    }

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.validation();
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
            qtdPessoas: ['', [Validators.required, Validators.min(1) ,Validators.max(120000)]],
            telefone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            email: ['', [Validators.required, Validators.email]],
            imageUrl: ['', [Validators.required]],
        });
    }
}

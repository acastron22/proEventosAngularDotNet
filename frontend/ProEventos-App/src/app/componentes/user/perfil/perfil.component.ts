import { environment } from 'src/environments/environment';
import { IUserUpdate } from './../../../models/identity/iuser-update';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario = {} as IUserUpdate;
  file?: File;
  imagemUrl = '';

  get ehPalestrante(): boolean {
    return this.usuario.funcao === 'Palestrante';
  }

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  setFormValue(usuario: IUserUpdate): void {
    this.usuario = usuario;
    if (this.usuario.imagemUrl)
      this.imagemUrl =
        environment.apiURL + `resources/perfil/${this.usuario.imagemUrl}`;
    else this.imagemUrl = './assets/perfil.png';
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.imagemUrl = event.target.result);

    this.file = ev.target.files;
    reader.readAsDataURL(this.file![0]);
    this.uploadImage();
  }

  private uploadImage(): void {
    this.spinner.show();
    this.accountService
      .postUpload(this.file!)
      .subscribe(
        () => this.toastr.success('Imagem atualizada', 'Sucesso!'),
        (error: any) => {
          this.toastr.error('Erro ao fazer upload de imagem.', 'Erro!');
        }
      )
      .add(() => this.spinner.hide());
  }
}

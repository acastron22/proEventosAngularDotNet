import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../../services/account.service';
import { IUserLogin } from './../../../models/identity/IUserLogin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model = {} as IUserLogin;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.accountService.login(this.model).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
      },
      (error: any) => {
        if (error.status == 401)
          this.toaster.error('Usuário ou senha inválidos');
        else console.error(error);
      },
      () => {}
    );
  }
}

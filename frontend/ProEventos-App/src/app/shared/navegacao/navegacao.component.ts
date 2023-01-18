import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navegacao',
    templateUrl: './navegacao.component.html',
    styleUrls: ['./navegacao.component.scss'],
})
export class NavegacaoComponent implements OnInit {
    isCollapsed = true;
    constructor(private router:Router) {}

    ngOnInit(): void {}

    showMenu(): boolean {
        return this.router.url !== '/user/login';
    }
}

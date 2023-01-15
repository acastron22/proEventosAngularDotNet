import { IEvento } from './../models/IEvento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EventoService {
    baseUrl = 'https:localhost:5001/api/evento';

    constructor(private http: HttpClient) {}

    getEvento(): Observable<IEvento[]> {
        return this.http.get<IEvento[]>(this.baseUrl);
    }
    getEventosByTema(tema: string): Observable<IEvento> {
        return this.http.get<IEvento>(`${this.baseUrl}/${tema}/tema`);
    }
    getEventoById(id: number): Observable<IEvento> {
        return this.http.get<IEvento>(`${this.baseUrl}/${id}`);
    }
}

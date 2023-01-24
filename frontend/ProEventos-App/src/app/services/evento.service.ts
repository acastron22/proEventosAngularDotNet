import { IEvento } from './../models/IEvento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable()
export class EventoService {
  baseUrl = 'https:localhost:5001/api/evento';

  constructor(private http: HttpClient) {}

  getEvento(): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(this.baseUrl).pipe(take(1));
  }
  getEventosByTema(tema: string): Observable<IEvento> {
    return this.http.get<IEvento>(`${this.baseUrl}/${tema}/tema`).pipe(take(1));
  }
  getEventoById(id: number): Observable<IEvento> {
    return this.http.get<IEvento>(`${this.baseUrl}/${id}`).pipe(take(1));
  }
  post(evento: IEvento): Observable<IEvento> {
    return this.http.post<IEvento>(this.baseUrl, evento).pipe(take(1));
  }
  put(evento: IEvento): Observable<IEvento> {
    return this.http
      .put<IEvento>(`${this.baseUrl}/${evento.id}`, evento)
      .pipe(take(1));
  }
  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}

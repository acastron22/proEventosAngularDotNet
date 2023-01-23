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
  postEvento(evento: IEvento): Observable<IEvento> {
    return this.http.post<IEvento>(this.baseUrl, evento);
  }
  putEvento(id: number, evento: IEvento): Observable<IEvento> {
    return this.http.put<IEvento>(`${this.baseUrl}/${id}`, evento);
  }
  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

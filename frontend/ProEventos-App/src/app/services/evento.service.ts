import { environment } from 'src/environments/environment';
import { IEvento } from './../models/IEvento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable()
export class EventoService {
  baseUrl = environment.apiURL +'api/eventos' ;

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

  postUpload(eventoId: number, file: File): Observable<IEvento> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<IEvento>(`${this.baseUrl}/upload-image/${eventoId}`, formData)
      .pipe(take(1));
  }
}

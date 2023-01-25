import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILotes } from './../models/ILotes';
import { Observable, take } from 'rxjs';

@Injectable()
export class LoteService {
  baseUrl = 'https:localhost:5001/api/lotes';

  constructor(private http: HttpClient) {}

  getLotesByEventoId(eventoId: number): Observable<ILotes[]> {
    return this.http.get<ILotes[]>(`${this.baseUrl}/${eventoId}`).pipe(take(1));
  }

  saveLote(eventoId: number, lotes: ILotes[]): Observable<ILotes[]> {
    return this.http
      .put<ILotes[]>(`${this.baseUrl}/${eventoId}`, lotes)
      .pipe(take(1));
  }
  deleteLote(eventoId: number, loteId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${eventoId}/${loteId}`).pipe(take(1));
  }
}

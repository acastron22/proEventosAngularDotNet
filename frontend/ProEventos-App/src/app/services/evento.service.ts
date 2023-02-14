import { Pagination } from './../models/pagination';
import { environment } from 'src/environments/environment';
import { IEvento } from './../models/IEvento';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { PaginatedResult } from '../models/pagination';

@Injectable()
export class EventoService {
  baseUrl = `${environment.apiURL}api/evento`;

  constructor(private http: HttpClient) {}

  getEvento(
    page?: number,
    itemsPerPage?: number,
    termo?: string
  ): Observable<PaginatedResult<IEvento[]>> {
    const paginatedResult: PaginatedResult<IEvento[]> = new PaginatedResult<
      IEvento[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageNumber', itemsPerPage.toString());
    }

    if (termo != null && termo != '') params = params.append('termos', termo);

    return this.http
      .get<IEvento[]>(this.baseUrl, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body!;
          if (response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')!
            );
          }
          return paginatedResult;
        })
      );
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

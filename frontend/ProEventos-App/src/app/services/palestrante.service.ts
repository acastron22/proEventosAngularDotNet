import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../models/pagination';
import { IPalestrante } from '../models/IPalestrante';

@Injectable({
  providedIn: 'root',
})
export class PalestranteService {
  baseUrl = `${environment.apiURL}api/palestrantes`;

  constructor(private http: HttpClient) {}

  getPalestrantes(
    page?: number,
    itemsPerPage?: number,
    termo?: string
  ): Observable<PaginatedResult<IPalestrante[]>> {
    const paginatedResult: PaginatedResult<IPalestrante[]> =
      new PaginatedResult<IPalestrante[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageNumber', itemsPerPage.toString());
    }

    if (termo != null && termo != '') params = params.append('termos', termo);

    return this.http
      .get<IPalestrante[]>(this.baseUrl + '/all', {
        observe: 'response',
        params,
      })
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

  getPalestrante(): Observable<IPalestrante> {
    return this.http.get<IPalestrante>(`${this.baseUrl}`).pipe(take(1));
  }

  post(): Observable<IPalestrante> {
    return this.http
      .post<IPalestrante>(this.baseUrl, {} as IPalestrante)
      .pipe(take(1));
  }

  put(palestrante: IPalestrante): Observable<IPalestrante> {
    return this.http
      .put<IPalestrante>(`${this.baseUrl}`, palestrante)
      .pipe(take(1));
  }
}

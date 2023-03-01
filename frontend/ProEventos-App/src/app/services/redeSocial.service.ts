import { IRedeSocial } from './../models/IRedeSocial';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RedeSocialService {
  baseURL = environment.apiURL + 'api/redesSociais';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param origem precisa passar a palavra 'palestrante' ou a palavra 'evento' escrito em minúsculo
   * @param id precisa passar PalestranteID ou o EventoId
   * @returns Observable <RedeSocial[]>
   */

  getRedesSociais(origem: string, id: number): Observable<IRedeSocial[]> {
    let URL =
      id === 0
        ? `${this.baseURL}/${origem}`
        : `${this.baseURL}/${origem}/${id}`;

    return this.http.get<IRedeSocial[]>(URL).pipe(take(1));
  }
  /**
   *
   * @param origem precisa passar a palavra 'palestrante' ou a palavra 'evento' escrito em minúsculo
   * @param id precisa passar PalestranteID ou o EventoId
   * @param RedesSociais Precisa adicionar Redes Sociais organizadas em RedeSocial[]
   * @returns Observable <RedeSocial[]>
   */

  saveRedesSociais(
    origem: string,
    id: number,
    RedesSociais: IRedeSocial[]
  ): Observable<IRedeSocial[]> {
    let URL =
      id === 0
        ? `${this.baseURL}/${origem}`
        : `${this.baseURL}/${origem}/${id}`;

    return this.http.put<IRedeSocial[]>(URL, RedesSociais).pipe(take(1));
  }

  /**
   *
   * @param origem precisa passar a palavra 'palestrante' ou a palavra 'evento' escrito em minúsculo
   * @param id precisa passar PalestranteID ou o EventoId
   * @param redeSocialId Precisa usar o id da Rede Social
   * @returns Observable<any> - Pois é o retorno da rota
   */

  deleteRedesSociais(
    origem: string,
    id: number,
    redeSocialId: number
  ): Observable<any> {
    let URL =
      id === 0
        ? `${this.baseURL}/${origem}/${redeSocialId}`
        : `${this.baseURL}/${origem}/${id}/${redeSocialId}`;

    return this.http.delete(URL).pipe(take(1));
  }
}

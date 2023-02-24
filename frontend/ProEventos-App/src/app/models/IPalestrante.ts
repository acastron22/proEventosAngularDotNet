import { IUserUpdate } from 'src/app/models/identity/iuser-update';
import { IEvento } from './IEvento';
import { IRedeSocial } from './IRedeSocial';

export interface IPalestrante {
  id: number;
  miniCurriculo: string;
  user: IUserUpdate;
  redesSociais: IRedeSocial[];
  palestrantesEventos: IEvento[];
}

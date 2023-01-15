import { IEvento } from './ievento';
import { IPalestrante } from './ipalestrante';
export interface IRedeSocial {
    id: number;
    nome: string;
    URL: string;
    eventoId?: number;
    palestranteId?: number;
}

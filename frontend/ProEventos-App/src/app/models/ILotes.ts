import { IEvento } from './IEvento';

export interface ILotes {
    id: number;
    nome: string;
    preco: number;
    dataInicio?: Date;
    dataFim?: Date;
    quantidade: number;
    eventoId: number;
    evento: IEvento;
}

import { ILotes } from './ilotes';
import { IPalestrante } from './ipalestrante';
import { IRedeSocial } from './IRedeSocial';

export interface IEvento {
    id: number;
    local: string;
    dataEvento?: Date;
    tema: string;
    qtdPessoas: number;
    imageUrl: string;
    telefone: string;
    email: string;
    lotes: ILotes[];
    redesSociais: IRedeSocial[];
    palestrantesEventos: IPalestrante[];
}

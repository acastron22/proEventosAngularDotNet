import { IEvento } from './ievento'
import { IRedeSocial } from './IRedeSocial'

export interface IPalestrante {
    id: number
    nome: string
    miniCurriculo: string
    imagemUrl: string
    telefone: string
    email: string
    redesSociais: IRedeSocial[]
    palestrantesEventos: IEvento[]
}

import { RowDataPacket } from "mysql2";

export interface iEmpreendimento extends RowDataPacket {
    id_empreendimento?: number;
    id_perfil?: number;
    nome?: string;
    cnpj?: string;
    data_inicio?: Date;
}

export class Empreendimento {
    private _id_empreendimento?: number;
    private _id_perfil: number;
    private _nome!: string;
    private _cnpj?: string;
    private _data_inicio?: Date;

    constructor(id_perfil: number, nome: string, cnpj?: string, data_inicio?: Date, id?: number) {
        this._id_perfil = id_perfil;
        this.Nome = nome;
        this._cnpj = cnpj;
        this._data_inicio = data_inicio;
        this._id_empreendimento = id;
    }

    public get Nome(): string { return this._nome; }
    public set Nome(value: string) {
        if (!value || value.trim().length < 2) throw new Error("Nome inválido");
        this._nome = value;
    }
    public static criar(id_perfil: number, nome: string, cnpj?: string): Empreendimento {
        return new Empreendimento(id_perfil, nome, cnpj);
    }
}
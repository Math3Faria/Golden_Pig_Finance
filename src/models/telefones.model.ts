import { RowDataPacket } from "mysql2";

export interface iTelefone extends RowDataPacket {
    id_telefone?: number;
    id_usuario?: number;
    numero?: string;
}

export class Telefone {
    private _id_telefone?: number;
    private _id_usuario: number;
    private _numero: string = '';

    constructor(id_usuario: number, numero: string, id?: number) {
        this._id_usuario = id_usuario;
        this.Numero = numero;
        this._id_telefone = id;
    }

    public get Id(): number | undefined { return this._id_telefone; }
    public get IdUsuario(): number { return this._id_usuario; }
    public get Numero(): string { return this._numero; }

    public set Numero(value: string) {
        if (!value || value.trim().length < 8) {
            throw new Error("Número de telefone inválido");
        }
        this._numero = value;
    }
}
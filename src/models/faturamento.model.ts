import { RowDataPacket } from "mysql2";

export interface iFaturamento extends RowDataPacket {
    id_faturamento?: number;
    id_empreendimento?: number;
    valor?: number;
}

export class Empreendimento {
    private id_faturamento?: number;
    private _id_empreendimento?: number;
    private _valor?: number;

    constructor(id_faturamento: number, id_empreendimento: number, valor: number) {
        this.id_faturamento = id_faturamento
        this._id_empreendimento = id_empreendimento;
        this._valor = valor
    }
}
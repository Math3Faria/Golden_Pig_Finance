import { RowDataPacket } from "mysql2";

export interface iFaturamento extends RowDataPacket {
  id_faturamento?: number;
  id_empreendimento?: number;
  valor?: number;
}

export class Faturamento {

  private _id?: number;
  private _id_empreendimento: number;
  private _valor: number;

  constructor(id_empreendimento: number, valor: number, id?: number) {
    this._id_empreendimento = id_empreendimento;
    this._valor = valor;
    this._id = id;
  }

  get Id() {
    return this._id;
  }

  get IdEmpreendimento() {
    return this._id_empreendimento;
  }

  get Valor() {
    return this._valor;
  }

  static criar(id_empreendimento: number, valor: number) {
    return new Faturamento(id_empreendimento, valor);
  }

}
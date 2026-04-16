import { RowDataPacket } from "mysql2";

export interface iEmpreendimento extends RowDataPacket {
  id_empreendimento?: number;
  id_perfil?: number;
  nome?: string;
}

export class Empreendimento {

  private _id?: number;
  private _id_perfil: number;
  private _nome!: string;

  constructor(id_perfil: number, nome: string, id?: number) {
    this._id_perfil = id_perfil;
    this.Nome = nome;
    this._id = id;
  }

  public get Id(): number | undefined {
    return this._id;
  }

  public get IdPerfil(): number {
    return this._id_perfil;
  }

  public get Nome(): string {
    return this._nome;
  }

  public set Nome(value: string) {

    if (!value || value.trim().length < 3) {
      throw new Error("Nome inválido");
    }

    this._nome = value;
  }

  static criar(id_perfil: number, nome: string) {
    return new Empreendimento(id_perfil, nome);
  }

}
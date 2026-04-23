import { RowDataPacket } from "mysql2";

export interface iConta {
    id_conta?: number;
    id_perfil: number;
    nome_banco?: string;
    tipo_conta: 'corrente' | 'poupanca' | 'carteira';
    saldo?: number;
}

export interface iContaDB extends RowDataPacket, iConta {}

export class Conta {

    private _id_conta?: number;
    private _id_perfil!: number;
    private _nome_banco?: string;
    private _tipo_conta!: 'corrente' | 'poupanca' | 'carteira';
    private _saldo: number = 0;

    constructor(
        id_perfil: number,
        tipo_conta: 'corrente' | 'poupanca' | 'carteira',
        nome_banco?: string,
        saldo: number = 0,
        id?: number
    ) {
        this.IdPerfil = id_perfil;
        this.TipoConta = tipo_conta;
        this.NomeBanco = nome_banco;
        this.Saldo = saldo;
        this._id_conta = id;
    }

    public get Id(): number | undefined {
        return this._id_conta;
    }

    public get IdPerfil(): number {
        return this._id_perfil;
    }

    public get NomeBanco(): string | undefined {
        return this._nome_banco;
    }

    public get TipoConta(): 'corrente' | 'poupanca' | 'carteira' {
        return this._tipo_conta;
    }

    public get Saldo(): number {
        return this._saldo;
    }

    public set IdPerfil(value: number) {
        if (!value || value <= 0) {
            throw new Error("Perfil inválido");
        }
        this._id_perfil = value;
    }

    public set NomeBanco(value: string | undefined) {
        if (value && value.length > 100) {
            throw new Error("Nome do banco muito longo");
        }
        this._nome_banco = value;
    }

    public set TipoConta(value: 'corrente' | 'poupanca' | 'carteira') {
        if (!['corrente', 'poupanca', 'carteira'].includes(value)) {
            throw new Error("Tipo de conta inválido");
        }
        this._tipo_conta = value;
    }

    public set Saldo(value: number) {
        if (value < 0) {
            throw new Error("Saldo não pode ser negativo");
        }
        this._saldo = value;
    }

    public static criar(
        id_perfil: number,
        tipo_conta: 'corrente' | 'poupanca' | 'carteira',
        nome_banco?: string
    ): Conta {
        return new Conta(id_perfil, tipo_conta, nome_banco, 0);
    }

    public static editar(
        id: number,
        id_perfil: number,
        tipo_conta: 'corrente' | 'poupanca' | 'carteira',
        nome_banco?: string,
        saldo: number = 0
    ): Conta {
        return new Conta(id_perfil, tipo_conta, nome_banco, saldo, id);
    }
}
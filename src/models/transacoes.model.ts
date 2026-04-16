import { RowDataPacket } from "mysql2";

// =========================
// 🔹 INTERFACE DE ENTRADA (DTO)
// =========================
export interface iTransacao {
    id_transacao?: number;
    id_conta: number;
    id_categoria: number;
    id_faturamento?: number | null;
    valor: number;
    tipo: 'entrada' | 'saida';
    data: Date;
    descricao?: string;
    status?: 'pendente' | 'pago';
    criado_em?: Date;
}

// =========================
// 🔹 INTERFACE DE RETORNO DO BANCO
// =========================
export interface iTransacaoDB extends RowDataPacket, iTransacao {}


// =========================
// 🔹 CLASSE (MODEL)
// =========================
export class Transacao {

    private _id_transacao?: number;
    private _id_conta!: number;
    private _id_categoria!: number;
    private _id_faturamento?: number | null;
    private _valor!: number;
    private _tipo!: 'entrada' | 'saida';
    private _data!: Date;
    private _descricao?: string;
    private _status: 'pendente' | 'pago' = 'pago';

    constructor(
        id_conta: number,
        id_categoria: number,
        valor: number,
        tipo: 'entrada' | 'saida',
        data: Date,
        descricao?: string,
        id_faturamento?: number | null,
        status: 'pendente' | 'pago' = 'pago',
        id?: number
    ) {
        this.IdConta = id_conta;
        this.IdCategoria = id_categoria;
        this.Valor = valor;
        this.Tipo = tipo;
        this.Data = data;
        this.Descricao = descricao;
        this.IdFaturamento = id_faturamento;
        this.Status = status;
        this._id_transacao = id;
    }

    // =========================
    // GETTERS
    // =========================
    public get Id(): number | undefined {
        return this._id_transacao;
    }

    public get IdConta(): number {
        return this._id_conta;
    }

    public get IdCategoria(): number {
        return this._id_categoria;
    }

    public get IdFaturamento(): number | null | undefined {
        return this._id_faturamento;
    }

    public get Valor(): number {
        return this._valor;
    }

    public get Tipo(): 'entrada' | 'saida' {
        return this._tipo;
    }

    public get Data(): Date {
        return this._data;
    }

    public get Descricao(): string | undefined {
        return this._descricao;
    }

    public get Status(): 'pendente' | 'pago' {
        return this._status;
    }

    // =========================
    // SETTERS COM VALIDAÇÃO
    // =========================
    public set IdConta(value: number) {
        if (!value || value <= 0) {
            throw new Error("Conta inválida");
        }
        this._id_conta = value;
    }

    public set IdCategoria(value: number) {
        if (!value || value <= 0) {
            throw new Error("Categoria inválida");
        }
        this._id_categoria = value;
    }

    public set IdFaturamento(value: number | null | undefined) {
        if (value && value <= 0) {
            throw new Error("Faturamento inválido");
        }
        this._id_faturamento = value ?? null;
    }

    public set Valor(value: number) {
        if (!value || value <= 0) {
            throw new Error("Valor deve ser maior que zero");
        }
        this._valor = value;
    }

    public set Tipo(value: 'entrada' | 'saida') {
        if (!['entrada', 'saida'].includes(value)) {
            throw new Error("Tipo inválido");
        }
        this._tipo = value;
    }

    public set Data(value: Date) {
        if (!value || isNaN(new Date(value).getTime())) {
            throw new Error("Data inválida");
        }
        this._data = value;
    }

    public set Descricao(value: string | undefined) {
        if (value && value.length > 255) {
            throw new Error("Descrição muito longa");
        }
        this._descricao = value;
    }

    public set Status(value: 'pendente' | 'pago') {
        if (!['pendente', 'pago'].includes(value)) {
            throw new Error("Status inválido");
        }
        this._status = value;
    }

    // =========================
    // FACTORY METHODS
    // =========================
    public static criar(
        id_conta: number,
        id_categoria: number,
        valor: number,
        tipo: 'entrada' | 'saida',
        data: Date,
        descricao?: string,
        id_faturamento?: number | null
    ): Transacao {
        return new Transacao(
            id_conta,
            id_categoria,
            valor,
            tipo,
            data,
            descricao,
            id_faturamento
        );
    }

    public static editar(
        id: number,
        id_conta: number,
        id_categoria: number,
        valor: number,
        tipo: 'entrada' | 'saida',
        data: Date,
        descricao?: string,
        status: 'pendente' | 'pago' = 'pago',
        id_faturamento?: number | null
    ): Transacao {
        return new Transacao(
            id_conta,
            id_categoria,
            valor,
            tipo,
            data,
            descricao,
            id_faturamento,
            status,
            id
        );
    }
}
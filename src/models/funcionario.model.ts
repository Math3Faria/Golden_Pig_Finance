import { RowDataPacket } from "mysql2";

export interface iFuncionario extends RowDataPacket {
    id_funcionario?: number;
    id_empreendimento?: number;
    nome?: string;
    cpf?: string;
    cargo?: string;
    data_admissao?: Date;
}

export class Funcionario {
    private _id_funcionario?: number;
    private _id_empreendimento: number = 0;
    private _nome: string = '';
    private _cpf?: string;
    private _cargo?: string;
    private _data_admissao?: Date;

    constructor(
        id_empreendimento: number,
        nome: string,
        cpf?: string,
        cargo?: string,
        data_admissao?: Date,
        id?: number
    ) {
        this.IdEmpreendimento = id_empreendimento;
        this.Nome = nome;
        this._cpf = cpf;
        this._cargo = cargo;
        this._data_admissao = data_admissao;
        this._id_funcionario = id;
    }

    // Getters
    public get Id(): number | undefined {
        return this._id_funcionario;
    }

    public get IdEmpreendimento(): number {
        return this._id_empreendimento;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Cpf(): string | undefined {
        return this._cpf;
    }

    public get Cargo(): string | undefined {
        return this._cargo;
    }

    public get DataAdmissao(): Date | undefined {
        return this._data_admissao;
    }

    // Setters
    public set IdEmpreendimento(value: number) {
        if (!value || value <= 0) {
            throw new Error("ID do empreendimento inválido");
        }
        this._id_empreendimento = value;
    }

    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Cpf(value: string | undefined) {
        if (value !== undefined) {
            this._validarCpf(value);
        }
        this._cpf = value;
    }

    public set Cargo(value: string | undefined) {
        if (value && value.trim().length > 50) {
            throw new Error("Cargo deve ter no máximo 50 caracteres");
        }
        this._cargo = value;
    }

    public set DataAdmissao(value: Date | undefined) {
        this._data_admissao = value;
    }

    // Factory
    public static criar(
        id_empreendimento: number,
        nome: string,
        cpf?: string,
        cargo?: string,
        data_admissao?: Date
    ): Funcionario {
        return new Funcionario(id_empreendimento, nome, cpf, cargo, data_admissao);
    }

    public static editar(
        id_empreendimento: number,
        nome: string,
        id: number,
        cpf?: string,
        cargo?: string,
        data_admissao?: Date
    ): Funcionario {
        return new Funcionario(id_empreendimento, nome, cpf, cargo, data_admissao, id);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome do funcionário deve ter pelo menos 3 caracteres");
        }

        if (value.trim().length > 100) {
            throw new Error("Nome do funcionário deve ter no máximo 100 caracteres");
        }
    }

    private _validarCpf(value: string): void {
        const cpfLimpo = value.replace(/\D/g, '');

        if (cpfLimpo.length !== 11) {
            throw new Error("CPF deve conter 11 dígitos");
        }
    }
}
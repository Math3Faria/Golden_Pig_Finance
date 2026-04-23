import { RowDataPacket } from "mysql2";

export interface iCategoria extends RowDataPacket {
    id_categoria?: number;
    id_perfil?: number | null;
    nome?: string;
    padrao?: boolean;
}

export class Categoria {
    private _id_categoria?: number;
    private _id_perfil?: number | null;
    private _nome: string = '';
    private _padrao: boolean = false;

    constructor(
        nome: string,
        id_perfil?: number | null,
        padrao: boolean = false,
        id?: number
    ) {
        this.Nome = nome;
        this._id_perfil = id_perfil ?? null;
        this._padrao = padrao;
        this._id_categoria = id;
    }

    // Getters
    public get Id(): number | undefined {
        return this._id_categoria;
    }

    public get IdPerfil(): number | null | undefined {
        return this._id_perfil;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Padrao(): boolean {
        return this._padrao;
    }

    // Setters
    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set IdPerfil(value: number | null | undefined) {
        this._id_perfil = value ?? null;
    }

    public set Padrao(value: boolean) {
        this._padrao = value;
    }

    // Factory
    public static criar(
        nome: string,
        id_perfil?: number | null,
        padrao: boolean = false
    ): Categoria {
        return new Categoria(nome, id_perfil, padrao);
    }

    public static editar(
        nome: string,
        id: number,
        id_perfil?: number | null,
        padrao: boolean = false
    ): Categoria {
        return new Categoria(nome, id_perfil, padrao, id);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome da categoria deve ter pelo menos 3 caracteres");
        }

        if (value.trim().length > 100) {
            throw new Error("Nome da categoria deve ter no máximo 100 caracteres");
        }
    }
}
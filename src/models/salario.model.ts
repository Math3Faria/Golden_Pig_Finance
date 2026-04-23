import { RowDataPacket } from "mysql2";

export interface iSalario extends RowDataPacket {
  id_salario?: number;
  id_funcionario?: number;
  valor?: number;
  data_pagamento?: Date;
  status?: 'pendente' | 'pago';
}

export class Salario {
  private _id_salario?: number;
  private _id_funcionario: number = 0;
  private _valor: number = 0;
  private _data_pagamento?: Date;
  private _status: 'pendente' | 'pago' = 'pendente';

  constructor(
    id_funcionario: number,
    valor: number,
    data_pagamento?: Date,
    status: 'pendente' | 'pago' = 'pendente',
    id?: number
  ) {
    this.IdFuncionario = id_funcionario;
    this.Valor = valor;
    this._data_pagamento = data_pagamento;
    this.Status = status;
    this._id_salario = id;
  }

  // Getters
  public get Id(): number | undefined {
    return this._id_salario;
  }

  public get IdFuncionario(): number {
    return this._id_funcionario;
  }

  public get Valor(): number {
    return this._valor;
  }

  public get DataPagamento(): Date | undefined {
    return this._data_pagamento;
  }

  public get Status(): 'pendente' | 'pago' {
    return this._status;
  }

  // Setters
  public set IdFuncionario(value: number) {
    if (!value || value <= 0) {
      throw new Error("ID do funcionário inválido");
    }
    this._id_funcionario = value;
  }

  public set Valor(value: number) {
    this._validarValor(value);
    this._valor = value;
  }

  public set DataPagamento(value: Date | undefined) {
    this._data_pagamento = value;
  }

  public set Status(value: 'pendente' | 'pago') {
    if (!['pendente', 'pago'].includes(value)) {
      throw new Error("Status inválido. Use 'pendente' ou 'pago'");
    }
    this._status = value;
  }

  // Factory
  public static criar(
    id_funcionario: number,
    valor: number,
    data_pagamento?: Date,
    status: 'pendente' | 'pago' = 'pendente'
  ): Salario {
    return new Salario(id_funcionario, valor, data_pagamento, status);
  }

  public static editar(
    id_funcionario: number,
    valor: number,
    id: number,
    data_pagamento?: Date,
    status: 'pendente' | 'pago' = 'pendente'
  ): Salario {
    return new Salario(id_funcionario, valor, data_pagamento, status, id);
  }

  private _validarValor(value: number): void {
    if (value === undefined || value === null) {
      throw new Error("O valor do salário é obrigatório");
    }

    if (value <= 0) {
      throw new Error("O valor do salário deve ser maior que zero");
    }
  }
}
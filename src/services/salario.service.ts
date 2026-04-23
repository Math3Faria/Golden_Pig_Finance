import { ResultSetHeader } from "mysql2";
import { SalarioRepository } from "../repository/salario.repository";
import { iSalario } from "../models/salario.model";

export class SalarioService {

  constructor(private repository = new SalarioRepository()) { }

  async selecionarTodos(): Promise<iSalario[]> {
    return await this.repository.selectAll();
  }

  async selecionarPorId(id: number): Promise<iSalario | null> {
    return await this.repository.selectById(id);
  }

  async selecionarPorFuncionario(id_funcionario: number): Promise<iSalario[]> {
    if (!id_funcionario || id_funcionario <= 0) {
      throw new Error("ID do funcionário inválido");
    }
    return await this.repository.selectByFuncionario(id_funcionario);
  }

  async selecionarPorStatus(status: string): Promise<iSalario[]> {
    if (!['pendente', 'pago'].includes(status)) {
      throw new Error("Status inválido. Use 'pendente' ou 'pago'");
    }
    return await this.repository.selectByStatus(status as 'pendente' | 'pago');
  }

  async inserir(
    id_funcionario: number,
    valor: number,
    data_pagamento?: Date,
    status: 'pendente' | 'pago' = 'pendente'
  ): Promise<number> {
    if (!id_funcionario || id_funcionario <= 0) {
      throw new Error("ID do funcionário é obrigatório");
    }

    if (valor === undefined || valor === null) {
      throw new Error("O valor do salário é obrigatório");
    }

    if (valor <= 0) {
      throw new Error("O valor do salário deve ser maior que zero");
    }

    if (!['pendente', 'pago'].includes(status)) {
      throw new Error("Status inválido. Use 'pendente' ou 'pago'");
    }

    return await this.repository.insert(id_funcionario, valor, data_pagamento, status);
  }

  async atualizar(
    id: number,
    valor: number,
    data_pagamento?: Date,
    status: 'pendente' | 'pago' = 'pendente'
  ): Promise<ResultSetHeader> {
    if (valor === undefined || valor === null) {
      throw new Error("O valor do salário é obrigatório");
    }

    if (valor <= 0) {
      throw new Error("O valor do salário deve ser maior que zero");
    }

    if (!['pendente', 'pago'].includes(status)) {
      throw new Error("Status inválido. Use 'pendente' ou 'pago'");
    }

    const result = await this.repository.update(id, valor, data_pagamento, status);

    if (result.affectedRows === 0) {
      throw new Error("Salário não encontrado");
    }

    return result;
  }

  async atualizarStatus(id: number, status: string): Promise<ResultSetHeader> {
    if (!['pendente', 'pago'].includes(status)) {
      throw new Error("Status inválido. Use 'pendente' ou 'pago'");
    }

    const result = await this.repository.updateStatus(id, status as 'pendente' | 'pago');

    if (result.affectedRows === 0) {
      throw new Error("Salário não encontrado");
    }

    return result;
  }

  async deletar(id: number): Promise<ResultSetHeader> {
    const result = await this.repository.delete(id);

    if (result.affectedRows === 0) {
      throw new Error("Salário não encontrado");
    }

    return result;
  }
}
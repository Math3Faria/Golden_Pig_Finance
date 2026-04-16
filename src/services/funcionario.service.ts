import { ResultSetHeader } from "mysql2";
import { FuncionarioRepository } from "../repository/funcionario.repository";
import { iFuncionario } from "../models/funcionario.model";

export class FuncionarioService {

  constructor(private repository = new FuncionarioRepository()) { }

  async selecionarTodos(): Promise<iFuncionario[]> {
    return await this.repository.selectAll();
  }

  async selecionarPorId(id: number): Promise<iFuncionario | null> {
    return await this.repository.selectById(id);
  }

  async selecionarPorEmpreendimento(id_empreendimento: number): Promise<iFuncionario[]> {
    if (!id_empreendimento || id_empreendimento <= 0) {
      throw new Error("ID do empreendimento inválido");
    }
    return await this.repository.selectByEmpreendimento(id_empreendimento);
  }

  async inserir(
    id_empreendimento: number,
    nome: string,
    cpf?: string,
    cargo?: string,
    data_admissao?: Date
  ): Promise<number> {
    if (!id_empreendimento || id_empreendimento <= 0) {
      throw new Error("ID do empreendimento é obrigatório");
    }

    if (!nome || nome.trim().length < 3) {
      throw new Error("Nome do funcionário deve ter pelo menos 3 caracteres");
    }

    if (nome.trim().length > 100) {
      throw new Error("Nome do funcionário deve ter no máximo 100 caracteres");
    }

    if (cpf) {
      const cpfLimpo = cpf.replace(/\D/g, '');

      if (cpfLimpo.length !== 11) {
        throw new Error("CPF deve conter 11 dígitos");
      }

      if (!this._validarDigitosCpf(cpfLimpo)) {
        throw new Error("CPF inválido");
      }

      const cpfExistente = await this.repository.selectByCpf(cpfLimpo);
      if (cpfExistente) {
        throw new Error("Já existe um funcionário cadastrado com esse CPF");
      }
    }

    if (cargo && cargo.trim().length > 50) {
      throw new Error("Cargo deve ter no máximo 50 caracteres");
    }

    return await this.repository.insert(
      id_empreendimento,
      nome.trim(),
      cpf ? cpf.replace(/\D/g, '') : undefined,
      cargo?.trim(),
      data_admissao
    );
  }

  async atualizar(
    id: number,
    nome: string,
    cpf?: string,
    cargo?: string,
    data_admissao?: Date
  ): Promise<ResultSetHeader> {
    if (!nome || nome.trim().length < 3) {
      throw new Error("Nome do funcionário deve ter pelo menos 3 caracteres");
    }

    if (nome.trim().length > 100) {
      throw new Error("Nome do funcionário deve ter no máximo 100 caracteres");
    }

    if (cpf) {
      const cpfLimpo = cpf.replace(/\D/g, '');

      if (cpfLimpo.length !== 11) {
        throw new Error("CPF deve conter 11 dígitos");
      }

      if (!this._validarDigitosCpf(cpfLimpo)) {
        throw new Error("CPF inválido");
      }

      const cpfExistente = await this.repository.selectByCpf(cpfLimpo);
      if (cpfExistente && cpfExistente.id_funcionario !== id) {
        throw new Error("Já existe um funcionário cadastrado com esse CPF");
      }
    }

    if (cargo && cargo.trim().length > 50) {
      throw new Error("Cargo deve ter no máximo 50 caracteres");
    }

    const result = await this.repository.update(
      id,
      nome.trim(),
      cpf ? cpf.replace(/\D/g, '') : undefined,
      cargo?.trim(),
      data_admissao
    );

    if (result.affectedRows === 0) {
      throw new Error("Funcionário não encontrado");
    }

    return result;
  }

  async deletar(id: number): Promise<ResultSetHeader> {
    const result = await this.repository.delete(id);

    if (result.affectedRows === 0) {
      throw new Error("Funcionário não encontrado");
    }

    return result;
  }

  // Validação dos dígitos verificadores do CPF
  private _validarDigitosCpf(cpf: string): boolean {
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let digito1 = (soma * 10) % 11;
    if (digito1 === 10 || digito1 === 11) digito1 = 0;
    if (digito1 !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    let digito2 = (soma * 10) % 11;
    if (digito2 === 10 || digito2 === 11) digito2 = 0;
    if (digito2 !== parseInt(cpf[10])) return false;

    return true;
  }
}
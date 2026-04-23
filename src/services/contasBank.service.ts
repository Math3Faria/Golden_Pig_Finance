import { ResultSetHeader } from "mysql2";
import { ContaRepository } from "../repository/contasBank.repository";
import { iConta } from "../models/contasBank.model";

export class ContaService {

    constructor(private repository = new ContaRepository()) {}

    // =========================
    // SELECT ALL
    // =========================
    async selecionarTodos() {
        return await this.repository.selectAll();
    }

    // =========================
    // SELECT BY ID
    // =========================
    async selecionarPorId(id: number) {
        if (!id || id <= 0) {
            throw new Error("ID inválido");
        }

        return await this.repository.selectById(id);
    }

    // =========================
    // SELECT BY PERFIL
    // =========================
    async selecionarPorPerfil(id_perfil: number) {
        if (!id_perfil || id_perfil <= 0) {
            throw new Error("Perfil inválido");
        }

        return await this.repository.selectByPerfil(id_perfil);
    }

    // =========================
    // INSERT
    // =========================
    async inserir(conta: iConta): Promise<number> {
        this._validar(conta);

        conta.saldo = conta.saldo ?? 0;

        return await this.repository.insert(conta);
    }

    // =========================
    // UPDATE
    // =========================
    async atualizar(id: number, conta: iConta): Promise<ResultSetHeader> {
        if (!id || id <= 0) {
            throw new Error("ID inválido");
        }

        this._validar(conta);

        const result = await this.repository.update(id, conta);

        if (result.affectedRows === 0) {
            throw new Error("Conta não encontrada");
        }

        return result;
    }

    // =========================
    // DELETE
    // =========================
    async deletar(id: number): Promise<ResultSetHeader> {
        if (!id || id <= 0) {
            throw new Error("ID inválido");
        }

        const result = await this.repository.delete(id);

        if (result.affectedRows === 0) {
            throw new Error("Conta não encontrada");
        }

        return result;
    }

    // =========================
    // 💰 OBTER SALDO
    // =========================
    async obterSaldo(id_conta: number): Promise<number> {
        if (!id_conta || id_conta <= 0) {
            throw new Error("Conta inválida");
        }

        return await this.repository.obterSaldo(id_conta);
    }

    // =========================
    // 💰 ATUALIZAR SALDO
    // =========================
    async atualizarSaldo(id_conta: number, valor: number, tipo: 'entrada' | 'saida') {

        if (!id_conta || id_conta <= 0) {
            throw new Error("Conta inválida");
        }

        const saldoAtual = await this.repository.obterSaldo(id_conta);

        let novoSaldo = saldoAtual;

        if (tipo === 'entrada') {
            novoSaldo += valor;
        } else {
            if (valor > saldoAtual) {
                throw new Error("Saldo insuficiente");
            }
            novoSaldo -= valor;
        }

        return await this.repository.atualizarSaldo(id_conta, novoSaldo);
    }

    // =========================
    // 🔒 VALIDAÇÕES
    // =========================
    private _validar(conta: iConta): void {

        if (!conta.id_perfil || conta.id_perfil <= 0) {
            throw new Error("Perfil inválido");
        }

        if (!conta.tipo_conta || !['corrente', 'poupanca', 'carteira'].includes(conta.tipo_conta)) {
            throw new Error("Tipo de conta inválido");
        }

        if (conta.nome_banco && conta.nome_banco.length > 100) {
            throw new Error("Nome do banco muito longo");
        }

        if (conta.saldo !== undefined && conta.saldo < 0) {
            throw new Error("Saldo não pode ser negativo");
        }
    }
}
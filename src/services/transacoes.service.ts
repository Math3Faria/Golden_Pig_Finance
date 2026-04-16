import { ResultSetHeader } from "mysql2";
import { TransacaoRepository } from "../repository/transacoes.repository";
import { iTransacao } from "../models/transacoes.model";

export class TransacaoService {

    constructor(private repository = new TransacaoRepository()) {}

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
    // INSERT
    // =========================
    async inserir(transacao: iTransacao): Promise<number> {
        this._validar(transacao);

        // valores padrão
        transacao.status = transacao.status ?? 'pago';
        transacao.id_faturamento = transacao.id_faturamento ?? null;

        return await this.repository.insert(transacao);
    }

    // =========================
    // UPDATE
    // =========================
    async atualizar(id: number, transacao: iTransacao): Promise<ResultSetHeader> {
        if (!id || id <= 0) {
            throw new Error("ID inválido");
        }

        this._validar(transacao);

        const result = await this.repository.update(id, transacao);

        if (result.affectedRows === 0) {
            throw new Error("Transação não encontrada");
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
            throw new Error("Transação não encontrada");
        }

        return result;
    }

    // =========================
    // 🔥 EXTRA: BUSCAR POR PERÍODO
    // =========================
    async buscarPorPeriodo(inicio: Date, fim: Date) {

        if (!inicio || !fim) {
            throw new Error("Datas obrigatórias");
        }

        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);

        if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
            throw new Error("Datas inválidas");
        }

        if (dataInicio > dataFim) {
            throw new Error("Data inicial não pode ser maior que a final");
        }

        return await this.repository.selectByPeriodo(dataInicio, dataFim);
    }

    // =========================
    // 🔒 VALIDAÇÕES
    // =========================
    private _validar(t: iTransacao): void {

        if (!t.id_conta || t.id_conta <= 0) {
            throw new Error("Conta inválida");
        }

        if (!t.id_categoria || t.id_categoria <= 0) {
            throw new Error("Categoria inválida");
        }

        if (t.id_faturamento && t.id_faturamento <= 0) {
            throw new Error("Faturamento inválido");
        }

        if (!t.valor || t.valor <= 0) {
            throw new Error("Valor deve ser maior que zero");
        }

        if (!t.tipo || !['entrada', 'saida'].includes(t.tipo)) {
            throw new Error("Tipo deve ser 'entrada' ou 'saida'");
        }

        if (!t.data) {
            throw new Error("Data é obrigatória");
        }

        const data = new Date(t.data);
        if (isNaN(data.getTime())) {
            throw new Error("Data inválida");
        }

        if (t.descricao && t.descricao.length > 255) {
            throw new Error("Descrição deve ter no máximo 255 caracteres");
        }

        if (t.status && !['pendente', 'pago'].includes(t.status)) {
            throw new Error("Status inválido");
        }
    }
}
import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iTransacao, iTransacaoDB } from "../models/transacoes.model";

export class TransacaoRepository {

    async selectAll(): Promise<iTransacaoDB[]> {
        const sql = "SELECT * FROM transacoes";
        const [rows] = await db.execute<iTransacaoDB[]>(sql);
        return rows;
    }

    async selectById(id: number): Promise<iTransacaoDB | null> {
        const sql = "SELECT * FROM transacoes WHERE id_transacao=?";
        const [rows] = await db.execute<iTransacaoDB[]>(sql, [id]);
        return rows[0] ?? null;
    }

    async insert(transacao: iTransacao): Promise<number> {
        const sql = `
            INSERT INTO transacoes 
            (id_conta, id_categoria, id_faturamento, valor, tipo, data, descricao, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            transacao.id_conta,
            transacao.id_categoria,
            transacao.id_faturamento ?? null,
            transacao.valor,
            transacao.tipo,
            this._formatarData(transacao.data),
            transacao.descricao ?? null,
            transacao.status ?? 'pago'
        ];

        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result.insertId;
    }

    async update(id: number, transacao: iTransacao): Promise<ResultSetHeader> {
        const sql = `
            UPDATE transacoes SET
                id_conta = ?,
                id_categoria = ?,
                id_faturamento = ?,
                valor = ?,
                tipo = ?,
                data = ?,
                descricao = ?,
                status = ?
            WHERE id_transacao = ?
        `;

        const values = [
            transacao.id_conta,
            transacao.id_categoria,
            transacao.id_faturamento ?? null,
            transacao.valor,
            transacao.tipo,
            this._formatarData(transacao.data),
            transacao.descricao ?? null,
            transacao.status ?? 'pago',
            id
        ];

        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM transacoes WHERE id_transacao=?";
        const [result] = await db.execute<ResultSetHeader>(sql, [id]);
        return result;
    }

    async selectByPeriodo(inicio: Date, fim: Date): Promise<iTransacaoDB[]> {
        const sql = `
            SELECT * FROM transacoes
            WHERE data BETWEEN ? AND ?
            ORDER BY data DESC
        `;

        const values = [
            this._formatarData(inicio),
            this._formatarData(fim)
        ];

        const [rows] = await db.execute<iTransacaoDB[]>(sql, values);
        return rows;
    }

    private _formatarData(data: Date): string {
        return new Date(data)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
    }
}
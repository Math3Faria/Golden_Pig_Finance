import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iConta, iContaDB } from "../models/contasBank.model";

export class ContaRepository {

    // =========================
    // SELECT ALL
    // =========================
    async selectAll(): Promise<iContaDB[]> {
        const sql = "SELECT * FROM contasBank";
        const [rows] = await db.execute<iContaDB[]>(sql);
        return rows;
    }

    // =========================
    // SELECT BY ID
    // =========================
    async selectById(id: number): Promise<iContaDB | null> {
        const sql = "SELECT * FROM contasBank WHERE id_conta=?";
        const [rows] = await db.execute<iContaDB[]>(sql, [id]);
        return rows[0] ?? null;
    }

    // =========================
    // SELECT BY PERFIL
    // =========================
    async selectByPerfil(id_perfil: number): Promise<iContaDB[]> {
        const sql = "SELECT * FROM contasBank WHERE id_perfil=?";
        const [rows] = await db.execute<iContaDB[]>(sql, [id_perfil]);
        return rows;
    }

    // =========================
    // INSERT
    // =========================
    async insert(conta: iConta): Promise<number> {
        const sql = `
            INSERT INTO contasBank
            (id_perfil, nome_banco, tipo_conta, saldo)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            conta.id_perfil,
            conta.nome_banco ?? null,
            conta.tipo_conta,
            conta.saldo ?? 0
        ];

        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result.insertId;
    }

    // =========================
    // UPDATE
    // =========================
    async update(id: number, conta: iConta): Promise<ResultSetHeader> {
        const sql = `
            UPDATE contasBank SET
                id_perfil = ?,
                nome_banco = ?,
                tipo_conta = ?,
                saldo = ?
            WHERE id_conta = ?
        `;

        const values = [
            conta.id_perfil,
            conta.nome_banco ?? null,
            conta.tipo_conta,
            conta.saldo ?? 0,
            id
        ];

        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    // =========================
    // DELETE
    // =========================
    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM contasBank WHERE id_conta=?";
        const [result] = await db.execute<ResultSetHeader>(sql, [id]);
        return result;
    }

    // =========================
    // 💰 ATUALIZAR SALDO
    // =========================
    async atualizarSaldo(id_conta: number, novoSaldo: number): Promise<ResultSetHeader> {
        const sql = `
            UPDATE contasBank
            SET saldo = ?
            WHERE id_conta = ?
        `;

        const [result] = await db.execute<ResultSetHeader>(sql, [novoSaldo, id_conta]);
        return result;
    }

    // =========================
    // 🔎 BUSCAR SALDO ATUAL
    // =========================
    async obterSaldo(id_conta: number): Promise<number> {
        const sql = "SELECT saldo FROM contasBank WHERE id_conta=?";
        const [rows] = await db.execute<iContaDB[]>(sql, [id_conta]);

        if (!rows[0]) {
            throw new Error("Conta não encontrada");
        }

        return Number(rows[0].saldo);
    }
}
import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iEmpreendimento } from "../models/empreendimento.model";

export class EmpreendimentoRepository {
    async selectAll(): Promise<iEmpreendimento[]> {
        const sql = "SELECT * FROM empreendimentos";
        const [rows] = await db.execute<iEmpreendimento[]>(sql);
        return rows;
    }
    async selectById(id: number): Promise<iEmpreendimento | null> {
        const sql = "SELECT * FROM funcionarios WHERE id_empreendimento = ?";
        const [rows] = await db.execute<iEmpreendimento[]>(sql, [id]);
        return rows[0] ?? null;
    }
    async insert(id_perfil: number, nome: string, cnpj?: string, data_inicio?: Date): Promise<number> {
        const sql = "INSERT INTO empreendimentos (id_perfil, nome, cnpj, data_inicio) VALUES (?, ?, ?, ?)";
        const values = [id_perfil, nome, cnpj || null, data_inicio || null];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows.insertId;
    }
    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM empreendimentos WHERE id_empreendimento=?";
        const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
        return rows;
    }
    async atualizar(id: Number, nome: string, cnpj?: string, data_inicio?: Date): Promise<ResultSetHeader> {
        const sql = "UPDATE empreendimentos SET id_perfil = ?, nome = ?, cnpj = ?, data_inicio = ? WHERE id_empreendimento = ?"
        const values = [nome, cnpj || null, data_inicio || null];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}
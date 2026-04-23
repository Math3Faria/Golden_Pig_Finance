import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iFaturamento } from "../models/faturamento.model";

// export class EmpreendimentoRepository {
//     async selectAll(): Promise<iEmpreendimento[]> {
//         const sql = "SELECT * FROM empreendimentos";
//         const [rows] = await db.execute<iEmpreendimento[]>(sql);
//         return rows;
//     }

export class FaturamentoRepository {
    async selectAll(): Promise<iFaturamento[]> {
        const sql = "SELECT * FROM faturamentos";
        const [rows] = await db.execute<iFaturamento[]>(sql);
        return rows;
    }

    async selectById(id: number): Promise<iFaturamento | null> {
        const sql = "SELECT * FROM faturamentos WHERE id_empreendimento = ?";
        const [rows] = await db.execute<iFaturamento[]>(sql, [id]);
        return rows[0] ?? null;
    }

    async insert(id_empreendimento: number, valor: number): Promise<number> {
        const sql = "INSERT INTO faturamentos (valor) VALUES (?)";
        const values = [valor || null];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows.insertId;
    }

    async delete(id_empreendimento: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM faturamnetos WHERE id_empreendimento=?";
        const [rows] = await db.execute<ResultSetHeader>(sql);
        return rows;
    }

    async atualizar(id_empreendimento: Number, valor: Number): Promise<ResultSetHeader> {
        const sql = "UPDATE faturamentos SET valor = ? WHERE id_empreendimento = ?"
        const values = [valor || null];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

}

import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iTelefone } from "../models/telefones.model";

export class TelefoneRepository {

    async selectAll(): Promise<iTelefone[]> {
        const sql = "SELECT * FROM telefones";
        const [rows] = await db.execute<iTelefone[]>(sql);
        return rows;
    }
    async selectByUsuario(id_usuario: number): Promise<iTelefone[]> {
        const sql = "SELECT * FROM telefones WHERE id_usuario = ?";
        const [rows] = await db.execute<iTelefone[]>(sql, [id_usuario]);
        return rows;
    }

    async insert(id_usuario: number, numero: string): Promise<number> {
        const sql = "INSERT INTO telefones (id_usuario, numero) VALUES (?, ?)";
        const [rows] = await db.execute<ResultSetHeader>(sql, [id_usuario, numero]);
        return rows.insertId;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM telefones WHERE id_telefone = ?";
        const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
        return rows;
    }

    async atualizar(id: number, telefone?: string): Promise<ResultSetHeader> {
        const sql = "UPDATE telefones SET telefone = ? WHERE id_usuario = ?"
        const values = [telefone || null];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}
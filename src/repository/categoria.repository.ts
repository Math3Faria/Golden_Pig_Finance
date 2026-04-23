import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iCategoria } from "../models/categoria.model";

export class CategoriaRepository {

  async selectAll(): Promise<iCategoria[]> {
    const sql = "SELECT * FROM categorias";
    const [rows] = await db.execute<iCategoria[]>(sql);
    return rows;
  }

  async selectById(id: number): Promise<iCategoria | null> {
    const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
    const [rows] = await db.execute<iCategoria[]>(sql, [id]);
    return rows[0] ?? null;
  }

  async selectByPerfil(id_perfil: number): Promise<iCategoria[]> {
    const sql = "SELECT * FROM categorias WHERE id_perfil = ? OR padrao = TRUE";
    const [rows] = await db.execute<iCategoria[]>(sql, [id_perfil]);
    return rows;
  }

  async selectPadrao(): Promise<iCategoria[]> {
    const sql = "SELECT * FROM categorias WHERE padrao = TRUE";
    const [rows] = await db.execute<iCategoria[]>(sql);
    return rows;
  }

  async insert(
    nome: string,
    id_perfil?: number | null,
    padrao: boolean = false
  ): Promise<number> {
    const sql = `
            INSERT INTO categorias (nome, id_perfil, padrao)
            VALUES (?, ?, ?)
        `;
    const values = [nome, id_perfil ?? null, padrao];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(
    id: number,
    nome: string,
    id_perfil?: number | null
  ): Promise<ResultSetHeader> {
    const sql = `
            UPDATE categorias
            SET nome = ?, id_perfil = ?
            WHERE id_categoria = ?
        `;
    const values = [nome, id_perfil ?? null, id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM categorias WHERE id_categoria = ?";
    const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
    return rows;
  }
}
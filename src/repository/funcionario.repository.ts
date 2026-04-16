import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iFuncionario } from "../models/funcionario.model";

export class FuncionarioRepository {

  async selectAll(): Promise<iFuncionario[]> {
    const sql = "SELECT * FROM funcionarios";
    const [rows] = await db.execute<iFuncionario[]>(sql);
    return rows;
  }

  async selectById(id: number): Promise<iFuncionario | null> {
    const sql = "SELECT * FROM funcionarios WHERE id_funcionario = ?";
    const [rows] = await db.execute<iFuncionario[]>(sql, [id]);
    return rows[0] ?? null;
  }

  async selectByEmpreendimento(id_empreendimento: number): Promise<iFuncionario[]> {
    const sql = "SELECT * FROM funcionarios WHERE id_empreendimento = ?";
    const [rows] = await db.execute<iFuncionario[]>(sql, [id_empreendimento]);
    return rows;
  }

  async selectByCpf(cpf: string): Promise<iFuncionario | null> {
    const sql = "SELECT * FROM funcionarios WHERE cpf = ?";
    const [rows] = await db.execute<iFuncionario[]>(sql, [cpf]);
    return rows[0] ?? null;
  }

  async insert(
    id_empreendimento: number,
    nome: string,
    cpf?: string,
    cargo?: string,
    data_admissao?: Date
  ): Promise<number> {
    const sql = `
            INSERT INTO funcionarios (id_empreendimento, nome, cpf, cargo, data_admissao)
            VALUES (?, ?, ?, ?, ?)
        `;
    const values = [id_empreendimento, nome, cpf ?? null, cargo ?? null, data_admissao ?? null];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(
    id: number,
    nome: string,
    cpf?: string,
    cargo?: string,
    data_admissao?: Date
  ): Promise<ResultSetHeader> {
    const sql = `
            UPDATE funcionarios
            SET nome = ?, cpf = ?, cargo = ?, data_admissao = ?
            WHERE id_funcionario = ?
        `;
    const values = [nome, cpf ?? null, cargo ?? null, data_admissao ?? null, id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM funcionarios WHERE id_funcionario = ?";
    const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
    return rows;
  }
}
import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iSalario } from "../models/salario.model";

export class SalarioRepository {

  async selectAll(): Promise<iSalario[]> {
    const sql = "SELECT * FROM salarios";
    const [rows] = await db.execute<iSalario[]>(sql);
    return rows;
  }

  async selectById(id: number): Promise<iSalario | null> {
    const sql = "SELECT * FROM salarios WHERE id_salario = ?";
    const [rows] = await db.execute<iSalario[]>(sql, [id]);
    return rows[0] ?? null;
  }

  async selectByFuncionario(id_funcionario: number): Promise<iSalario[]> {
    const sql = "SELECT * FROM salarios WHERE id_funcionario = ?";
    const [rows] = await db.execute<iSalario[]>(sql, [id_funcionario]);
    return rows;
  }

  async selectByStatus(status: 'pendente' | 'pago'): Promise<iSalario[]> {
    const sql = "SELECT * FROM salarios WHERE status = ?";
    const [rows] = await db.execute<iSalario[]>(sql, [status]);
    return rows;
  }

  async insert(
    id_funcionario: number,
    valor: number,
    data_pagamento?: Date,
    status: 'pendente' | 'pago' = 'pendente'
  ): Promise<number> {
    const sql = `
            INSERT INTO salarios (id_funcionario, valor, data_pagamento, status)
            VALUES (?, ?, ?, ?)
        `;
    const values = [id_funcionario, valor, data_pagamento ?? null, status];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(
    id: number,
    valor: number,
    data_pagamento?: Date,
    status: 'pendente' | 'pago' = 'pendente'
  ): Promise<ResultSetHeader> {
    const sql = `
            UPDATE salarios
            SET valor = ?, data_pagamento = ?, status = ?
            WHERE id_salario = ?
        `;
    const values = [valor, data_pagamento ?? null, status, id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async updateStatus(id: number, status: 'pendente' | 'pago'): Promise<ResultSetHeader> {
    const sql = "UPDATE salarios SET status = ? WHERE id_salario = ?";
    const [rows] = await db.execute<ResultSetHeader>(sql, [status, id]);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM salarios WHERE id_salario = ?";
    const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
    return rows;
  }
}
import { db } from "../database/connection.database";
import { Faturamento } from "../models/faturamento.model";

export class FaturamentoRepository {

  async inserir(f: Faturamento) {

    const sql = `
      INSERT INTO faturamentos (id_empreendimento, valor)
      VALUES (?, ?)
    `;

    await db.execute(sql, [
      f.IdEmpreendimento,
      f.Valor
    ]);
  }

  async selecionarTodos() {

    const sql = `SELECT * FROM faturamentos`;

    const [rows] = await db.execute(sql);

    return rows;
  }

  async selecionarPorId(id: number) {

    const sql = `
      SELECT * FROM faturamentos
      WHERE id_faturamento = ?
    `;

    const [rows]: any = await db.execute(sql, [id]);

    return rows[0];
  }

  async atualizar(id: number, valor: number) {

    const sql = `
      UPDATE faturamentos
      SET valor = ?
      WHERE id_faturamento = ?
    `;

    await db.execute(sql, [valor, id]);
  }

  async deletar(id: number) {

    const sql = `
      DELETE FROM faturamentos
      WHERE id_faturamento = ?
    `;

    await db.execute(sql, [id]);
  }

}
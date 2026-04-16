import { db } from "../database/connection.database";
import { Empreendimento } from "../models/empreendimentos.model";

export class EmpreendimentoRepository {

  async inserir(emp: Empreendimento) {

    const sql = `
      INSERT INTO empreendimentos (id_perfil, nome)
      VALUES (?, ?)
    `;

    await db.execute(sql, [
      emp.IdPerfil,
      emp.Nome
    ]);
  }

  async selecionarTodos() {

    const sql = `SELECT * FROM empreendimentos`;

    const [rows] = await db.execute(sql);

    return rows;
  }

  async selecionarPorId(id: number) {

    const sql = `
      SELECT * FROM empreendimentos
      WHERE id_empreendimento = ?
    `;

    const [rows]: any = await db.execute(sql, [id]);

    return rows[0];
  }

  async atualizar(id: number, nome: string) {

    const sql = `
      UPDATE empreendimentos
      SET nome = ?
      WHERE id_empreendimento = ?
    `;

    await db.execute(sql, [nome, id]);
  }

  async deletar(id: number) {

    const sql = `
      DELETE FROM empreendimentos
      WHERE id_empreendimento = ?
    `;

    await db.execute(sql, [id]);
  }

}
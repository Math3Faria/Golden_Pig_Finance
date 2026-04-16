import { db } from "../database/connection.database";
import { Telefone } from "../models/telefones.models";

export class TelefoneRepository {

  async inserir(telefone: Telefone) {

    const sql = `
      INSERT INTO telefones (id_usuario, numero)
      VALUES (?, ?)
    `;

    await db.execute(sql, [
      telefone.IdUsuario,
      telefone.Numero
    ]);
  }

  async selecionarTodos() {

    const sql = `SELECT * FROM telefones`;

    const [rows] = await db.execute(sql);

    return rows;
  }

  async selecionarPorId(id: number) {

    const sql = `
      SELECT * FROM telefones
      WHERE id_telefone = ?
    `;

    const [rows]: any = await db.execute(sql, [id]);

    return rows[0];
  }

  async atualizar(id: number, numero: string) {

    const sql = `
      UPDATE telefones
      SET numero = ?
      WHERE id_telefone = ?
    `;

    await db.execute(sql, [numero, id]);
  }

  async deletar(id: number) {

    const sql = `
      DELETE FROM telefones
      WHERE id_telefone = ?
    `;

    await db.execute(sql, [id]);
  }

}
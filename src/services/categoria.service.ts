import { ResultSetHeader } from "mysql2";
import { CategoriaRepository } from "../repository/categoria.repository";
import { iCategoria } from "../models/categoria.model";

export class CategoriaService {

  constructor(private repository = new CategoriaRepository()) { }

  async selecionarTodos(): Promise<iCategoria[]> {
    return await this.repository.selectAll();
  }

  async selecionarPorId(id: number): Promise<iCategoria | null> {
    return await this.repository.selectById(id);
  }

  async selecionarPorPerfil(id_perfil: number): Promise<iCategoria[]> {
    if (!id_perfil || id_perfil <= 0) {
      throw new Error("ID do perfil inválido");
    }
    return await this.repository.selectByPerfil(id_perfil);
  }

  async selecionarPadrao(): Promise<iCategoria[]> {
    return await this.repository.selectPadrao();
  }

  async inserir(
    nome: string,
    id_perfil?: number | null,
    padrao: boolean = false
  ): Promise<number> {
    if (!nome || nome.trim().length < 3) {
      throw new Error("Nome da categoria deve ter pelo menos 3 caracteres");
    }

    if (nome.trim().length > 100) {
      throw new Error("Nome da categoria deve ter no máximo 100 caracteres");
    }

    // Categorias padrão só podem ser criadas sem vínculo de perfil
    if (padrao && id_perfil) {
      throw new Error("Categorias padrão não podem estar vinculadas a um perfil específico");
    }

    return await this.repository.insert(nome.trim(), id_perfil, padrao);
  }

  async atualizar(
    id: number,
    nome: string,
    id_perfil?: number | null
  ): Promise<ResultSetHeader> {
    if (!nome || nome.trim().length < 3) {
      throw new Error("Nome da categoria deve ter pelo menos 3 caracteres");
    }

    if (nome.trim().length > 100) {
      throw new Error("Nome da categoria deve ter no máximo 100 caracteres");
    }

    // Impede edição de categorias padrão do sistema
    const categoriaAtual = await this.repository.selectById(id);
    if (!categoriaAtual) {
      throw new Error("Categoria não encontrada");
    }

    if (categoriaAtual.padrao) {
      throw new Error("Categorias padrão do sistema não podem ser editadas");
    }

    const result = await this.repository.update(id, nome.trim(), id_perfil);

    if (result.affectedRows === 0) {
      throw new Error("Categoria não encontrada");
    }

    return result;
  }

  async deletar(id: number): Promise<ResultSetHeader> {
    // Impede exclusão de categorias padrão do sistema
    const categoriaAtual = await this.repository.selectById(id);
    if (!categoriaAtual) {
      throw new Error("Categoria não encontrada");
    }

    if (categoriaAtual.padrao) {
      throw new Error("Categorias padrão do sistema não podem ser excluídas");
    }

    const result = await this.repository.delete(id);

    if (result.affectedRows === 0) {
      throw new Error("Categoria não encontrada");
    }

    return result;
  }
}
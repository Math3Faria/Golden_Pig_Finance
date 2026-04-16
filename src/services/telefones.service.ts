import { TelefoneRepository } from "../repository/telefones.repository";
import { Telefone } from "../models/telefones.models";

export class TelefoneService {

  private repository = new TelefoneRepository();

  async selecionarTodos() {
    return await this.repository.selecionarTodos();
  }

  async selecionarPorId(id: number) {
    return await this.repository.selecionarPorId(id);
  }

  async inserir(id_usuario: number, numero: string) {

    const telefone = Telefone.criar(id_usuario, numero);

    await this.repository.inserir(telefone);

    return telefone;
  }

  async atualizar(id: number, numero: string) {

    await this.repository.atualizar(id, numero);

    return { mensagem: "Telefone atualizado" };
  }

  async deletar(id: number) {

    await this.repository.deletar(id);

    return { mensagem: "Telefone removido" };
  }

}
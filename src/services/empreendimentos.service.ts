import { EmpreendimentoRepository } from "../repository/empreendimentos.repository";
import { Empreendimento } from "../models/empreendimentos.model";

export class EmpreendimentoService {

  private repository = new EmpreendimentoRepository();

  async selecionarTodos() {
    return await this.repository.selecionarTodos();
  }

  async selecionarPorId(id: number) {
    return await this.repository.selecionarPorId(id);
  }

  async inserir(id_perfil: number, nome: string) {

    const empreendimento = Empreendimento.criar(id_perfil, nome);

    await this.repository.inserir(empreendimento);

    return empreendimento;
  }

  async atualizar(id: number, nome: string) {

    await this.repository.atualizar(id, nome);

    return { mensagem: "Empreendimento atualizado" };
  }

  async deletar(id: number) {

    await this.repository.deletar(id);

    return { mensagem: "Empreendimento removido" };
  }

}
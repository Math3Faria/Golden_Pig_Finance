import { FaturamentoRepository } from "../repository/faturamento.repository";
import { Faturamento } from "../models/faturamento.model";

export class FaturamentoService {

  private repository = new FaturamentoRepository();

  async selecionarTodos() {
    return await this.repository.selecionarTodos();
  }

  async selecionarPorId(id: number) {
    return await this.repository.selecionarPorId(id);
  }

  async inserir(id_empreendimento: number, valor: number) {

    const faturamento = Faturamento.criar(id_empreendimento, valor);

    await this.repository.inserir(faturamento);

    return faturamento;
  }

  async atualizar(id: number, valor: number) {

    await this.repository.atualizar(id, valor);

    return { mensagem: "Faturamento atualizado" };
  }

  async deletar(id: number) {

    await this.repository.deletar(id);

    return { mensagem: "Faturamento removido" };
  }

}
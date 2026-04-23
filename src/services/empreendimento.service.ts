import { EmpreendimentoRepository } from "../repository/empreendimento.repository";

export class EmpreendimentoService {
    constructor(private repository = new EmpreendimentoRepository()) { }

    async selecionarTodos() {
        return await this.repository.selectAll();
    }

    async inserir(id_perfil: number, nome: string, cnpj?: string, data_inicio?: Date) {
        if (!id_perfil || !nome) throw new Error("Perfil e Nome são obrigatórios");
        return await this.repository.insert(id_perfil, nome, cnpj, data_inicio);
    }

    async deletar(id: number) {
        const result = await this.repository.delete(id);
        if (result.affectedRows === 0) throw new Error("Empreendimento não encontrado");
        return result;
    }

    async atualizar(id_perfil: number, id_empreendimento: number, nome: string, cnpj?: string) {
        if (!id_perfil || !nome || !cnpj || !id_empreendimento) throw new Error("Id do Perfil, Id do Empreendimento, Nome e Cnpj são obrigatórios na hora de atualizar");
        return await this.repository.atualizar(id_empreendimento, nome, cnpj);
    }

}
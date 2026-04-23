import { TelefoneRepository } from "../repository/telefones.repository";

export class TelefoneService {
    constructor(private repository = new TelefoneRepository()) { }

    async selecionarTodos() {
        return await this.repository.selectAll();
    }
    async selecionarPorUsuario(id_perfil: number) {
        return await this.repository.selectByUsuario(id_perfil);
    }

    async inserir(id_perfil: number, telefone: string) {
        if (!id_perfil || !telefone) throw new Error("Dados incompletos");
        return await this.repository.insert(id_perfil, telefone);
    }

    async deletar(id: number) {
        const result = await this.repository.delete(id);
        if (result.affectedRows === 0) throw new Error("Telefone não encontrado");
        return result;
    }

    async atualizar(id_perfil: number, telefone: string) {
        if (!id_perfil || !telefone) throw new Error("Id do Perfil e Telefone são obrigatórios na hora de atualizar");
        return await this.repository.atualizar(id_perfil, telefone);
    }

}
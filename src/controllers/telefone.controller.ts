import { Request, Response } from "express";
import { TelefoneService } from "../services/telefones.service";

export class TelefoneController {
    constructor(private service = new TelefoneService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const dados = await this.service.selecionarTodos();
            return res.status(200).json(dados);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    inserir = async (req: Request, res: Response) => {
        try {
            const { id_perfil, telefone } = req.body;
            const id = await this.service.inserir(id_perfil, telefone);
            return res.status(201).json({ id });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    atualizar = async (req: Request, res: Response) => {
        try {
            const { id_perfil, telefone } = req.body;
            const id = await this.service.atualizar(id_perfil, telefone);
            return res.status(200).json({ id });
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            await this.service.deletar(id);

            return res.status(200).json({ message: "Categoria deletada com sucesso" });

        } catch (error) {
            console.error(error);
            if (error instanceof Error)
                return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
        }
        res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
    }

}
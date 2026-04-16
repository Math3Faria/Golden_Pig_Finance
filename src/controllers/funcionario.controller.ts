import { Request, Response } from "express";
import { FuncionarioService } from "../services/funcionario.service";

export class FuncionarioController {

  constructor(private service = new FuncionarioService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { id_empreendimento } = req.query;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const funcionario = await this.service.selecionarPorId(idConvertido);

        if (!funcionario) {
          return res.status(404).json({ message: "Funcionário não encontrado" });
        }

        return res.status(200).json(funcionario);
      }

      if (id_empreendimento) {
        const idEmp = Number(id_empreendimento);

        if (isNaN(idEmp)) {
          return res.status(400).json({ message: "ID do empreendimento inválido" });
        }

        const funcionarios = await this.service.selecionarPorEmpreendimento(idEmp);
        return res.status(200).json(funcionarios);
      }

      const funcionarios = await this.service.selecionarTodos();
      return res.status(200).json(funcionarios);

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const { id_empreendimento, nome, cpf, cargo, data_admissao } = req.body;

      const id = await this.service.inserir(
        Number(id_empreendimento),
        nome,
        cpf,
        cargo,
        data_admissao ? new Date(data_admissao) : undefined
      );

      return res.status(201).json({
        message: "Funcionário cadastrado com sucesso",
        id
      });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  atualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { nome, cpf, cargo, data_admissao } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await this.service.atualizar(
        id,
        nome,
        cpf,
        cargo,
        data_admissao ? new Date(data_admissao) : undefined
      );

      return res.status(200).json({ message: "Funcionário atualizado com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  deletar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await this.service.deletar(id);

      return res.status(200).json({ message: "Funcionário deletado com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }
}
import { Request, Response } from "express";
import { SalarioService } from "../services/salario.service";

export class SalarioController {

  constructor(private service = new SalarioService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { id_funcionario, status } = req.query;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const salario = await this.service.selecionarPorId(idConvertido);

        if (!salario) {
          return res.status(404).json({ message: "Salário não encontrado" });
        }

        return res.status(200).json(salario);
      }

      if (id_funcionario) {
        const idFunc = Number(id_funcionario);

        if (isNaN(idFunc)) {
          return res.status(400).json({ message: "ID do funcionário inválido" });
        }

        const salarios = await this.service.selecionarPorFuncionario(idFunc);
        return res.status(200).json(salarios);
      }

      if (status) {
        const salarios = await this.service.selecionarPorStatus(String(status));
        return res.status(200).json(salarios);
      }

      const salarios = await this.service.selecionarTodos();
      return res.status(200).json(salarios);

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const { id_funcionario, valor, data_pagamento, status } = req.body;

      const id = await this.service.inserir(
        Number(id_funcionario),
        Number(valor),
        data_pagamento ? new Date(data_pagamento) : undefined,
        status ?? 'pendente'
      );

      return res.status(201).json({
        message: "Salário cadastrado com sucesso",
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
      const { valor, data_pagamento, status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await this.service.atualizar(
        id,
        Number(valor),
        data_pagamento ? new Date(data_pagamento) : undefined,
        status ?? 'pendente'
      );

      return res.status(200).json({ message: "Salário atualizado com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  atualizarStatus = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      if (!status) {
        return res.status(400).json({ message: "O campo status é obrigatório" });
      }

      await this.service.atualizarStatus(id, status);

      return res.status(200).json({ message: "Status do salário atualizado com sucesso" });

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

      return res.status(200).json({ message: "Salário deletado com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }
}
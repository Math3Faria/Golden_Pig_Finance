import { Request, Response } from "express";
import { ContaService } from "../services/contasBank.service";

export class ContaController {

  constructor(private service = new ContaService()) {}

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const conta = await this.service.selecionarPorId(idConvertido);

        if (!conta) {
          return res.status(404).json({ message: "Conta não encontrada" });
        }

        return res.status(200).json(conta);
      }

      const contas = await this.service.selecionarTodos();
      return res.status(200).json(contas);

    } catch (error) {
      return this._erro(res, error);
    }
  };

  selecionarPorPerfil = async (req: Request, res: Response) => {
    try {
      const id_perfil = Number(req.params.id_perfil);

      if (isNaN(id_perfil)) {
        return res.status(400).json({ message: "ID do perfil inválido" });
      }

      const contas = await this.service.selecionarPorPerfil(id_perfil);

      return res.status(200).json(contas);

    } catch (error) {
      return this._erro(res, error);
    }
  };

  inserir = async (req: Request, res: Response) => {
    try {
      const { id_perfil, nome_banco, tipo_conta, saldo } = req.body;

      const id = await this.service.inserir({
        id_perfil,
        nome_banco,
        tipo_conta,
        saldo
      });

      return res.status(201).json({
        message: "Conta criada com sucesso",
        id
      });

    } catch (error) {
      return this._erro(res, error);
    }
  };

  atualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const { id_perfil, nome_banco, tipo_conta, saldo } = req.body;

      await this.service.atualizar(id, {
        id_perfil,
        nome_banco,
        tipo_conta,
        saldo
      });

      return res.status(200).json({
        message: "Conta atualizada com sucesso"
      });

    } catch (error) {
      return this._erro(res, error);
    }
  };

  deletar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await this.service.deletar(id);

      return res.status(200).json({
        message: "Conta deletada com sucesso"
      });

    } catch (error) {
      return this._erro(res, error);
    }
  };

  obterSaldo = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const saldo = await this.service.obterSaldo(id);

      return res.status(200).json({ saldo });

    } catch (error) {
      return this._erro(res, error);
    }
  };

  private _erro(res: Response, error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: "Erro no servidor",
        errorMessage: error.message
      });
    }

    return res.status(500).json({
      message: "Erro no servidor",
      errorMessage: "Erro desconhecido"
    });
  }
}
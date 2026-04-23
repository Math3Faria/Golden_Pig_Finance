import { Request, Response } from "express";
import { TransacaoService } from "../services/transacoes.service";

export class TransacaoController {

  constructor(private service = new TransacaoService()) {}

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const transacao = await this.service.selecionarPorId(idConvertido);

        if (!transacao) {
          return res.status(404).json({ message: "Transação não encontrada" });
        }

        return res.status(200).json(transacao);
      }

      const transacoes = await this.service.selecionarTodos();
      return res.status(200).json(transacoes);

    } catch (error) {
      return this._erro(res, error);
    }
  };

  inserir = async (req: Request, res: Response) => {
    try {
      const {
        id_conta,
        id_categoria,
        id_faturamento,
        valor,
        tipo,
        data,
        descricao,
        status
      } = req.body;

      const id = await this.service.inserir({
        id_conta,
        id_categoria,
        id_faturamento,
        valor,
        tipo,
        data,
        descricao,
        status
      });

      return res.status(201).json({
        message: "Transação criada com sucesso",
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

      const {
        id_conta,
        id_categoria,
        id_faturamento,
        valor,
        tipo,
        data,
        descricao,
        status
      } = req.body;

      await this.service.atualizar(id, {
        id_conta,
        id_categoria,
        id_faturamento,
        valor,
        tipo,
        data,
        descricao,
        status
      });

      return res.status(200).json({
        message: "Transação atualizada com sucesso"
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
        message: "Transação deletada com sucesso"
      });

    } catch (error) {
      return this._erro(res, error);
    }
  };

  buscarPorPeriodo = async (req: Request, res: Response) => {
    try {
      const { inicio, fim } = req.query;

      if (!inicio || !fim) {
        return res.status(400).json({
          message: "As datas 'inicio' e 'fim' são obrigatórias"
        });
      }

      const dataInicio = new Date(inicio as string);
      const dataFim = new Date(fim as string);

      if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
        return res.status(400).json({
          message: "Datas inválidas"
        });
      }

      const transacoes = await this.service.buscarPorPeriodo(dataInicio, dataFim);

      return res.status(200).json(transacoes);

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
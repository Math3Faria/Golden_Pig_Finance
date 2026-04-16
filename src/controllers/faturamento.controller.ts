import { Request, Response } from "express";
import { FaturamentoService } from "../services/faturamento.service";

export class FaturamentoController {

  private service = new FaturamentoService();

  async selecionarTodos(req: Request, res: Response) {

    const lista = await this.service.selecionarTodos();

    res.json(lista);
  }

  async selecionarPorId(req: Request, res: Response) {

    const { id } = req.params;

    const fat = await this.service.selecionarPorId(Number(id));

    res.json(fat);
  }

  async inserir(req: Request, res: Response) {

    try {

      const { id_empreendimento, valor } = req.body;

      const fat = await this.service.inserir(id_empreendimento, valor);

      res.status(201).json(fat);

    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }

  }

  async atualizar(req: Request, res: Response) {

    const { id } = req.params;
    const { valor } = req.body;

    const result = await this.service.atualizar(Number(id), valor);

    res.json(result);
  }

  async deletar(req: Request, res: Response) {

    const { id } = req.params;

    const result = await this.service.deletar(Number(id));

    res.json(result);
  }

}
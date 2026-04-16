import { Request, Response } from "express";
import { EmpreendimentoService } from "../services/empreendimentos.service";

export class EmpreendimentoController {

  private service = new EmpreendimentoService();

  async selecionarTodos(req: Request, res: Response) {

    const lista = await this.service.selecionarTodos();

    res.json(lista);
  }

  async selecionarPorId(req: Request, res: Response) {

    const { id } = req.params;

    const emp = await this.service.selecionarPorId(Number(id));

    res.json(emp);
  }

  async inserir(req: Request, res: Response) {

    try {

      const { id_perfil, nome } = req.body;

      const emp = await this.service.inserir(id_perfil, nome);

      res.status(201).json(emp);

    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }

  }

  async atualizar(req: Request, res: Response) {

    const { id } = req.params;
    const { nome } = req.body;

    const result = await this.service.atualizar(Number(id), nome);

    res.json(result);
  }

  async deletar(req: Request, res: Response) {

    const { id } = req.params;

    const result = await this.service.deletar(Number(id));

    res.json(result);
  }

}
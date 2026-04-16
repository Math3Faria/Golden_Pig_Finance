import { Request, Response } from "express";
import { TelefoneService } from "../services/telefones.service";

export class TelefoneController {

  private service = new TelefoneService();

  async selecionarTodos(req: Request, res: Response) {

    const lista = await this.service.selecionarTodos();

    res.json(lista);
  }

  async selecionarPorId(req: Request, res: Response) {

    const { id } = req.params;

    const telefone = await this.service.selecionarPorId(Number(id));

    res.json(telefone);
  }

  async inserir(req: Request, res: Response) {

    try {

      const { id_usuario, numero } = req.body;

      const telefone = await this.service.inserir(id_usuario, numero);

      res.status(201).json(telefone);

    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }

  }

  async atualizar(req: Request, res: Response) {

    const { id } = req.params;
    const { numero } = req.body;

    const result = await this.service.atualizar(Number(id), numero);

    res.json(result);
  }

  async deletar(req: Request, res: Response) {

    const { id } = req.params;

    const result = await this.service.deletar(Number(id));

    res.json(result);
  }

}
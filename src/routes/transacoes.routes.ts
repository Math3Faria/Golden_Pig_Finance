import { Router } from "express";
import { TransacaoController } from "../controllers/transacoes.controller";

const transacaoController = new TransacaoController();
const transacaoRoutes = Router();

transacaoRoutes.get("/transacoes", transacaoController.selecionarTodos);
transacaoRoutes.get("/transacoes/:id", transacaoController.selecionarTodos);
transacaoRoutes.post("/transacoes", transacaoController.inserir);
transacaoRoutes.put("/transacoes/:id", transacaoController.atualizar);
transacaoRoutes.delete("/transacoes/:id", transacaoController.deletar);

// EXTRA
transacaoRoutes.get("/transacoes/periodo", transacaoController.buscarPorPeriodo);

export default transacaoRoutes;
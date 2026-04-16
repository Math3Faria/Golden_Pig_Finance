import { Router } from "express";
import { FaturamentoController } from "../controllers/faturamento.controller";

const faturamentoController = new FaturamentoController();
const faturamentoRoutes = Router();

faturamentoRoutes.get("/faturamentos", faturamentoController.selecionarTodos);
faturamentoRoutes.get("/faturamentos/:id", faturamentoController.selecionarPorId);
faturamentoRoutes.post("/faturamentos", faturamentoController.inserir);
faturamentoRoutes.put("/faturamentos/:id", faturamentoController.atualizar);
faturamentoRoutes.delete("/faturamentos/:id", faturamentoController.deletar);

export default faturamentoRoutes;
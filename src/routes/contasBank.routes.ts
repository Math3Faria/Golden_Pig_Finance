import { Router } from "express";
import { ContaController } from "../controllers/contasBank.controller";

const contaController = new ContaController();
const contaRoutes = Router();

contaRoutes.get("/contas", contaController.selecionarTodos);
contaRoutes.get("/contas/:id", contaController.selecionarTodos);
contaRoutes.get("/contas/perfil/:id_perfil", contaController.selecionarPorPerfil);

contaRoutes.post("/contas", contaController.inserir);
contaRoutes.put("/contas/:id", contaController.atualizar);
contaRoutes.delete("/contas/:id", contaController.deletar);

// saldo
contaRoutes.get("/contas/:id/saldo", contaController.obterSaldo);

export default contaRoutes;
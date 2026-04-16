import { Router } from "express";
import { ContaController } from "../controllers/contasBank.controller";

const router = Router();
const controller = new ContaController();

router.get("/contas", controller.selecionarTodos);
router.get("/contas/:id", controller.selecionarTodos);
router.get("/contas/perfil/:id_perfil", controller.selecionarPorPerfil);

router.post("/contas", controller.inserir);
router.put("/contas/:id", controller.atualizar);
router.delete("/contas/:id", controller.deletar);

// saldo
router.get("/contas/:id/saldo", controller.obterSaldo);

export default router;
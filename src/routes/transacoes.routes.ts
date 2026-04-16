import { Router } from "express";
import { TransacaoController } from "../controllers/transacoes.controller";

const router = Router();
const controller = new TransacaoController();

router.get("/transacoes", controller.selecionarTodos);
router.get("/transacoes/:id", controller.selecionarTodos);
router.post("/transacoes", controller.inserir);
router.put("/transacoes/:id", controller.atualizar);
router.delete("/transacoes/:id", controller.deletar);

// EXTRA
router.get("/transacoes/periodo", controller.buscarPorPeriodo);

export default router;
import { Router } from "express";
import { SalarioController } from "../controllers/salario.controller";

const salarioController = new SalarioController();
const salarioRoutes = Router();

salarioRoutes.get("/salarios", salarioController.selecionarTodos);
salarioRoutes.get("/salarios/:id", salarioController.selecionarTodos);
salarioRoutes.post("/salarios", salarioController.inserir);
salarioRoutes.put("/salarios/:id", salarioController.atualizar);
salarioRoutes.patch("/salarios/:id/status", salarioController.atualizarStatus);
salarioRoutes.delete("/salarios/:id", salarioController.deletar);

export default salarioRoutes;
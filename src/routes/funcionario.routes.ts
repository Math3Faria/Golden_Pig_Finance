import { Router } from "express";
import { FuncionarioController } from "../controllers/funcionario.controller";

const funcionarioController = new FuncionarioController();
const funcionarioRoutes = Router();

funcionarioRoutes.get("/funcionarios", funcionarioController.selecionarTodos);
funcionarioRoutes.get("/funcionarios/:id", funcionarioController.selecionarTodos);
funcionarioRoutes.post("/funcionarios", funcionarioController.inserir);
funcionarioRoutes.put("/funcionarios/:id", funcionarioController.atualizar);
funcionarioRoutes.delete("/funcionarios/:id", funcionarioController.deletar);

export default funcionarioRoutes;
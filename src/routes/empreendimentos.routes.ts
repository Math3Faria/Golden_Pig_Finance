import { Router } from "express";
import { EmpreendimentoController } from "../controllers/empreendimentos.controller";

const empreendimentoController = new EmpreendimentoController();
const empreendimentoRoutes = Router();

empreendimentoRoutes.get("/empreendimentos", empreendimentoController.selecionarTodos);
empreendimentoRoutes.get("/empreendimentos/:id", empreendimentoController.selecionarPorId);
empreendimentoRoutes.post("/empreendimentos", empreendimentoController.inserir);
empreendimentoRoutes.put("/empreendimentos/:id", empreendimentoController.atualizar);
empreendimentoRoutes.delete("/empreendimentos/:id", empreendimentoController.deletar);

export default empreendimentoRoutes;
import { Router } from "express";
import { EmpreendimentoController } from "../controllers/empreendimento.controller";

const empreendimentosRoutes = Router();
const controller = new EmpreendimentoController();

empreendimentosRoutes.get("/empreendimentos", controller.selecionarTodos);
empreendimentosRoutes.get("/empreendimentos/:id", controller.selecionarTodos);
empreendimentosRoutes.post("/empreendimentos", controller.inserir);
empreendimentosRoutes.put("/empreendimentos", controller.atualizar);
empreendimentosRoutes.delete("empreendimentos", controller.deletar)

export default empreendimentosRoutes;
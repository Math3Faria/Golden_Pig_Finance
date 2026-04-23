import {Router} from "express";
import { TelefoneController } from "../controllers/telefone.controller";

const telefoneRoutes = Router();
const controller = new TelefoneController();

telefoneRoutes.get("telefones", controller.selecionarTodos);
telefoneRoutes.get("telefones/:id", controller.selecionarTodos);
telefoneRoutes.post("/telefones", controller.inserir);
telefoneRoutes.put("/telefones", controller.atualizar);
telefoneRoutes.delete("/telefones", controller.deletar);

export default telefoneRoutes;
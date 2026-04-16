import { Router } from "express";
import { TelefoneController } from "../controllers/telefones.controller";

const telefoneController = new TelefoneController();
const telefoneRoutes = Router();

telefoneRoutes.get("/telefones", telefoneController.selecionarTodos);
telefoneRoutes.get("/telefones/:id", telefoneController.selecionarPorId);
telefoneRoutes.post("/telefones", telefoneController.inserir);
telefoneRoutes.put("/telefones/:id", telefoneController.atualizar);
telefoneRoutes.delete("/telefones/:id", telefoneController.deletar);

export default telefoneRoutes;
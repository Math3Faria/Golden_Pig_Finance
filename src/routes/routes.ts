import { Router } from "express";

import telefoneRoutes from "./telefone.routes";
import empreendimentoRoutes from "./empreendimentos.routes";
import faturamentoRoutes from "./faturamento.routes";

const router = Router();

router.use("/", telefoneRoutes);
router.use("/", empreendimentoRoutes);
router.use("/", faturamentoRoutes);

export default router;
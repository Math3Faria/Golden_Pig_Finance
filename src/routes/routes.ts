import { Router } from "express";
import categoriaRoutes from "./categoria.routes";
import funcionarioRoutes from "./funcionario.routes";
import salarioRoutes from "./salario.routes";
import contaRoutes from "./contasBank.routes";
import transacaoRoutes from "./transacoes.routes";
import usuarioRoutes  from "./usuario.routes";

const router = Router();

router.use('/', categoriaRoutes);
router.use('/', funcionarioRoutes);
router.use('/', salarioRoutes);
router.use('/', contaRoutes);
router.use('/', transacaoRoutes);
router.use('/', usuarioRoutes)

export default router;


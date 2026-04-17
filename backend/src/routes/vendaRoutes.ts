// routes/vendaRoutes.ts
import { Router } from 'express';
import * as vendaController from '../controllers/vendaController';

const router = Router();

// Rota para registrar uma nova venda
router.post('/', vendaController.registrarVenda);

// Rota para listar o histórico de vendas
router.get('/', vendaController.listarVendas);

export default router;
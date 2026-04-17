// routes/produtoRoutes.ts
import { Router } from 'express';
import * as produtoController from '../controllers/produtoController';

const router = Router();

router.post('/', produtoController.cadastrar);
router.get('/', produtoController.listar);

export default router;
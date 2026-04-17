// controllers/vendaController.ts
import { Request, Response } from 'express';
import * as vendaService from '../services/vendaService';

export const registrarVenda = async (req: Request, res: Response) => {
  try {
    const { valor_total, forma_pagamento, itens } = req.body;

    // Validação simples
    if (!itens || itens.length === 0) {
      return res.status(400).json({ error: "A venda deve ter pelo menos um item." });
    }

    const venda = await vendaService.createVenda(valor_total, forma_pagamento, itens);
    
    return res.status(201).json(venda);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao registrar venda no servidor." });
  }
};

export const listarVendas = async (_req: Request, res: Response) => {
  try {
    const vendas = await vendaService.getVendas();
    return res.json(vendas);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar vendas." });
  }
};
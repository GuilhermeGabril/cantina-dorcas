// controllers/produtoController.ts
import { Request, Response } from 'express';
import * as produtoService from '../services/produtoService';

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const { nome, preco_atual } = req.body;
    const novoProduto = await produtoService.createProduto(nome, preco_atual);
    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao cadastrar produto." });
  }
};

export const listar = async (_req: Request, res: Response) => {
  try {
    const produtos = await produtoService.getAllProdutos();
    return res.json(produtos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};
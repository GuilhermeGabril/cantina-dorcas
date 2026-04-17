
import { prisma } from '../prisma/client'; 

export const createProduto = async (nome: string, preco_atual: number) => {
  return await prisma.produto.create({
    data: {
      nome,
      preco_atual
    }
  });
};

export const getAllProdutos = async () => {
  return await prisma.produto.findMany({
    orderBy: { nome: 'asc' }
  });
};

export const updatePreco = async (id: number, novoPreco: number) => {
  return await prisma.produto.update({
    where: { id },
    data: { preco_atual: novoPreco }
  });
};
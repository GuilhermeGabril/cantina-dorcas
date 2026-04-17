// services/vendaService.ts
import { prisma } from '../prisma/client'; 

interface ItemInput {
  produtoId: number;
  quantidade: number;
  preco_unitario: number;
}

export const createVenda = async (
  valor_total: number,
  forma_pagamento: string,
  itens: ItemInput[]
) => {
  // Usamos $transaction para garantir que a Venda e os Itens sejam criados juntos
  return await prisma.$transaction(async (tx) => {
    const novaVenda = await tx.venda.create({
      data: {
        valor_total,
        forma_pagamento,
        itens: {
          create: itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
          })),
        },
      },
      include: {
        itens: true, // Retorna a venda já com os itens inclusos
      },
    });
    
    return novaVenda;
  });
};

export const getVendas = async () => {
  return await prisma.venda.findMany({
    include: {
      itens: {
        include: { produto: true } // Traz o nome do hambúrguer, guaravita, etc.
      }
    },
    orderBy: { data: 'desc' }
  });
};
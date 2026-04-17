"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendas = exports.createVenda = void 0;
// services/vendaService.ts
const client_1 = require("../prisma/client");
const createVenda = async (valor_total, forma_pagamento, itens) => {
    // Usamos $transaction para garantir que a Venda e os Itens sejam criados juntos
    return await client_1.prisma.$transaction(async (tx) => {
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
exports.createVenda = createVenda;
const getVendas = async () => {
    return await client_1.prisma.venda.findMany({
        include: {
            itens: {
                include: { produto: true } // Traz o nome do hambúrguer, guaravita, etc.
            }
        },
        orderBy: { data: 'desc' }
    });
};
exports.getVendas = getVendas;

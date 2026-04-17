"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreco = exports.getAllProdutos = exports.createProduto = void 0;
const client_1 = require("../prisma/client");
const createProduto = async (nome, preco_atual) => {
    return await client_1.prisma.produto.create({
        data: {
            nome,
            preco_atual
        }
    });
};
exports.createProduto = createProduto;
const getAllProdutos = async () => {
    return await client_1.prisma.produto.findMany({
        orderBy: { nome: 'asc' }
    });
};
exports.getAllProdutos = getAllProdutos;
const updatePreco = async (id, novoPreco) => {
    return await client_1.prisma.produto.update({
        where: { id },
        data: { preco_atual: novoPreco }
    });
};
exports.updatePreco = updatePreco;

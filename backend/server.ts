// server.ts
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from "path"; 


import vendaRoutes from './src/routes/vendaRoutes';
import produtoRoutes from './src/routes/produtoRoutes';

const app = express();

// Middlewares
app.use(cors()); // Permite que seu frontend acesse a API
app.use(express.json()); // Essencial para ler o corpo (body) das requisições POST


// --- CONFIGURAÇÃO PARA SERVIR O FRONTEND ---
// Isso faz o Express entender que os arquivos estão na pasta "../frontend/public"
const publicPath = path.join(__dirname, "../frontend/public");
app.use(express.static(publicPath));

// Definição das Rotas
// Agora todas as rotas de venda começam com /vendas
app.use('/vendas', vendaRoutes);
app.use('/produtos', produtoRoutes);

// Rota coringa para garantir que o index.html seja servido no localhost:5500
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
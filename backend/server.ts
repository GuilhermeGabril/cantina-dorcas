// server.ts atualizado
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from "path"; 
import fs from 'fs';

import vendaRoutes from './src/routes/vendaRoutes';
import produtoRoutes from './src/routes/produtoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

const publicPath = path.join(__dirname, '..', 'frontend', 'public');
if (!fs.existsSync(publicPath)) {
  console.warn(`Static public path not found: ${publicPath}`);
}
console.log(`Serving static files from: ${publicPath}`);

app.use(express.static(publicPath));

app.use('/vendas', vendaRoutes);
app.use('/produtos', produtoRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// A Vercel ignora o app.listen, mas é bom manter para testes locais
const PORT = process.env.PORT || 5500;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
}

export default app; // IMPORTANTE para a Vercel
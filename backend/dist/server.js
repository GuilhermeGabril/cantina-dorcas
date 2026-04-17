"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts atualizado
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const vendaRoutes_1 = __importDefault(require("./src/routes/vendaRoutes"));
const produtoRoutes_1 = __importDefault(require("./src/routes/produtoRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const publicPath = path_1.default.join(__dirname, '..', 'frontend', 'public');
if (!fs_1.default.existsSync(publicPath)) {
    console.warn(`Static public path not found: ${publicPath}`);
}
console.log(`Serving static files from: ${publicPath}`);
app.use(express_1.default.static(publicPath));
app.use('/vendas', vendaRoutes_1.default);
app.use('/produtos', produtoRoutes_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(publicPath, "index.html"));
});
// A Vercel ignora o app.listen, mas é bom manter para testes locais
const PORT = process.env.PORT || 5500;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
exports.default = app; // IMPORTANTE para a Vercel

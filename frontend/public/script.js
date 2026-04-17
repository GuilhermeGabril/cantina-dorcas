const API_URL = 'http://localhost:5500'; // Mude para a URL da Vercel depois
let produtosDisponiveis = [];

// 1. Carregar produtos ao iniciar
async function carregarProdutos() {
    const response = await fetch(`${API_URL}/produtos`);
    produtosDisponiveis = await response.json();
    adicionarNovoCampoProduto(); // Começa com um campo vazio
}

function adicionarNovoCampoProduto() {
    const lista = document.getElementById('lista-produtos');
    const div = document.createElement('div');
    div.className = 'produto-item';
    
    div.innerHTML = `
        <label>Produto</label>
        <select class="select-produto" onchange="atualizarTotal()">
            <option value="">Selecione...</option>
            ${produtosDisponiveis.map(p => `<option value="${p.id}" data-preco="${p.preco_atual}">${p.nome} - R$ ${p.preco_atual}</option>`).join('')}
        </select>
        
        <label>Quantidade</label>
        <input type="number" class="qtd-produto" value="1" min="1" onchange="atualizarTotal()">
    `;
    lista.appendChild(div);
}

function atualizarTotal() {
    let total = 0;
    const itens = document.querySelectorAll('.produto-item');
    
    itens.forEach(item => {
        const select = item.querySelector('.select-produto');
        const qtd = item.querySelector('.qtd-produto').value;
        const preco = select.options[select.selectedIndex]?.dataset.preco;
        
        if (preco) total += parseFloat(preco) * parseInt(qtd);
    });
    
    document.getElementById('valor-total').innerText = `R$ ${total.toFixed(2)}`;
    return total;
}

document.getElementById('btn-adicionar').addEventListener('click', adicionarNovoCampoProduto);

document.getElementById('btn-concluir').addEventListener('click', async () => {
    const itens = [];
    const selects = document.querySelectorAll('.produto-item');
    let valorTotal = atualizarTotal();
    
    selects.forEach(item => {
        const select = item.querySelector('.select-produto');
        const qtd = item.querySelector('.qtd-produto').value;
        const preco = select.options[select.selectedIndex]?.dataset.preco;
        
        if (select.value) {
            itens.push({
                produtoId: parseInt(select.value),
                quantidade: parseInt(qtd),
                preco_unitario: parseFloat(preco)
            });
        }
    });

    const formaPagamento = document.querySelector('input[name="pagamento"]:checked').value;

    const response = await fetch(`${API_URL}/vendas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            valor_total: valorTotal,
            forma_pagamento: formaPagamento,
            itens: itens
        })
    });

    if (response.ok) {
        alert("Venda realizada com sucesso!");
        location.reload(); // Limpa a tela
    } else {
        alert("Erro ao lançar venda.");
    }
});

carregarProdutos();
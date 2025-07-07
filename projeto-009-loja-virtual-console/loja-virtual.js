const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const produtos = [
  {
    id: 1,
    nome: "Notebook Gamer",
    preco: 2500.0,
    categoria: "Informatica",
    estoque: 5,
  },
  {
    id: 2,
    nome: "Mouse Gamer",
    preco: 150.0,
    categoria: "Informatica",
    estoque: 10,
  },
  {
    id: 3,
    nome: "Teclado Mecânico",
    preco: 300.0,
    categoria: "Informatica",
    estoque: 8,
  },
  {
    id: 4,
    nome: "Headset",
    preco: 200.0,
    categoria: "Informatica",
    estoque: 15,
  },
];

const carrinho = [];
const pedidos = [];

function mostrarMenu() {
  console.log("==== LOJA VIRTUAL CONSOLE ====");
  console.log("1. Ver produtos");
  console.log("2. Adicionar ao carrinho");
  console.log("3. Ver carrinho");
  console.log("4. Finalizar pedido");
  console.log("5. Histórico de pedidos");
  console.log("0. Sair");
}

function perguntarOpcao(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

function exibirProdutos() {
  console.log("=== PRODUTOS DISPONÍVEIS ===");
  produtos.forEach((produto) => {
    console.log(`id: ${produto.id}`);
    console.log(`Nome: ${produto.nome}`);
    console.log(`Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`);
    console.log(
      `Categoria: ${produto.categoria} | Estoque: ${produto.estoque} unidades`
    );
    console.log("-".repeat(50));
  });
}

async function adicionarAoCarrinho() {
  exibirProdutos();
  let idUser = await perguntarOpcao("Qual o id? ");
  const verificado = produtos.find((produto) => produto.id == idUser);

  if (!verificado) {
    console.log("Produto não encontrado!");
    return;
  }
  console.log(`Produto selecionado: ${verificado.nome}`);

  let quantidade = await perguntarOpcao("Qual a quantidade de itens? ");
  const quantidadeItem = parseInt(quantidade);

  if (quantidadeItem > verificado.estoque) {
    console.log(
      `Produto sem estoque suficiente \n Total de estoque do item: ${verificado.nome} | estoque: ${verificado.estoque}`
    );
    return;
  }
  const itemExistente = carrinho.find(
    (item) => item.produtoId == verificado.id
  );

  if (itemExistente) {
    itemExistente.quantidade += quantidadeItem;
    console.log(`Quantidade atualizada! Total: ${itemExistente.quantidade}`);
  } else {
    carrinho.push({
      produtoId: verificado.id,
      quantidade: quantidadeItem,
      precoUnitario: verificado.preco,
    });
    console.log(`${verificado.nome} adicionado ao carrinho!`);
  }
}

function exibirCarrinho() {
  if (carrinho.length === 0) {
    console.log("Carrinho vazio!");
    return;
  }

  console.log("\n=== SEU CARRINHO ===");
  let totalGeral = 0;

  carrinho.forEach((itemCarrinho) => {
    const produto = produtos.find((p) => p.id == itemCarrinho.produtoId);

    console.log(`Produto: ${produto.nome}`);
    console.log(`Quantidade: ${itemCarrinho.quantidade}`);
    console.log(
      `Preço unitário: R$ ${itemCarrinho.precoUnitario
        .toFixed(2)
        .replace(".", ",")}`
    );

    const subtotal = itemCarrinho.quantidade * itemCarrinho.precoUnitario;
    console.log(`Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}`);
    console.log("-".repeat(40));

    totalGeral += subtotal;
  });

  console.log(`\n TOTAL GERAL: R$ ${totalGeral.toFixed(2).replace(".", ",")}`);
}

async function finalizarPedido() {
  if (carrinho.length === 0) {
    console.log("Carrinho vazio");
    return;
  }
  console.log("\n=== FINALIZAR PEDIDO ===");
  exibirCarrinho();

  const confirmacao = await perguntarOpcao("Confirmar a compra? (S/N): ");
  if (confirmacao.toLowerCase() !== "s") {
    console.log("Compra cancelada!");
    return;
  }

  carrinho.forEach((itemCarrinho) => {
    const produto = produtos.find((p) => p.id == itemCarrinho.produtoId);
    produto.estoque -= itemCarrinho.quantidade;
  });

  const pedido = {
    id: pedidos.length + 1,
    data: new Date().toLocaleDateString("pt-BR"),
    itens: [...carrinho],
    total: carrinho.reduce(
      (total, item) => total + item.quantidade * item.precoUnitario,
      0
    ),
  };

  pedidos.push(pedido);
  carrinho.length = 0;

  console.log("\nPEDIDO FINALIZADO COM SUCESSO!");
  console.log(
    `Pedido #${pedido.id} - Total: R$ ${pedido.total
      .toFixed(2)
      .replace(".", ",")}`
  );
  console.log("Obrigado pela compra!");
}

function exibirHistorico() {
  if (pedidos.length === 0) {
    console.log("Nenhum pedido realizado ainda!");
    return;
  }

  console.log("\n=== HISTÓRICO DE PEDIDOS ===");

  pedidos.forEach((pedido) => {
    console.log(`\nPedido #${pedido.id} - Data: ${pedido.data}`);
    console.log("Itens:");

    pedido.itens.forEach((item) => {
      const produto = produtos.find((p) => p.id == item.produtoId);
      console.log(
        `  - ${produto.nome} | Qtd: ${
          item.quantidade
        } | Preço: R$ ${item.precoUnitario.toFixed(2).replace(".", ",")}`
      );
    });

    console.log(`Total: R$ ${pedido.total.toFixed(2).replace(".", ",")}`);
    console.log("-".repeat(50));
  });
}

async function main() {
  let continuar = true;
  while (continuar) {
    console.clear();
    mostrarMenu();

    let resposta = await perguntarOpcao("Escolha uma opção: ");

    switch (resposta) {
      case "1":
        exibirProdutos();
        await perguntarOpcao("Pressione ENTER para continuar...");
        break;
      case "2":
        await adicionarAoCarrinho();
        await perguntarOpcao("Pressione ENTER para continuar...");
        break;
      case "3":
        exibirCarrinho();
        await perguntarOpcao("Pressione ENTER para continuar...");
        break;
      case "4":
        await finalizarPedido();
        await perguntarOpcao("Pressione ENTER para continuar...");
        break;
      case "5":
        exibirHistorico();
        await perguntarOpcao("Pressione ENTER para continuar...");
        break;
      case "0":
        console.log("Saindo...");
        continuar = false;
        break;
      default:
        console.log("Opção inválida!");
        await perguntarOpcao("Pressione ENTER para continuar...");
    }
  }
}

main();

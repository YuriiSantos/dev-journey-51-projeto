// ===================================================================
// 1. CAPTURA DOS ELEMENTOS DO DOM
// ===================================================================
const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const btnTodas = document.getElementById("btnTodas");
const btnPendentes = document.getElementById("btnPendentes");
const btnConcluidas = document.getElementById("btnConcluidas");

// ===================================================================
// 2. FUNÇÕES AUXILIARES (localStorage)
// ===================================================================

// Função para salvar tarefas no navegador
function salvarTarefas() {
  const tarefas = [];
  const items = document.querySelectorAll("#listaTarefas li");

  items.forEach(function (item) {
    const texto = item.querySelector("span").textContent;
    const concluida = item
      .querySelector("span")
      .classList.contains("concluida");
    tarefas.push({ texto: texto, concluida: concluida });
  });

  localStorage.setItem("todoTarefas", JSON.stringify(tarefas));
}

// Função para carregar tarefas salvas
function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem("todoTarefas");
  if (tarefasSalvas) {
    const tarefas = JSON.parse(tarefasSalvas);
    tarefas.forEach(function (tarefa) {
      criarElementoTarefa(tarefa.texto, tarefa.concluida);
    });
  }
  atualizarContador();
}

// ===================================================================
// 3. FUNÇÃO PRINCIPAL - CRIAR TAREFA
// ===================================================================

// Função reutilizável para criar elementos de tarefa
function criarElementoTarefa(texto, concluida = false) {
  const novoItem = document.createElement("li");
  const textoElemento = document.createElement("span");
  textoElemento.textContent = texto;

  // Se a tarefa estava marcada como concluída
  if (concluida) {
    textoElemento.classList.add("concluida");
  }

  // Event listener para marcar/desmarcar como concluída
  novoItem.addEventListener("click", function () {
    textoElemento.classList.toggle("concluida");
    salvarTarefas();
    atualizarContador();
  });

  // Criar botão de deletar
  const btnDeletar = document.createElement("button");
  btnDeletar.textContent = "X";
  btnDeletar.addEventListener("click", function () {
    novoItem.remove();
    salvarTarefas();
    atualizarContador();
  });

  // Montar a estrutura e adicionar na lista
  novoItem.appendChild(textoElemento);
  novoItem.appendChild(btnDeletar);
  listaTarefas.appendChild(novoItem);
}

// ===================================================================
// 4. FUNÇÃO DE CONTAGEM
// ===================================================================

// Função para atualizar contador de tarefas
function atualizarContador() {
  const total = document.querySelectorAll("#listaTarefas li").length;
  const concluidas = document.querySelectorAll(
    "#listaTarefas li .concluida"
  ).length;
  const pendentes = total - concluidas;

  const contadorElement = document.getElementById("totalTarefas");
  if (contadorElement) {
    contadorElement.textContent = `${total} tarefas • ${pendentes} pendentes • ${concluidas} concluídas`;
  }
}

// ===================================================================
// 5. FUNÇÃO DE FILTROS
// ===================================================================

// Função para filtrar visualização das tarefas
function filtrarTarefas(filtro) {
  const todasTarefas = document.querySelectorAll("#listaTarefas li");

  todasTarefas.forEach(function (tarefa) {
    const span = tarefa.querySelector("span");
    const estaConcluida = span.classList.contains("concluida");

    if (filtro === "todas") {
      tarefa.style.display = "flex";
    } else if (filtro === "pendentes") {
      tarefa.style.display = estaConcluida ? "none" : "flex";
    } else if (filtro === "concluidas") {
      tarefa.style.display = estaConcluida ? "flex" : "none";
    }
  });
}

// Função para gerenciar botões ativos dos filtros
function ativarFiltro(botaoAtivo) {
  // Remove classe ativa do botão anterior
  document.querySelector(".filtro-ativo").classList.remove("filtro-ativo");
  // Adiciona classe ativa no botão clicado
  botaoAtivo.classList.add("filtro-ativo");
}

// ===================================================================
// 6. EVENT LISTENERS - INTERAÇÕES DO USUÁRIO
// ===================================================================

// Event listener do botão "Adicionar"
btnAdicionar.addEventListener("click", function () {
  const textoTarefa = inputTarefa.value.trim();

  // Validação: não permite tarefa vazia
  if (textoTarefa === "") {
    alert("Digite uma tarefa!");
    return;
  }

  // Criar nova tarefa
  criarElementoTarefa(textoTarefa);

  // Limpar input e atualizar dados
  inputTarefa.value = "";
  salvarTarefas();
  atualizarContador();
});

// Event listener para pressionar Enter no input
inputTarefa.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnAdicionar.click();
  }
});

// Event listeners dos botões de filtro
btnTodas.addEventListener("click", function () {
  filtrarTarefas("todas");
  ativarFiltro(btnTodas);
});

btnPendentes.addEventListener("click", function () {
  filtrarTarefas("pendentes");
  ativarFiltro(btnPendentes);
});

btnConcluidas.addEventListener("click", function () {
  filtrarTarefas("concluidas");
  ativarFiltro(btnConcluidas);
});

// ===================================================================
// 7. INICIALIZAÇÃO - CARREGAR DADOS SALVOS
// ===================================================================

// Carrega tarefas salvas quando a página abre
carregarTarefas();

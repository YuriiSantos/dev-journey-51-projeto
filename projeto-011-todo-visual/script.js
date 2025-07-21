const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

// Pegar os botões de filtro
const btnTodas = document.getElementById("btnTodas");
const btnPendentes = document.getElementById("btnPendentes");
const btnConcluidas = document.getElementById("btnConcluidas");

btnAdicionar.addEventListener("click", function () {
  const textoTarefa = inputTarefa.value;

  if (textoTarefa === "") {
    alert("Digite uma tarefa!");
    return;
  }

  const novoItem = document.createElement("li");
  const textoElemento = document.createElement("span");
  textoElemento.textContent = textoTarefa;

  novoItem.addEventListener("click", function () {
    textoElemento.classList.toggle("concluida");
    salvarTarefas();
    atualizarContador();
  });

  const btnDeletar = document.createElement("button");
  btnDeletar.textContent = "X";
  btnDeletar.addEventListener("click", function () {
    novoItem.remove();
    salvarTarefas();
    atualizarContador();
  });

  novoItem.appendChild(textoElemento);
  novoItem.appendChild(btnDeletar);
  listaTarefas.appendChild(novoItem);

  inputTarefa.value = "";
  salvarTarefas();
  atualizarContador();
});

// ENTER para adicionar
inputTarefa.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnAdicionar.click();
  }
});

// Função salvar
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

// Função carregar
function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem("todoTarefas");
  if (tarefasSalvas) {
    const tarefas = JSON.parse(tarefasSalvas);
    tarefas.forEach(function (tarefa) {
      const novoItem = document.createElement("li");
      const textoElemento = document.createElement("span");
      textoElemento.textContent = tarefa.texto;

      if (tarefa.concluida) {
        textoElemento.classList.add("concluida");
      }

      novoItem.addEventListener("click", function () {
        textoElemento.classList.toggle("concluida");
        salvarTarefas();
        atualizarContador();
      });

      const btnDeletar = document.createElement("button");
      btnDeletar.textContent = "X";
      btnDeletar.addEventListener("click", function () {
        novoItem.remove();
        salvarTarefas();
        atualizarContador();
      });

      novoItem.appendChild(textoElemento);
      novoItem.appendChild(btnDeletar);
      listaTarefas.appendChild(novoItem);
    });
  }
  atualizarContador();
}

// Função para filtrar tarefas
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

// Event listeners dos botões de filtro
btnTodas.addEventListener("click", function () {
  filtrarTarefas("todas");
  document.querySelector(".filtro-ativo").classList.remove("filtro-ativo");
  btnTodas.classList.add("filtro-ativo");
});

btnPendentes.addEventListener("click", function () {
  filtrarTarefas("pendentes");
  document.querySelector(".filtro-ativo").classList.remove("filtro-ativo");
  btnPendentes.classList.add("filtro-ativo");
});

btnConcluidas.addEventListener("click", function () {
  filtrarTarefas("concluidas");
  document.querySelector(".filtro-ativo").classList.remove("filtro-ativo");
  btnConcluidas.classList.add("filtro-ativo");
});

// Função para atualizar contador
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

// Carregar tarefas quando a página abrir
carregarTarefas();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");
const level = document.getElementById("level");

let head = [200, 200];

let body = [
  { x: 180, y: 200 },
  { x: 160, y: 200 },
  { x: 140, y: 200 },
];

let direcao = "right";
let comida = [100, 100];
let pontuacao = 0;

const gameRunning = true;
const gameSpeed = 1;

function desenharJogo() {
  ctx.clearRect(0, 0, 400, 400);

  ctx.fillStyle = "Green";
  ctx.fillRect(head[0], head[1], 20, 20);

  for (let i = 0; i < body.length; i++) {
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(body[i].x, body[i].y, 20, 20);
  }

  ctx.fillStyle = "Red";
  ctx.fillRect(comida[0], comida[1], 20, 20);
}

function moverCobra() {
  for (let i = body.length - 1; i > 0; i--) {
    body[i] = body[i - 1];
  }

  body[0] = { x: head[0], y: head[1] };

  switch (direcao) {
    case "right":
      head[0] += 20;
      break;
    case "left":
      head[0] -= 20;
      break;
    case "down":
      head[1] += 20;
      break;
    case "up":
      head[1] -= 20;
      break;
    default:
      return;
  }
}

function controlarCobra(event) {
  if (event.key === "ArrowUp" && direcao !== "down") {
    direcao = "up";
  } else if (event.key === "ArrowDown" && direcao !== "up") {
    direcao = "down";
  } else if (event.key === "ArrowRight" && direcao !== "left") {
    direcao = "right";
  } else if (event.key === "ArrowLeft" && direcao !== "right") {
    direcao = "left";
  }
}

document.addEventListener("keydown", controlarCobra);

function reiniciarJogo() {
  head = [200, 200];
  body = [
    { x: 180, y: 200 },
    { x: 160, y: 200 },
    { x: 140, y: 200 },
  ];
  direcao = "right";
  comida = [300, 300];
  intervaloGame = setInterval(gameLoop, 200);
}

function gerarNovaComida() {
  let posicaoValida = false;

  while (!posicaoValida) {
    comida[0] = Math.floor(Math.random() * 20) * 20;
    comida[1] = Math.floor(Math.random() * 20) * 20;
    posicaoValida = true;

    if (comida[0] === head[0] && comida[1] === head[1]) {
      posicaoValida = false;
    }

    for (let i = 0; i < body.length; i++) {
      if (comida[0] === body[i].x && comida[1] === body[i].y) {
        posicaoValida = false;
        break;
      }
    }
  }
}

function verificarColisoes() {
  if (head[0] < 0 || head[0] >= 400 || head[1] < 0 || head[1] >= 400) {
    clearInterval(intervaloGame);
    alert("Game Over! Você Bateu Na parede!");

    let jogarNovamente = confirm("Quer jogar novamente?");
    if (jogarNovamente) {
      reiniciarJogo();
    }
  }

  if (head[0] === comida[0] && head[1] === comida[1]) {
    body.push({ x: body[body.length - 1].x, y: body[body.length - 1].y });

    gerarNovaComida();
    pontuacao += 10;
    score.textContent = pontuacao;
  }

  for (let i = 0; i < body.length; i++) {
    if (head[0] === body[i].x && head[1] === body[i].y) {
      clearInterval(intervaloGame);
      alert("Game Over! Você bateu em si mesmo!");

      let jogarNovamente = confirm("Quer jogar novamente?");
      if (jogarNovamente) {
        reiniciarJogo();
      }
    }
  }
}

function gameLoop() {
  moverCobra();
  verificarColisoes();
  desenharJogo();
}

let intervaloGame = setInterval(gameLoop, 150);

desenharJogo();

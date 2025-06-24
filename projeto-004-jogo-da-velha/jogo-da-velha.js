const { log } = require("console");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const posicoes = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let jogada = "❌";
let fimJogo = false;

function mostrarTabuleiro() {
  let pos1;
  if (posicoes[0] === " ") {
    pos1 = "1";
  } else {
    pos1 = posicoes[0];
  }

  let pos2;
  if (posicoes[1] === " ") {
    pos2 = "2";
  } else {
    pos2 = posicoes[1];
  }

  let pos3;
  if (posicoes[2] === " ") {
    pos3 = "3";
  } else {
    pos3 = posicoes[2];
  }

  let pos4;
  if (posicoes[3] === " ") {
    pos4 = "4";
  } else {
    pos4 = posicoes[3];
  }
  let pos5;
  if (posicoes[4] === " ") {
    pos5 = "5";
  } else {
    pos5 = posicoes[4];
  }

  let pos6;
  if (posicoes[5] === " ") {
    pos6 = "6";
  } else {
    pos6 = posicoes[5];
  }

  let pos7;
  if (posicoes[6] === " ") {
    pos7 = "7";
  } else {
    pos7 = posicoes[6];
  }

  let pos8;
  if (posicoes[7] === " ") {
    pos8 = "8";
  } else {
    pos8 = posicoes[7];
  }

  let pos9;
  if (posicoes[8] === " ") {
    pos9 = "9";
  } else {
    pos9 = posicoes[8];
  }

  console.log("\n Tabuleiro jogo da velha");
  console.log(`\n${pos1} | ${pos2} | ${pos3}`);
  console.log("_____________");
  console.log(`\n${pos4} | ${pos5} | ${pos6}`);
  console.log("_____________");
  console.log(`\n${pos7} | ${pos8} | ${pos9}`);
  console.log("_____________");
}

function fazerJogada(posicao) {
  const indice = posicao - 1;
  if (posicoes[indice] === " ") {
    posicoes[indice] = jogada;
    console.log(`Jogada feita na posição ${posicao}`);

    const vencedor = verificarVitoria();
    if (vencedor) {
      console.log(`Parabéns! Jogador ${vencedor} venceu!`);
      mostrarTabuleiro();
      fimJogo = true;
      return;
    }
    jogada = jogada === "❌" ? "🔴" : "❌";
  } else {
    console.log("Posicao ocupada");
  }
}

function verificarVitoria() {
  //verificacao primeira linha na horizontal
  if (
    posicoes[0] !== " " &&
    posicoes[0] === posicoes[1] &&
    posicoes[1] === posicoes[2]
  ) {
    return posicoes[0];
  }

  //verificacao segunda linha na horizontal

  if (
    posicoes[3] !== " " &&
    posicoes[3] === posicoes[4] &&
    posicoes[4] === posicoes[5]
  ) {
    return posicoes[3];
  }

  //verificacao terceira linha na horizontal
  if (
    posicoes[6] !== " " &&
    posicoes[6] === posicoes[7] &&
    posicoes[7] === posicoes[8]
  ) {
    return posicoes[6];
  }

  //verificacao primeira linha na vertical

  if (
    posicoes[0] !== " " &&
    posicoes[0] === posicoes[3] &&
    posicoes[3] === posicoes[6]
  ) {
    return posicoes[0];
  }

  //verificacao segunda linha na vertical

  if (
    posicoes[1] !== " " &&
    posicoes[1] === posicoes[4] &&
    posicoes[4] === posicoes[7]
  ) {
    return posicoes[1];
  }

  //verificacao terceira linha na vertical

  if (
    posicoes[2] !== " " &&
    posicoes[2] === posicoes[5] &&
    posicoes[5] === posicoes[8]
  ) {
    return posicoes[2];
  }

  //verificacao diagonal principal

  if (
    posicoes[0] !== " " &&
    posicoes[0] === posicoes[4] &&
    posicoes[4] === posicoes[8]
  ) {
    return posicoes[0];
  }

  //verificacao diagonal secundaria

  if (
    posicoes[2] !== " " &&
    posicoes[2] === posicoes[4] &&
    posicoes[4] === posicoes[6]
  ) {
    return posicoes[2];
  }

  return null;
}

function iniciarJogo() {
  console.log("Seja bem vindo ao jogo da velha do yuri!");
  function proximaJogada() {
    if (fimJogo) {
      rl.close();
      return;
    }

    mostrarTabuleiro();
    rl.question(
      `Jogador ${jogada}, escolha uma posição do (1-9): `,
      (resposta) => {
        const posicao = parseInt(resposta);

        if (posicao >= 1 && posicao <= 9) {
          fazerJogada(posicao);
          proximaJogada();
        } else {
          console.log("Digite um número de 1 a 9!");
          proximaJogada();
        }
      }
    );
  }
  proximaJogada();
}

iniciarJogo();
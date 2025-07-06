const crypto = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const caracteres = {
  minusculas: "abcdefghijklmnopqrstuvwxyz",
  maiusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeros: "0123456789",
  simbolos: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function gerarSenha() {
  rl.question("Qual o comprimento da senha (6-50):", (senha) => {
    const tamanho = parseInt(senha);
    if (tamanho < 6 || tamanho > 50 || tamanho === "") {
      console.log("Tamanho inválido");
      setTimeout(() => {
        mostrarMenu();
      }, 1000);
      return;
    }
    rl.question("Incluir maiúscula? (s/n)", (maiusculas) => {
      rl.question("Incluir símbolos? (s/n)", (simbolos) => {
        let conjuntoFinal = caracteres.minusculas + caracteres.numeros;
        if (maiusculas === "s" || maiusculas === "S") {
          conjuntoFinal += caracteres.maiusculas;
        }
        if (simbolos === "s" || simbolos === "S") {
          conjuntoFinal += caracteres.simbolos;
        }

        let senhaGerada = "";

        for (let i = 0; i < tamanho; i++) {
          const indiceAleatorio = crypto.randomInt(conjuntoFinal.length);
          const caractereEscolhido = conjuntoFinal[indiceAleatorio];
          senhaGerada += caractereEscolhido;
        }
        console.log(`Senha gerada: ${senhaGerada}`);
        console.log(`Tamanho válido: ${tamanho}`);
        console.log(`Configurações: ${maiusculas} - ${simbolos}`);

        setTimeout(() => {
          mostrarMenu();
        }, 1000);
      });
    });
  });
}

function mostrarOpcoes() {
  console.log("\n ==== GERADOR DE SENHAS ====");
  console.log("1 - Gerar senha");
  console.log("2 - Verificar força da senha");
  console.log("3 - Salvar senha");
  console.log("0 - Sair");
}

function processarOpcao(opcao) {
  switch (opcao) {
    case "1":
      gerarSenha();
      break;
    case "2":
      console.log("Verificando força...");
      mostrarMenu();
      break;
    case "3":
      console.log("Salvando senha...");
      mostrarMenu();
      break;
    case "0":
      console.log("Saindo...");
      rl.close();
      return;
    default:
      console.log("Opção inválida!");
      mostrarMenu();
  }
}

function mostrarMenu() {
  mostrarOpcoes();
  rl.question("Escolha uma opção: ", (opcao) => {
    processarOpcao(opcao);
  });
}

mostrarMenu();

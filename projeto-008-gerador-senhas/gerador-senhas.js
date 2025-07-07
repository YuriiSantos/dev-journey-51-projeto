const crypto = require("crypto");
const readline = require("readline");
const fs = require("fs");

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

function calcularForcaSenha(senha) {
  let pontuacao = 0;

  if (senha.length >= 8) {
    pontuacao += 20;
  }
  if (senha.match(/[A-Z]/)) {
    pontuacao += 15;
  }
  if (senha.match(/[a-z]/)) {
    pontuacao += 15;
  }
  if (senha.match(/[0-9]/)) {
    pontuacao += 15;
  }
  if (senha.match(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/)) {
    pontuacao += 20;
  }
  if (senha.length >= 12) {
    pontuacao += 15;
  }

  let nivel;
  if (pontuacao >= 100) {
    nivel = "Muito Forte";
  } else if (pontuacao >= 85) {
    nivel = "Forte";
  } else if (pontuacao >= 65) {
    nivel = "Média";
  } else if (pontuacao >= 50) {
    nivel = "Fraca";
  } else {
    nivel = "Muito Fraca";
  }

  return { pontuacao, nivel };
}

function verificarForcaSenha() {
  rl.question("Digite a senha para verificar:", (senha) => {
    const resultado = calcularForcaSenha(senha);
    console.log("====== ANÁLISE DE FORÇA ======");
    console.log(`Senha: ${senha}`);
    console.log(`Pontuacao: ${resultado.pontuacao}/100 `);
    console.log(`Nível: ${resultado.nivel}`);
    console.log(`==============================`);
    setTimeout(() => {
      mostrarMenu();
    }, 2000);
  });
}

function salvarSenha() {
  rl.question("Digite a senha para salva:", (senha) => {
    rl.question("Digite uma descrição(Ex: Gmail, Facebook): ", (descricao) => {
      const cipher = crypto.createCipher("aes192", "minha-chave-secreta");
      let encrypted = cipher.update(senha, "utf8", "hex");
      encrypted += cipher.final("hex");
      const novaSenha = {
        descricao: descricao,
        senha: encrypted,
        data: new Date().toLocaleDateString(),
      };

      let senhasSalvas = [];
      if (fs.existsSync("senhas_salvas.json")) {
        const dados = fs.readFileSync("senhas_salvas.json", "utf8");
        senhasSalvas = JSON.parse(dados);
      }
      senhasSalvas.push(novaSenha);

      fs.writeFileSync(
        "senhas_salvas.json",
        JSON.stringify(senhasSalvas, null, 2)
      );
      console.log("Senha salva com sucesso!");

      setTimeout(() => {
        mostrarMenu();
      }, 1000);
    });
  });
}

function listarSenhas() {
  if (!fs.existsSync("senhas_salvas.json")) {
    console.log("Nenhuma senha salva ainda!");
    setTimeout(() => {
      mostrarMenu();
    }, 1500);
    return;
  }

  const dados = fs.readFileSync("senhas_salvas.json", "utf8");
  const senhasSalvas = JSON.parse(dados);

  if (senhasSalvas.length === 0) {
    console.log("Nenhuma senha salva!");
  } else {
    console.log("\n=== SENHAS SALVAS ====");
    senhasSalvas.forEach((item, index) => {
      // Descriptografar senha
      const decipher = crypto.createDecipher("aes192", "minha-chave-secreta");
      let decrypted = decipher.update(item.senha, "hex", "utf8");
      decrypted += decipher.final("utf8");

      console.log(`${index + 1}. ${item.descricao}`);
      console.log(`   Senha: ${decrypted}`);
      console.log(`   Data: ${item.data}\n`);
    });
  }

  setTimeout(() => {
    mostrarMenu();
  }, 3000);
}

function mostrarOpcoes() {
  console.log("\n ==== GERADOR DE SENHAS ====");
  console.log("1 - Gerar senha");
  console.log("2 - Verificar força da senha");
  console.log("3 - Salvar senha");
  console.log("4 - Listar senhas salvas");
  console.log("0 - Sair");
}

function processarOpcao(opcao) {
  switch (opcao) {
    case "1":
      gerarSenha();
      break;
    case "2":
      verificarForcaSenha();
      break;
    case "3":
      salvarSenha();
      break;
    case "4":
      listarSenhas();
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

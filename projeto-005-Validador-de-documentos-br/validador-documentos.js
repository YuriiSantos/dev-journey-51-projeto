const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mostrarMenu() {
  console.log("==== VALIDADOR DE DOCUMENTOS BRASILEIROS ====");
  console.log("1. Validar CPF");
  console.log("2. Validar CNPJ");
  console.log("3. Validar CEP");
  console.log("4. Validar Email");
  console.log("5. Gerar CPF válido");
  console.log("0. Sair");
}

function limparFormatacao(documento) {
  let semPontos = documento.replace(/\./g, "");
  let semTracos = semPontos.replace(/\-/g, "");
  let semEspacos = semTracos.replace(/ /g, "");
  let semBarras = semEspacos.replace(/\//g, "");

  return semBarras;
}

//CPF
function calcularPrimeiroDigito(cpfLimpo) {
  let primeiros9 = cpfLimpo.substring(0, 9);
  let soma = 0;
  let multiplicador = 10;

  for (let i = 0; i < 9; i++) {
    let digito = parseInt(primeiros9[i]);

    soma = soma + digito * multiplicador;

    multiplicador = multiplicador - 1;
  }
  let resto = soma % 11;

  let digitoVerificador;
  if (resto < 2) {
    digitoVerificador = 0;
  } else {
    digitoVerificador = 11 - resto;
  }

  return digitoVerificador;
}

function calcularSegundoDigito(cpfLimpo, primeiroDigito) {
  let primeiros10 = cpfLimpo.substring(0, 9) + primeiroDigito;
  let soma = 0;
  let multiplicador = 11;

  for (let i = 0; i < 10; i++) {
    let digito = parseInt(primeiros10[i]);

    soma = soma + digito * multiplicador;

    multiplicador = multiplicador - 1;
  }
  let resto = soma % 11;

  let digitoVerificador;
  if (resto < 2) {
    digitoVerificador = 0;
  } else {
    digitoVerificador = 11 - resto;
  }

  return digitoVerificador;
}

function validarCPF(cpf) {
  let cpfLimpo = limparFormatacao(cpf);

  if (cpfLimpo.length !== 11) {
    return false;
  }

  if (cpfLimpo === "11111111111" || cpfLimpo === "22222222222") {
    return false;
  }

  let primeiro = calcularPrimeiroDigito(cpfLimpo);
  let segundo = calcularSegundoDigito(cpfLimpo, primeiro);

  let digitosCalculados = "" + primeiro + segundo;
  let digitosInformados = cpfLimpo.substring(9, 11);

  return digitosCalculados === digitosInformados;
}
///////////////////////////////////////////////////////////////

//CNPJ

function calcularPrimeiroDigitoCNPJ(cnpjLimpo) {
  let primeiros12 = cnpjLimpo.substring(0, 12);
  let soma = 0;
  let multiplicadores = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 12; i++) {
    let digito = parseInt(primeiros12[i]);
    soma = soma + digito * multiplicadores[i];
  }

  let resto = soma % 11;

  let digitoVerificador;
  if (resto < 2) {
    digitoVerificador = 0;
  } else {
    digitoVerificador = 11 - resto;
  }

  return digitoVerificador;
}

function calcularSegundoDigitoCNPJ(cnpjLimpo, primeiroDigito) {
  let primeiros13 = cnpjLimpo.substring(0, 12) + primeiroDigito;
  let soma = 0;
  let multiplicadores = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 13; i++) {
    let digito = parseInt(primeiros13[i]);
    soma = soma + digito * multiplicadores[i];
  }

  let resto = soma % 11;

  let digitoVerificador;
  if (resto < 2) {
    digitoVerificador = 0;
  } else {
    digitoVerificador = 11 - resto;
  }

  return digitoVerificador;
}

function validarCNPJ(cnpj) {
  let cnpjLimpo = limparFormatacao(cnpj);

  if (cnpjLimpo.length !== 14) {
    return false;
  }

  let primeiroDigito = cnpjLimpo[0];
  let todosIguais = cnpjLimpo
    .split("")
    .every((digito) => digito === primeiroDigito);

  if (todosIguais) {
    return false;
  }

  let primeiro = calcularPrimeiroDigitoCNPJ(cnpjLimpo);
  let segundo = calcularSegundoDigitoCNPJ(cnpjLimpo, primeiro);

  let digitosCalculados = "" + primeiro + segundo;
  let digitosInformados = cnpjLimpo.substring(12, 14);

  return digitosCalculados === digitosInformados;
}

///////////////////////////////////////////////////////////////

//CEP

function validarCEP(cep) {
  let cepLimpo = limparFormatacao(cep);

  if (cepLimpo.length !== 8) {
    return false;
  }

  let numero = Number(cepLimpo);
  if (isNaN(numero)) {
    return false;
  }

  return true;
}

///////////////////////////////////////////////////////////////

//EMAIL

function validarEmail(email) {
  let partes = email.split("@");
  if (partes.length !== 2) {
    return false;
  }

  let antesDoArroba = partes[0];
  let depoisDoArroba = partes[1];

  if (antesDoArroba === "" || depoisDoArroba === "") {
    return false;
  }

  let partesComPonto = depoisDoArroba.split(".");
  if (partesComPonto.length < 2) {
    return false;
  }

  return true;
}

///////////////////////////////////////////////////////////////

//GERAR CPF//

function formatarCPF(cpf) {
  return (
    cpf.substring(0, 3) +
    "." +
    cpf.substring(3, 6) +
    "." +
    cpf.substring(6, 9) +
    "-" +
    cpf.substring(9, 11)
  );
}

function gerarCPF() {
  let cpfBase = "";
  for (let i = 0; i < 9; i++) {
    let digito = Math.floor(Math.random() * 10);
    cpfBase = cpfBase + digito;
  }

  let primeiro = calcularPrimeiroDigito(cpfBase + "00");
  let segundo = calcularSegundoDigito(cpfBase + "00", primeiro);

  let cpfCompleto = cpfBase + primeiro + segundo;

  return cpfCompleto; // ← Só mudar esta linha!
}
//////////////////////////////////////////////////////////////

function pergunta(texto) {
  return new Promise((resolve) => {
    rl.question(texto, resolve);
  });
}

async function main() {
  let continuar = true;
  while (continuar) {
    console.clear();
    mostrarMenu();

    let resposta = await pergunta("Escolha uma opção:");
    switch (resposta) {
      case "1":
        console.log("\n === VALIDADOR DE CPF ===");
        let cpfUsuario = await pergunta("Digite o CPF: ");
        if (validarCPF(cpfUsuario)) {
          console.log("CPF VÁLIDO!");
        } else {
          console.log("CPF INVÁLIDO");
        }
        break;
      case "2":
        console.log("\n === VALIDADOR DE CNPJ ===");
        let cnpjUsuario = await pergunta("Digite o CNPJ: ");
        if (validarCNPJ(cnpjUsuario)) {
          console.log("CNPJ VÁLIDO!");
        } else {
          console.log("CNPJ INVÁLIDO!");
        }
        break;
      case "3":
        console.log("\n === VALIDADOR DE CEP ===");
        let cepUsuario = await pergunta("Digite o CEP: ");
        if (validarCEP(cepUsuario)) {
          console.log("CEP VÁLIDO!");
        } else {
          console.log("CEP INVÁLIDO!");
        }
        break;
      case "4":
        console.log("\n === VALIDADOR DE EMAIL ===");
        let emailUsuario = await pergunta("Digite o EMAIL: ");
        if (validarEmail(emailUsuario)) {
          console.log("EMAIL VÁLIDO!");
        } else {
          console.log("EMAIL INVÁLIDO!");
        }
        break;
      case "5":
        console.log("\n=== GERADOR DE CPF ===");
        let cpfGerado = gerarCPF();
        console.log("CPF gerado:", cpfGerado);
        console.log(
          "Validação:",
          validarCPF(cpfGerado) ? "VÁLIDO" : "INVÁLIDO"
        );
        break;
      case "0":
        console.log("Saindo....");
        continuar = false;
        break;
      default:
        console.log("Opção Inválida!");
    }
    if (continuar) {
      await pergunta("\nPressione Enter para continuar....");
    }
  }
  rl.close();
}

main();

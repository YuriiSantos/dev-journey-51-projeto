const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let historico = [];

function adicionarHistorico(operacao) {
  console.log("\n Adicionando ao histórico:", operacao); 
  historico.push(operacao);
  if (historico.length > 5) {
    historico.shift();
  }
}

function mostrarHistorico() {
  console.log("\n===== HISTÓRICO =====");
  if (historico.length === 0) {
    console.log("Nenhuma operação realizada.");
  } else {
    historico.forEach((operacao, index) => {
      console.log(`${index + 1} : ${operacao}`);
    })
  }
  console.log("======================");
  iniciar();

}


function fazerSoma() {
  rl.question("\n Digite o primeiro número: ", (num1) => {
    rl.question("\n Digite o segundo número: ", (num2) => {
      const resultado = parseFloat(num1) + parseFloat(num2);
      const operacaoTexto = `${num1} + ${num2} = ${resultado}`;
      console.log(`\n Resultado: ${operacaoTexto}`);
      adicionarHistorico(operacaoTexto);

      iniciar();
    });
  });
}

function fazerSubtracao() {
  rl.question("\n Digite o primeiro valor: ", (num1) => {
    rl.question("\n Digite o segundo valor: ", (num2) => {
      const resultado = parseFloat(num1) - parseFloat(num2);
      const operacaoTexto = `${num1} - ${num2} = ${resultado}`
      console.log(`\n Resultado: ${operacaoTexto}`);
      adicionarHistorico(operacaoTexto);

      iniciar();
    });
  });
}

function fazerMultiplicacao() {
  rl.question("\n Digite o primeiro valor: ", (num1) => {
    rl.question("\n Digite o segundo valor: ", (num2) => {
      const resultado = parseFloat(num1) * parseFloat(num2);
      const operacaoTexto = `${num1} x ${num2} = ${resultado}`
      console.log(`\n Resultado: ${operacaoTexto}`);
      adicionarHistorico(operacaoTexto);

      iniciar();
    });
  });
}

function fazerDivisao() {
  rl.question("\n Digite o primeiro valor: ", (num1) => {
    rl.question("\n Digite o segundo valor: ", (num2) => {
      if (parseFloat(num2) === 0) {
        console.log("\n Erro: Não é possivel dividir por zero!");
      } else {
        const resultado = parseFloat(num1) / parseFloat(num2);
        const operacaoTexto = `${num1} / ${num2} = ${resultado}`
        console.log(`\n Resultado: ${operacaoTexto}`);
        adicionarHistorico(operacaoTexto);
      }

      iniciar();
    });
  });
}

function fazerRaiz() {
  rl.question("\n Digite o valor: ", (num) => {
    const numero = parseFloat(num);

    if (numero < 0) {
      console.log("\n Erro: Não existe raiz de número negativo!");
    } else {
      const resultado = Math.sqrt(numero);
      const operacaoTexto = `√${num} = ${resultado}`;
      console.log(`\n Resultado: ${operacaoTexto}`);
      adicionarHistorico(operacaoTexto);
    }
    iniciar();
  });
}

function fazerExpoente() {
  rl.question("\n Digite o primeiro numero: ", (num1) => {
    rl.question("\n Digite a segunda questao: ", (num2) => {
      const resultado = Math.pow(parseFloat(num1), parseFloat(num2));
      const operacaoTexto = `${num1} elevado a ${num2} = ${resultado}`
      console.log(`\n Resultado: ${operacaoTexto}`);

      adicionarHistorico(operacaoTexto);
      iniciar();
    });
  });
}

function fazerSeno(){
    rl.question("\n Digite o ângulo em graus: ", (graus) => {
        const numero = parseFloat(graus);
        const radianos = numero * Math.PI / 180;

        const resultado = Math.sin(radianos);
        const operacaoTexto = `sen(${graus}º) = ${resultado.toFixed(4)}`
        console.log(`\n Resultado: ${operacaoTexto}`);

        adicionarHistorico(operacaoTexto);
        iniciar();
    })
}

function fazerCosseno(){
    rl.question("\n Digite o valor para cosseno: ",(cosseno) => {
        const numero = parseFloat(cosseno);
        const radianos = numero * Math.PI / 180;

        const resultado = Math.cos(radianos);
        const operacaoTexto = `cos(${cosseno}º) = ${resultado.toFixed(4)}`
        console.log(`\n Resultado: ${operacaoTexto}`);
        adicionarHistorico(operacaoTexto);
        iniciar();
    })
}


function fazerTangente(){
    rl.question("\n Digite o ângulo em graus: ", (graus) =>{

        const radianos = parseFloat(graus) * Math.PI / 180;
        const resultado = Math.tan(radianos);

        const operacaoTexto = `tan(${graus}º) = ${resultado.toFixed(4)}`
        console.log(`\n Resultado: ${operacaoTexto}`)

        adicionarHistorico(operacaoTexto);
        iniciar();
    })
}


function fazerLogaritmo(){
    rl.question("\n Digite o número: ", (num) => {
        const numero = parseFloat(num);

        if (numero <= 0) {
            console.log("\n Erro: Logaritmo só existe para números positivos!");
        } else {
            const resultado = Math.log10(numero);
            const operacaoTexto = `log(${num}) = ${resultado.toFixed(4)}`
            console.log(`\n Resultado: ${operacaoTexto}`);
            adicionarHistorico(operacaoTexto);
        }
        iniciar();
    })
}

function fazerLogaritmoNatural(){
    rl.question("\n Digite o número: ", (num) => {
        const numero = parseFloat(num);

        if (numero <= 0){
            console.log("\n Erro: Logaritmo só existe para números positivos!");
        } else {
            const resultado = Math.log(numero);
            const operacaoTexto = `ln(${num}) = ${resultado.toFixed(4)}`
            console.log(`\n Resultado: ${operacaoTexto}`);

            adicionarHistorico(operacaoTexto);

        }
        iniciar();

    })
}

function mostrarMenu() {
  console.log("\n=== Calculadora ====");
  console.log("1 - Soma");
  console.log("2 - Subtração");
  console.log("3 - Multiplicação");
  console.log("4 - Divisão");
  console.log("5 - Raiz");
  console.log("6 - Elevado");
  console.log("7 - Seno")
  console.log("8 - Cosseno")
  console.log("9 - Tangente")
  console.log("10 - Logaritmo")
  console.log("11 - Logaritmo Natural")
  console.log("12 - Ver Histórico"); 
  console.log("0 - Sair");
  console.log("======================");
}

function iniciar() {
  mostrarMenu();
  rl.question("Escolher uma opção: ", (opcao) => {
    if (opcao === "1") {
      fazerSoma();
    } else if (opcao === "2") {
      fazerSubtracao();
    } else if (opcao === "3") {
      fazerMultiplicacao();
    } else if (opcao === "4") {
      fazerDivisao();
    } else if (opcao === "5") {
      fazerRaiz();
    } else if (opcao === "6") {
      fazerExpoente();
    } else if (opcao === "7") {
      fazerSeno();
    } else if (opcao === "8") {
      fazerCosseno();
    } else if (opcao === "9") {
      fazerTangente();
    } else if (opcao === "10") {
      fazerLogaritmo();
    } else if (opcao === "11") {
      fazerLogaritmoNatural();
    } else if (opcao === "12") {
      mostrarHistorico();
    } else if (opcao === "0") {
      console.log("Tchau!");
      rl.close();
    } else {
      console.log("Opção inválida!");
      iniciar();
    }
  });
}

iniciar(); 
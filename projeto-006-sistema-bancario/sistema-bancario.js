const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const contas = [];
const operacoes = [];
const proximosNumeros = { conta: 1001, operacao: 1 };

function exibirMenu() {
  console.log("\n=== SISTEMA BANCÁRIO ===");
  console.log("1. Criar Conta");
  console.log("2. Depositar");
  console.log("3. Sacar");
  console.log("4. Transferir");
  console.log("5. Consultar Extrato");
  console.log("6. Listar Contas");
  console.log("0. Sair");
  console.log("========================");
}

//Criar conta

function criarConta() {
  rl.question("Digite o nome do titular: ", (nome) => {
    const conta = {
      numero: proximosNumeros.conta++,
      titular: nome,
      saldo: 0,
      ativa: true,
      dataCriacao: new Date().toISOString(),
    };
    contas.push(conta);
    console.log(`\nConta ${conta.numero} criada com sucesso!`);
    setTimeout(() => {
      iniciarSistema();
    }, 1000);
  });
}
/////////////

//Listar contas

function listarContas() {
  if (contas.length === 0) {
    console.log("\nNenhuma conta cadastrada!");
    setTimeout(() => {
      iniciarSistema();
    }, 1000);
  } else {
    console.log("\n=== CONTAS CADASTRADAS ===");
    contas.forEach((conta) => {
      console.log(`Numero conta: ${conta.numero}`);
      console.log(`Titular: ${conta.titular}`);
      console.log(`Saldo: R$ ${conta.saldo.toFixed(2)}`);
      console.log(`Status: ${conta.ativa ? "ativa" : "inativa"}`);
      console.log(`-----------------------------`);
    });
    setTimeout(() => {
      iniciarSistema();
    }, 1000);
  }
}

/////////////

//Depositar

function depositar() {
  if (contas.length === 0) {
    console.log(`\nNenhuma conta cadastrada! Crie uma conta primeiro.`);
    setTimeout(() => {
      iniciarSistema();
    }, 1000);
    return;
  }

  console.log("\n=== CONTAS DISPONÍVEIS ===");
  contas.forEach((conta) => {
    console.log(
      `${conta.numero} - ${conta.titular} (Saldo: R$ ${conta.saldo.toFixed(2)})`
    );
  });

  rl.question("\nDigite o número da conta: ", (numeroConta) => {
    const conta = contas.find((c) => c.numero == numeroConta);
    if (!conta) {
      console.log("Conta não encontrada!");
      setTimeout(() => {
        iniciarSistema();
      }, 1000);
      return;
    }
    rl.question("Digite o valor para depósito: ", (valor) => {
      const valorNumerico = parseFloat(valor);
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        console.log(`Valor inválido! Digite um valor positivo.`);
        setTimeout(() => {
          iniciarSistema();
        }, 1000);
        return;
      }
      conta.saldo += valorNumerico;
      const operacao = {
        id: proximosNumeros.operacao++,
        tipo: "deposito",
        contaOrigem: conta.numero,
        contaDestino: null,
        valor: valorNumerico,
        data: new Date().toISOString(),
        descricao: `Depósito na conta ${conta.numero}`,
      };
      operacoes.push(operacao);

      console.log("\nDepósito realizado com sucesso!");
      console.log(`Novo Saldo: R$ ${conta.saldo.toFixed(2)}`);

      setTimeout(() => {
        iniciarSistema();
      }, 2000);
    });
  });
}

/////////////

//Sacar

function sacar() {
  if (contas.length === 0) {
    console.log("\nNenhuma conta cadastrada! Crie uma conta primeiro.");
    setTimeout(() => {
      iniciarSistema();
    }, 1000);
    return;
  }

  console.log("\n=== CONTAS DISPONÍVEIS ===");
  contas.forEach((conta) => {
    console.log(
      `${conta.numero} - ${conta.titular} (Saldo: R$ ${conta.saldo.toFixed(2)})`
    );
  });

  rl.question("Qual numero da conta? ", (numeroConta) => {
    const conta = contas.find((c) => c.numero == numeroConta);
    if (!conta) {
      console.log("Conta não encontrada!");
      setTimeout(() => {
        iniciarSistema();
      }, 2000);
      return;
    }

    rl.question("Qual o valor para saque? ", (saque) => {
      const valorNumerico = parseFloat(saque);
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        console.log("Valor inválido! Digite um valor positivo.");
        setTimeout(() => {
          iniciarSistema();
        }, 1000);
        return;
      }
      if (valorNumerico > conta.saldo) {
        console.log("Saldo Insuficiente!");
        setTimeout(() => {
          iniciarSistema();
        }, 1000);
        return;
      }
      conta.saldo -= valorNumerico;
      const operacao = {
        id: proximosNumeros.operacao++,
        tipo: "saque",
        contaOrigem: conta.numero,
        contaDestino: null,
        valor: valorNumerico,
        data: new Date().toISOString(),
        descricao: `Saque na conta ${conta.numero}`,
      };
      operacoes.push(operacao);

      console.log("\nSaque realizado com sucesso!");
      console.log(`Novo Saldo: R$ ${conta.saldo.toFixed(2)}`);

      setTimeout(() => {
        iniciarSistema();
      }, 1000);
    });
  });
}

/////////////

//transferir

function transferir() {
  if (contas.length < 2) {
    console.log(`\nSão necessárias pelo menos 2 contas para transferir!`);
    setTimeout(() => {
      iniciarSistema();
    }, 1000);
    return;
  }
  console.log("\n=== CONTAS DISPONÍVEIS ===");
  contas.forEach((conta) => {
    console.log(
      `${conta.numero} - ${conta.titular} (Saldo: R$ ${conta.saldo.toFixed(2)})`
    );
  });
  rl.question("Qual a conta de origem? ", (origem) => {
    const contaOrigem = contas.find((c) => c.numero == origem);
    if (!contaOrigem) {
      console.log("Conta origem não encontrada!");
      setTimeout(() => {
        iniciarSistema();
      }, 1000);
      return;
    }
    rl.question("Digite a conta destino? ", (Destino) => {
      const contaDestino = contas.find((c) => c.numero == Destino);
      if (!contaDestino) {
        console.log("Conta destino não encontrada!");
        setTimeout(() => {
          iniciarSistema();
        }, 1000);
        return;
      }
      if (contaOrigem.numero == contaDestino.numero) {
        console.log("\nNão é possivel transferir para a mesma conta!");
        setTimeout(() => {
          iniciarSistema();
        }, 1000);
        return;
      }
      rl.question("Qual o valor da transferencia? ", (valorTransf) => {
        const valorNumerico = parseFloat(valorTransf);

        if (isNaN(valorNumerico) || valorNumerico <= 0) {
          console.log("Valor invádido! Digite um valor positivo.");
          setTimeout(() => {
            iniciarSistema();
          }, 1000);
          return;
        }

        if (valorNumerico > contaOrigem.saldo) {
          console.log("Saldo insuficiente para a transferencia ");
          setTimeout(() => {
            iniciarSistema();
          }, 1000);
          return;
        }

        contaOrigem.saldo -= valorNumerico;
        contaDestino.saldo += valorNumerico;

        const operacao = {
          id: proximosNumeros.operacao++,
          tipo: "transferencia",
          contaOrigem: contaOrigem.numero,
          contaDestino: contaDestino.numero,
          valor: valorNumerico,
          data: new Date().toISOString(),
          descricao: `Transferencia da conta ${contaOrigem.numero} - ${contaOrigem.titular} 
          \n para a conta ${contaDestino.numero} - ${contaDestino.titular}`,
        };
        operacoes.push(operacao);
        console.log("\nTransferencia realizado com sucesso!");
        console.log(
          `Novo Saldo das contas: \n Origem: ${contaOrigem.numero} - ${
            contaOrigem.titular
          } R$ ${contaOrigem.saldo.toFixed(2)} \n Destino: ${
            contaDestino.numero
          } - ${contaDestino.titular} R$ ${contaDestino.saldo.toFixed(2)} `
        );
        setTimeout(() => {
          iniciarSistema();
        }, 1000);
      });
    });
  });
}

/////////////

//Consultar Extrato

function consultarExtrato() {
  if (contas.length === 0) {
    console.log("\nNenhuma conta cadastrada!");
    setTimeout(() => {
      iniciarSistema();
    }, 1000);
    return;
  }
  if (operacoes.length === 0) {
    console.log("\nNenhuma operação realizada ainda!");
    setTimeout(() => {
      iniciarSistema();
    }, 1000);
    return;
  }
  console.log("\n=== CONTAS DISPONÍVEIS ===");
  contas.forEach((conta) => {
    console.log(
      `${conta.numero} - ${conta.titular} (Saldo: R$ ${conta.saldo.toFixed(2)})`
    );
  });
  rl.question("Qual o número da conta? ", (numero) => {
    const conta = contas.find((c) => c.numero == numero);
    if (!conta) {
      console.log("Conta não encontrada!");
      setTimeout(() => {
        iniciarSistema();
      }, 1000);
      return;
    }

    const operacoesConta = operacoes.filter(
      (op) => op.contaOrigem == numero || op.contaDestino == numero
    );

    if (operacoesConta.length === 0) {
      console.log(`\nA conta ${numero} não possui operações!`);
      setTimeout(() => {
        iniciarSistema();
      }, 1000);
      return;
    }

    console.log(`\n=== EXTRATO DA CONTA ${numero} ===`);
    console.log(`Titular: ${conta.titular}`);
    console.log(`Saldo atual: R$ ${conta.saldo.toFixed(2)}`);
    console.log(`\n--- HISTÓRICO DE OPERAÇÕES ---`);

    operacoesConta.forEach((op) => {
      console.log(`\nID: ${op.id}`);
      console.log(`Tipo: ${op.tipo}`);
      console.log(`Valor: R$ ${op.valor.toFixed(2)}`);
      console.log(`Data: ${new Date(op.data).toLocaleString()}`);
      console.log(`Descrição: ${op.descricao}`);
      console.log(`------------------------`);
    });

    setTimeout(() => {
      iniciarSistema();
    }, 9000);
  });
}

/////////////

function iniciarSistema() {
  exibirMenu();
  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1":
        criarConta();
        break;
      case "2":
        depositar();
        break;
      case "3":
        sacar();
        break;
      case "4":
        transferir();
        break;
      case "5":
        consultarExtrato();
        break;
      case "6":
        listarContas();
        break;
      case "0":
        console.log("Saindo do sistema...");
        rl.close();
        return;
      default:
        console.log("Opção inválida!");
    }
  });
}

iniciarSistema();

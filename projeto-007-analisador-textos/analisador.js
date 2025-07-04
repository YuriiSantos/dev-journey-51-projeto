const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function iniciarAnalisador() {
  console.log("\n ANALISADOR DE TEXTOS");
  console.log("=======================");

  rl.question("Digite seu texto: ", (texto) => {
    console.log("\n ANÁLISE: ");

    const caracteres = texto.length;
    const caracteresEmBranco = texto.replace(/\s/g, "").length;
    const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    const listaPalavras = texto.toLowerCase().trim().split(/\s+/);
    const frequencia = {};
    listaPalavras.forEach((palavra) => {
      frequencia[palavra] = (frequencia[palavra] || 0) + 1;
    });

    const palavrasOrdenadas = Object.entries(frequencia)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const tempoLeitura = Math.ceil(palavras / 200);

    console.log(`Ola mundo! \nCaracteres: ${caracteres}`);
    console.log(`Caracteres (Sem espaços): ${caracteresEmBranco}`);
    console.log(`Total Palavras: ${palavras}`);
    console.log("Frequência de palavras:", frequencia);
    console.log("Top 3 palavras mais comuns:", palavrasOrdenadas);
    console.log(`Tempo de leitura: ${tempoLeitura} minuto(s)`);

    rl.close();
  });
}

iniciarAnalisador();

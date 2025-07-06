const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function iniciarAnalisador() {
  console.log("\n ANALISADOR DE TEXTOS");
  console.log("=======================");

  rl.question("Digite seu texto: ", (texto) => {
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

    const buscar = "mundo";
    const substituir = "planeta";
    const textoModificado = texto.replace(new RegExp(buscar, "gi"), substituir);
    const substituicoes = (texto.match(new RegExp(buscar, "gi")) || []).length;

    const listaPalavrasLimpa = listaPalavras.filter((p) => p.length > 0);
    const palavraMaisLonga = listaPalavrasLimpa.reduce(
      (maior, atual) => (atual.length > maior.length ? atual : maior),
      ""
    );
    const mediaCaracteresPorPalavra = Math.round(caracteresEmBranco / palavras);

    // CONSOLE LOG MELHORADO - Uma única saída organizada
    console.log("\n====================================");
    console.log("           ANALISE COMPLETA         ");
    console.log("====================================");
    console.log(`Caracteres totais: ${caracteres}`);
    console.log(`Caracteres (sem espacos): ${caracteresEmBranco}`);
    console.log(`Total de palavras: ${palavras}`);
    console.log(`Tempo de leitura estimado: ${tempoLeitura} minuto(s)`);
    console.log("------------------------------------");
    console.log(
      `Palavra mais longa: "${palavraMaisLonga}" (${palavraMaisLonga.length} chars)`
    );
    console.log(
      `Media de caracteres por palavra: ${mediaCaracteresPorPalavra}`
    );
    console.log("------------------------------------");
    console.log(
      `Substituicoes "${buscar}" → "${substituir}": ${substituicoes}`
    );
    if (substituicoes > 0) {
      console.log(`Texto modificado: ${textoModificado}`);
    }
    console.log("------------------------------------");
    console.log("Top 3 palavras mais frequentes:");
    palavrasOrdenadas.forEach((item, index) => {
      console.log(`  ${index + 1}. "${item[0]}" - ${item[1]} vez(es)`);
    });
    console.log("====================================\n");

    rl.close();
  });
}

iniciarAnalisador();

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let livros = [];
let usuarios = [];
let emprestimos = [];


function cadastrarLivro(){
    rl.question("Digite o título do livro: ", (titulo) => {
        rl.question("Digite o autor: ", (autor) => {
            rl.question("Digite o ISBN: ", (isbn) => {
                rl.question("Digite o ano de publicação: ", (ano) => {
                    const livro = { 
                        id: livros.length + 1,
                        titulo: titulo,
                        autor: autor,
                        isbn: isbn,
                        ano: parseInt(ano),
                        disponivel: true
                    };
                    livros.push(livro);
                    console.log("✅ Livro cadastrado com sucesso!");
                    iniciar();
                })
            })
        })
    })
}

function listarLivros (){
    if (livros.length === 0){
        console.log("Nenhum livro cadastrado.");
        iniciar();
    } else {
        console.log("====== LISTA DE LIVROS ======")
        livros.forEach((livro, index) => {
            console.log(`${index+1}.${livro.titulo}`);
            console.log(` Autor: ${livro.autor}`);
            console.log(` ISBN: ${livro.isbn}`);
            console.log(` Ano: ${livro.ano}`);
            console.log(` Status: ${livro.disponivel ? "Disponível" : "Emprestado"}`);
            console.log("==============================")     
        })
        iniciar();
    }
}


function cadastrarUsuario(){
    rl.question("Digite o nome: ", (nome) => {
        rl.question("Digite o email: ", (email) => {
            rl.question("Digite o telefone: ", (telefone) =>{
                const usuario = { 
                    id: usuarios.length + 1,
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    ativo: true
                };
                usuarios.push(usuario);
                console.log("✅ Usuario cadastrado com sucesso!");
                iniciar();
            })
        })
    })
}


function listarUsuarios(){
    if (usuarios.length === 0){
        console.log("Lista de usuários vazia!");
        iniciar();
    }else{
    console.log("====== LISTA DE USUARIOS ======")
        usuarios.forEach((usuario, index) => {
            console.log(`${index+1}.${usuario.nome}`);
            console.log(` Email: ${usuario.email}`);
            console.log(` Telefone: ${usuario.telefone}`);
            console.log(` Status: ${usuario.ativo ? "Ativo":"Inativo"}`);
            console.log("==============================")     
        })
        iniciar();
    }
}


function mostrarMenu () {
    console.log("\n ==== SISTEMA DE BIBLIOTECA ====");
    console.log("1 - Cadastrar Livro");
    console.log("2 - Cadastrar Usuario");
    console.log("3 - Listar Livros");
    console.log("4 - Listar Usuários");
    console.log("0 - Sair")
};


function iniciar () {
    mostrarMenu();
        rl.question("\n Escolha uma das opções: ", (opcao) => {
            switch(opcao){
                case "1":
                    cadastrarLivro();
                    break;
                case "2":
                    cadastrarUsuario();
                    break;
                case "3":
                    listarLivros();
                    break;
                case "4":
                    listarUsuarios();
                    break;
                case "0":
                    console.log("Saindo do sistema...");
                    rl.close();
                    break;
                default:
                    console.log("Opção inválida!");
                    iniciar();
            }
    })
};


iniciar();
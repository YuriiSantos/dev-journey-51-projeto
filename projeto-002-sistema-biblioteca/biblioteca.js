const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let usuarios = [
    { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "11999999999", ativo: true },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "11888888888", ativo: true }
];

let livros = [
    { id: 1, titulo: "Clean Code", autor: "Robert Martin", isbn: "123456", ano: 2008, disponivel: false },
    { id: 2, titulo: "JavaScript", autor: "Douglas Crockford", isbn: "789012", ano: 2008, disponivel: false },
    { id: 3, titulo: "Spring Boot", autor: "Craig Walls", isbn: "345678", ano: 2018, disponivel: true }
];
let emprestimos = [
    {
        id: 1,
        usuarioId: 1,
        livroId: 1,
        dataEmprestimo: new Date('2024-06-01'),
        status: "ativo"
    },
    {
        id: 2,
        usuarioId: 2,
        livroId: 2,
        dataEmprestimo: new Date('2024-06-10'),
        status: "ativo"
    },
    {
        id: 3,
        usuarioId: 1,
        livroId: 3,
        dataEmprestimo: new Date('2024-05-20'),
        status: "devolvido"
    }
];
function cadastrarLivro() {
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
            disponivel: true,
          };
          livros.push(livro);
          console.log("✅ Livro cadastrado com sucesso!");
          iniciar();
        });
      });
    });
  });

}

function listarLivros() {
  if (livros.length === 0) {
    console.log("Nenhum livro cadastrado.");
    iniciar();
  } else {
    console.log("====== LISTA DE LIVROS ======");
    livros.forEach((livro, index) => {
      console.log(`${index + 1}.${livro.titulo}`);
      console.log(` Autor: ${livro.autor}`);
      console.log(` ISBN: ${livro.isbn}`);
      console.log(` Ano: ${livro.ano}`);
      console.log(` Status: ${livro.disponivel ? "Disponível" : "Emprestado"}`);
      console.log("==============================");
    });
    iniciar();
  }
}

function cadastrarUsuario() {
  rl.question("Digite o nome: ", (nome) => {
    rl.question("Digite o email: ", (email) => {
      rl.question("Digite o telefone: ", (telefone) => {
        const usuario = {
          id: usuarios.length + 1,
          nome: nome,
          email: email,
          telefone: telefone,
          ativo: true,
        };
        usuarios.push(usuario);
        console.log("✅ Usuario cadastrado com sucesso!");
        iniciar();
      });
    });
  });
}

function listarUsuarios() {
  if (usuarios.length === 0) {
    console.log("Lista de usuários vazia!");
    iniciar();
  } else {
    console.log("====== LISTA DE USUARIOS ======");
    usuarios.forEach((usuario, index) => {
      console.log(`${index + 1}.${usuario.nome}`);
      console.log(` Email: ${usuario.email}`);
      console.log(` Telefone: ${usuario.telefone}`);
      console.log(` Status: ${usuario.ativo ? "Ativo" : "Inativo"}`);
      console.log("==============================");
    });
    iniciar();
  }
}

function realizarEmprestimo() {
  rl.question("Digite o Id do Usuario: ", (id) => {
    const numeroId = parseInt(id);

    const usuario = usuarios.find((c) => c.id === numeroId);

    if (usuario) {
      console.log("Usuario Encontrado: ", usuario.nome);
      rl.question("Qual o id do livro? ", (idLivro) => {
        const numeroIdLivro = parseInt(idLivro);
        const livro = livros.find((c) => c.id === numeroIdLivro);

        if (livro) {
          if (livro.disponivel) {
            console.log("Livro Dísponivel!");

            const emprestimo = {
              id: emprestimos.length + 1,
              usuarioId: numeroId,
              livroId: numeroIdLivro,
              dataEmprestimo: new Date(),
              status: "ativo",
            };
            emprestimos.push(emprestimo);

            livro.disponivel = false;

            console.log("Emprestimo realizado!");
          } else {
            console.log("Livro ja está emprestado!");
          }
        } else {
          console.log("Livro não encontrado! ");
        }
        iniciar();
      });
    } else {
      console.log("Usuario não existe!");
    }
    iniciar();
  });
}

function listarEmprestimo(){
    if (emprestimos.length === 0) {
        console.log("Lista de emprestimos vazia!");
    } else {
        console.log("====== LISTA DE EMPRESTIMOS ======");
        
        emprestimos.forEach((emprestimo, index) => {
            const usuario = usuarios.find(u => u.id === emprestimo.usuarioId);
            const livro = livros.find(l => l.id === emprestimo.livroId);


            console.log(`${index + 1}. Emprestimo #${emprestimo.id}`);
            console.log(` Usuario: ${usuario.nome}`);
            console.log(` Livro: ${livro.titulo}`);
            console.log(` Status: ${emprestimo.status}`);
            console.log("==============================");
        });
    }
    iniciar();
}


function devolverLivro(){
    const emprestimosAtivos = emprestimos.filter(e => e.status === "ativo");

    if (emprestimosAtivos.length === 0) {
        console.log("Não há empréstimos ativos para devolver!");
        iniciar();
        return;
    }

    console.log("====== EMPRÉSTIMOS ATIVOS ======");
    emprestimosAtivos.forEach((emprestimo, index) =>{
        const usuario = usuarios.find(u => u.id === emprestimo.usuarioId);
        const livro = livros.find(l => l.id === emprestimo.livroId);

        console.log(`${index + 1}. Emprestimo #${emprestimo.id}`);
        console.log(`   Usuario: ${usuario.nome}`);
        console.log(`   Livro: ${livro.titulo}`);
        console.log("==============================");
    });

    rl.question("Digite o ID do empréstimo para devolver: ", (id) => {
        const idEmprestimo = parseInt(id);

        const emprestimo = emprestimos.find(e => e.id === idEmprestimo && e.status === "ativo")

        if (emprestimo){
            const livro = livros.find(l => l.id === emprestimo.livroId);

            emprestimo.status = "devolvido";
            livro.disponivel = true;

            console.log("Livro devolvido com sucesso!");
            console.log(`${livro.titulo}  Agora esta disponivel novamente` );
        } else {
            console.log("Emprestimo não encontrado ou ja foi devolvido!")
        }
        iniciar();
        
    })


}


function mostrarMenu() {
  console.log("\n ==== SISTEMA DE BIBLIOTECA ====");
  console.log("1 - Cadastrar Livro");
  console.log("2 - Cadastrar Usuario");
  console.log("3 - Listar Livros");
  console.log("4 - Listar Usuários");
  console.log("5 - Realizar Empréstimo");
  console.log("6 - Listar Emprestimos")
  console.log("7 - Devolver Livro")
  console.log("0 - Sair");
}









function iniciar() {
  mostrarMenu();
  rl.question("\n Escolha uma das opções: ", (opcao) => {
    switch (opcao) {
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
      case "5":
        realizarEmprestimo();
        break;
      case "6":
        listarEmprestimo();
        break;
      case "7":
        devolverLivro();
        break;
      case "0":
        console.log("Saindo do sistema...");
        rl.close();
        break;
      default:
        console.log("Opção inválida!");
        iniciar();
    }
  });
}

iniciar();

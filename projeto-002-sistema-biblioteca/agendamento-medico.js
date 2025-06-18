const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let medicos = [];
let pacientes = [];
let consultas = [];

function cadastrarMedico(){
    rl.question("Qual nome do medico? ", (nome) => {
        rl.question("Qual a especialidade? ", (espec) => {

            const medico = {
                id : medicos.length + 1,
                nome: nome,
                especialidade: espec,
                disponivel: true,
            };
            medicos.push(medico);
            console.log("Medico cadastrado com sucessoo!");
            iniciar();

        })
    })
}

function listarMedicos(){
    if (medicos.length === 0){
        console.log("Nenhum médico cadastrado! ");
        iniciar();
        return;
    } else {
        console.log("===== LISTA DE MÉDICOS =====");
        medicos.forEach((medico, index) => {
            console.log(`${index + 1}`);
            console.log(`Medico: ${medico.nome}`);
            console.log(`Especialidade: ${medico.especialidade}`);
            console.log(`Disponivel: ${medico.disponivel}`);
            console.log("==============================");             
        });
        iniciar();
    }
}

function cadastrarPaciente(){
    rl.question("Qual o nome do paciente? ", (nome) => {
        rl.question("Qual o telefone? ", (telefone) => {
            const paciente = {
                id: pacientes.length + 1,
                nome: nome,
                telefone: telefone,
                ativo: true
            }
            pacientes.push(paciente);
            console.log("Paciente cadastrado com sucesso!");
            iniciar();
        })
    })
}

function listarPaciente(){
    if (pacientes.length === 0){
        console.log("Nenhum paciente cadastrado!");
        iniciar();
        return;
    } else {
        console.log("===== LISTA DE PACIENTES =====");
        pacientes.forEach((paciente, index) => {
            console.log(`${index + 1}.`);
            console.log(`Nome: ${paciente.nome}`);
            console.log(`Telefone: ${paciente.telefone}`);
            console.log(`Ativo: ${paciente.ativo}`);
            console.log("==============================");
        }) 
        iniciar();             
    }
}


function mostrarMenu(){
    console.log("\n ==== SISTEMA CLÍNICA MÉDICA ====");
    console.log("1 - Cadastrar Médico");
    console.log("2 - Cadastrar Paciente");
    console.log("3 - Listar Médicos");
    console.log("4 - Listar Pacientes");
    console.log("0 - Sair")
}

function iniciar(){
    mostrarMenu();
    rl.question("Escolha uma opção? ", (opcao) => {
        switch(opcao){
            case "1" :
                cadastrarMedico();
                break;
            case "2" :
                cadastrarPaciente();
                break;
            case "3" :
                listarMedicos();
                break;
            case "4" :
                listarPaciente();
                break;
            case "0" :
                console.log("Saindo do sistema....");
                rl.close();
                break;
            default:
                console.log("Opção invalida!");
                iniciar();
        }
    });
}


iniciar();
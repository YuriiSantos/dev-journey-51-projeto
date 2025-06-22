const { log } = require("console");
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
            console.log("Medico cadastrado com sucesso!");
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
            console.log(`${index + 1}. ${medico.nome}`);
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
            console.log(`${index + 1}.${paciente.nome}`);
            console.log(`Nome: ${paciente.nome}`);
            console.log(`Telefone: ${paciente.telefone}`);
            console.log(`Ativo: ${paciente.ativo}`);
            console.log("==============================");
        }) 
        iniciar();             
    }
}

function agendarConsulta(){
    rl.question("Qual id do paciente?", (id) =>{
       const numeroId = parseInt(id);

       const paciente = pacientes.find((c) => c.id === numeroId)

       if (paciente){
        console.log("Paciente cadastrado: ", paciente.nome);
        rl.question("Qual o Id do Medico? ", (idMedico) => {
            const numeroIdMedico = parseInt(idMedico);
            const medico = medicos.find((c) => c.id === numeroIdMedico);

            if (medico) {
                if(medico.disponivel) {
                    console.log("Medico Disponivel");
                    
                    const consulta = {
                        id: consultas.length + 1,
                        pacienteId: numeroId,
                        medicoId: numeroIdMedico,
                        dataConsulta: new Date(),
                        status: "ativo"
                    };

                    consultas.push(consulta);

                    medico.disponivel = false;

                    console.log("Consulta Realizada!");
                    iniciar();
                } else { 
                    console.log("Medico nao disponivel.") 
                    iniciar();
                }
            } else {
                console.log("Medico Nao encontrado")
                iniciar();
            }
        })
       } else {
        console.log("Paciente nao cadastrad0!")
        iniciar();
       }
    })
}

function listarConsultas(){
    if (consultas.length === 0){
        console.log("Nenhuma consulta encontrada!");
        iniciar();
        return;
    } else {
        console.log("===== LISTA DE CONSULTAS =====");
        consultas.forEach((consulta, index) => {
            const medico = medicos.find(u => u.id === consulta.medicoId);
            const paciente = pacientes.find(l => l.id === consulta.pacienteId);

            console.log(`${index + 1}. Consulta #${consulta.id}`);
            console.log(` Paciente: ${paciente.nome}`);
            console.log(` Medico: ${medico.nome}`);
            console.log(` Status: ${consulta.status}`);
            console.log("==============================");

        });
    }
    iniciar()
}


function finalizarConsultas(){
    const consultasAtivas = consultas.filter(e => e.status === "ativo");
    
    if (consultasAtivas.length === 0) {
        console.log("Não há consultas ativas!");
        iniciar();
        return;
    }
    console.log("=========== CONSULTAS ATIVAS ===========")
};

function mostrarMenu(){
    console.log("\n ==== SISTEMA CLÍNICA MÉDICA ====");
    console.log("1 - Cadastrar Médico");
    console.log("2 - Cadastrar Paciente");
    console.log("3 - Listar Médicos");
    console.log("4 - Listar Pacientes");
    console.log("5 - Agendar Consulta")
    console.log("6 - Listar Consultas")
    console.log("7 - Finalizar Consultas")
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
            case "5" :
                agendarConsulta();
                break;
            case "6":
                listarConsultas();
                break;
            case "7":
                finalizarConsultas();
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
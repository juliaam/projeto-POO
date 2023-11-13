import nReadlines from "n-readlines";
import prompt from "prompt-sync";
const input = prompt();

// exemplo de uso
const pilotos = new nReadlines("arquivos/pilotos.txt");
const aerovias = new nReadlines("arquivos/aerovias.txt");
const aeronaves = new nReadlines("arquivos/aeronaves.txt");

let buf;
let linha;

class Piloto {
  #matricula;
  #nome;
  #habilitacaoAtiva;

  constructor(matricula, nome, habilitacaoAtiva) {

    this.#matricula = matricula;
    this.#nome = nome;
    this.#habilitacaoAtiva = habilitacaoAtiva;
  }

  get matricula() {
    return this.#matricula;
  }
  get nome() {
    return this.#nome;
  }
  get habilitacaoAtiva() {
    if (this.#habilitacaoAtiva) {
      return "ativo";
    }
    return "inativo";
  }
  returnInfo() {
    return `Piloto de matrícula: ${this.matricula}, nome: ${this.nome}, estado da habilitação: ${this.habilitacaoAtiva}`;
  }
}
class ServicoPilotos extends Piloto {
  #pilotos = [];

  get pilotos() {
    return this.#pilotos.values();
  }

  adicionarPiloto(piloto) {
    return this.#pilotos.push(piloto);
  }
  recupera(matricula) {
    // função que acha o piloto pelo find, e, caso tenha piloto, ele irá retorná-lo
    const piloto = this.#pilotos.find(
      (piloto) => piloto.matricula === matricula
    );
    if (piloto) {
      return `Piloto de matrícula: ${piloto.matricula}, nome: ${piloto.nome} e estado da habilitação: ${piloto.habilitacaoAtiva}`;
    }
    return "Piloto não encontrado, digite a matrícula corretamente!";
  }
  todos() {
    // função que retorna todos os pilotos
    let string = "";
    for (const piloto of this.pilotos) {
      string += `${piloto.returnInfo()} \n`;
    }
    return string;
  }
}

class Aeronave {
  #prefixo;
  #velocidadeCruzeiro;
  #autonomia;

  constructor(prefixo, velocidadeCruzeiro, autonomia) {
    if (velocidadeCruzeiro < 0) {
      throw new Error("Velocidade inválida, digite novamente");
    }
    if (autonomia < 0) {
      throw new Error("Autonomia inválida, digite novamente");
    }
    this.#prefixo = prefixo;
    this.#velocidadeCruzeiro = velocidadeCruzeiro;
    this.#autonomia = autonomia;
  }
  get prefixo() {
    return this.#prefixo;
  }
  get velocidadeCruzeiro() {
    return this.#velocidadeCruzeiro;
  }
  get autonomia() {
    return this.#autonomia;
  }
  returnInfo() {
    return `Aeronave - prefixo: ${this.prefixo}, velocidade de cruzeiro: ${this.velocidadeCruzeiro}km,
     autonomia: ${this.autonomia}km`;
  }
}

class AeronaveParticular extends Aeronave {
  #respManutencao;

  constructor(prefixo, velocidadeCruzeiro, autonomia, respManutencao) {
    super(prefixo, velocidadeCruzeiro, autonomia);
    this.#respManutencao = respManutencao;
  }
  get respManutencao() {
    return this.#respManutencao;
  }
  returnInfo() {
    return `Aeronave - prefixo: ${this.prefixo}, velocidade de cruzeiro: ${this.velocidadeCruzeiro}km,
     autonomia: ${this.autonomia}km, responsável pela manutenção: ${this.respManutencao}`;
  }
}

class AeronaveComercial extends Aeronave {
  #nomeCIA;

  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA) {
    this.#nomeCIA = nomeCIA;
    super(prefixo, velocidadeCruzeiro, autonomia);
  }
}

class AeronavePassageiros extends AeronaveComercial {
  #maxPassageiros;

  constructor(nomeCIA, prefixo, velocidadeCruzeiro, autonomia, maxPassageiros) {
    this.#maxPassageiros = maxPassageiros;
    super(nomeCIA, prefixo, velocidadeCruzeiro, autonomia);
  }
}

class AeronaveCarga extends AeronaveComercial {
  #pesoMax;

  constructor(nomeCIA, prefixo, velocidadeCruzeiro, autonomia, pesoMax) {
    this.#pesoMax = pesoMax;
    super(nomeCIA, prefixo, velocidadeCruzeiro, autonomia);
  }
}

class ServicoAeronaves extends Aeronave {
  #aeronaves = [];

  get aeronaves() {
    return this.#aeronaves.values();
  }

  adicionarAeronave(aeronave) {
    return this.#aeronaves.push(aeronave);
  }
  todas() {
    // função que retorna todas as aeronaves
    let string = "";
    for (const aeronave of this.aeronaves) {
      string += `${aeronave.returnInfo()} \n`;
    }
    return string;
  }
}

class Aerovia {
  #id;
  #origem;
  #destino;
  #tamanho;

  constructor(id, origem, destino, tamanho) {
    this.#id = id;
    this.#origem = origem;
    this.#destino = destino;
    this.#tamanho = tamanho;
  }

  get id() {
    return this.#id;
  }
  get origem() {
    return this.#origem;
  }

  get destino() {
    return this.#destino;
  }

  get tamanho() {
    return this.#tamanho;
  }

  returnInfo() {
    return `Aerovia - id: ${this.id}, origem: ${this.origem},
     destino: ${this.destino}, tamanho: ${this.tamanho}km`;
  }
}

class ServicoAerovias extends Aerovia {
  #aerovias = [];

  adicionarAerovia(aerovia) {
    return this.#aerovias.push(aerovia);
  }
  recupera(origem, destino) {
    const aerovia = this.#aerovias.find(
      (aerovia) => aerovia.origem === origem && aerovia.destino === destino
    );
    return aerovia.returnInfo();
  }
}

// exemplo de uso

// criados os serviços
const servicoPiloto = new ServicoPilotos();
const servicoAeronave = new ServicoAeronaves();
const servicoAerovia = new ServicoAerovias();

// leitura dos arquivos, e toda vez a função vai adicionar um pertencente a classe, e automaticamente adicionar ao serviço também
while ((buf = pilotos.next())) {
  // leitura do arquivo de pilotos
  linha = buf.toString("utf8");
  linha = linha.split(",");

  let habilitacaoAtiva = linha[2].trim() === "ativo" ? true : false; // tirar os espaços e transformar em booleano
  const piloto = new Piloto(linha[0], linha[1].trim(), habilitacaoAtiva); // criar um novo piloto e remover os espaços em branco
  servicoPiloto.adicionarPiloto(piloto); // adicionar piloto ao serviço
}

while ((buf = aeronaves.next())) {
  // leitura do arquivo de aerovias
  linha = buf.toString("utf8");
  linha = linha.split(",");
  const aeronave = new AeronaveParticular( // atribuição dos valores
    linha[0].trim(),
    Number(linha[1].trim()),
    Number(linha[2].replace("\r", "").trim()),
    linha[3].trim()
  ); // nesse caso foram adicionadas aeronaves particulares, mas podem ser adicionadas outras
  servicoAeronave.adicionarAeronave(aeronave); //
}

while ((buf = aerovias.next())) {
  // leitura do arquivo de aerovias
  linha = buf.toString("utf8");
  linha = linha.split(",");
  const aerovia = new Aerovia( // atribuição dos valores
    linha[0].trim(),
    linha[1].trim(),
    linha[2].trim(),
    Number(linha[3].replace("\r", ""))
  );
  servicoAerovia.adicionarAerovia(aerovia);
}

while (!fim) {
  let fim = false;
  let string =
    "1- Listar pilotos \n 2-Adicionar piloto\n 3-Listar aeronaves \n 4-Adicionar aeronave \n 5-Listar aerovias \n 6- Adicionar aerovia \n 0-sair";
  console.log(string)
  const inputReceived = input("Insira a opção selecionada: ");
  if (inputReceived == 0) {
    fim = true;
  }
  switch(inputReceived) {
    case '0':
      fim = true
      break
    case '1':
      console.log(servicoPiloto.todos())
      break
    case '2':
      console.log('Digite a matrícula, nome, e o estado da habilitação (ativo/inativo)')
      console.log(servicoPiloto.adicionarPiloto(inputReceived))
      break
    case '3':
      console.log(servicoAeronave.todas())
      break
    case '4':
      const inputAeronave = input('')
      console.log('1- Aeronave particular \n 2- Aeronave passageiro \n 3- Aeronave Carga \n 0 - voltar')
      if(inputAeronave == '1') {
        console.log('Digite o prefixo, velocidade do cruzeiro(km), autonomia(km) e o responsável pela manutenção') // particular
        console.log(servicoAeronave.adicionarAeronave(inputAeronave))
      }
      if(inputAeronave == '2') {
        console.log('Digite o prefixo, velocidade do cruzeiro(km), autonomia(km), companhia aérea e o máximo de passageiros') // aeronave passageiro
        console.log(servicoAeronave.adicionarAeronave(inputAeronave))
      }
      if(inputAeronave == '3') {
        console.log('Digite o prefixo, velocidade do cruzeiro(km), autonomia(km), companhia aérea e o peso máximo') // aeronave carga
        console.log(servicoAeronave.adicionarAeronave(inputAeronave))
      }
      break  
    case '5':
      console.log(servicoAerovia.todas())
      break  
    case '6':
      console.log('Digite o id, origem, destino e o tamanho')
      console.log(servicoAerovia.adicionarAerovia(inputReceived))
      break  
  }
}

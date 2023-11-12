import nReadlines from "n-readlines";
// import { validate } from 'bycontract'

let arq = new nReadlines("pilotos.txt");
let buf;
let linha;
let dados = [];

// arq.next() // pular a primeira linha

// while(buf = arq.next()){
//     linha = buf.returnInfo('utf8')
//     linha = linha.split(',')
//     dados = [{matricula: linha[0], nome:linha[1], habilitacaoAtiva: linha[2].replace('\r', '')}]
//     console.log(dados[0])
// }

class Piloto {
  #matricula;
  #nome;
  #habilitacaoAtiva;

  constructor(matricula, nome, habilitacaoAtiva) {
    // validate(arguments, ['string', 'string', 'string'])

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
    return this.#habilitacaoAtiva;
  }
  returnInfo() {
    return `Piloto de matrícula: ${this.matricula}, nome: ${this.nome} e estado da habilitação: ${this.habilitacaoAtiva}`;
  }
}
class ServicoPilotos extends Piloto {
  #pilotos = [];

  get pilotos() {
    return this.#pilotos.values();
  }

  adicionarPiloto(piloto) {
    // validate(arguments, ['Piloto'])
    return this.#pilotos.push(piloto);
  }
  recupera(matricula) {
    // função que acha o piloto pelo find, e, caso tenha piloto, ele irá retorná-lo
    // validate(arguments, ['string'])
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
    // validate(arguments, ['string', 'number', 'number'])

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
    return `Aeronave - prefixo: ${this.prefixo}, velocidade de cruzeiro: ${this.velocidadeCruzeiro},
     de autonomia: ${this.autonomia}`;
  }
}

class AeronaveParticular extends Aeronave {
  #respManutencao;

  constructor(respManutencao, prefixo, velocidadeCruzeiro, autonomia) {
    // validate(arguments, ['string', 'string', 'number', 'number'])
    this.#respManutencao = respManutencao;
    super(prefixo, velocidadeCruzeiro, autonomia);
  }
}

class AeronaveComercial extends Aeronave {
  #nomeCIA;

  constructor(nomeCIA, prefixo, velocidadeCruzeiro, autonomia) {
    // nome da companhia aérea
    // validate(arguments, ['string', 'string', 'number', 'number'])
    this.#nomeCIA = nomeCIA;
    super(prefixo, velocidadeCruzeiro, autonomia);
  }
}

class AeronavePassageiros extends AeronaveComercial {
  #maxPassageiros;

  constructor(maxPassageiros, nomeCIA, prefixo, velocidadeCruzeiro, autonomia) {
    // validate(arguments, ['number','string', 'string', 'number', 'number'])
    this.#maxPassageiros = maxPassageiros;
    super(nomeCIA, prefixo, velocidadeCruzeiro, autonomia);
  }
}

class AeronaveCarga extends AeronaveComercial {
  #pesoMax;

  constructor(pesoMax) {
    // validate(arguments, ['number','string', 'string', 'number', 'number'])
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
    // validate(arguments, ['Aeronave'])
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
  #id; // string
  #origem;
  #destino;
  #tamanho;
  static #idHelper = 0;

  constructor(origem, destino, tamanho) {
    Aerovia.#idHelper++;
    this.#id = Aerovia.#idHelper;

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
     destino: ${this.destino}, de tamanho: ${this.tamanho}`;
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
    return aerovia.returnInfo()
  }
}

const p01 = new Piloto("p01", "teste", "ativo");
const p02 = new Piloto("p02", "teste2", "inativo");
const servico = new ServicoPilotos();

const a01 = new Aeronave("PT-ABCD", 10, 10);
const a02 = new Aeronave("PT-ABCD", 10, 10);


const servicoAerovia = new ServicoAerovias()
const av01 = new Aerovia('COSMOS', 'PACIENCIA', 10)
const av02 = new Aerovia('BANGU', 'STA CRUZ', 10)
servicoAerovia.adicionarAerovia(av01)
servicoAerovia.adicionarAerovia(av02)



const servicoAeronave = new ServicoAeronaves();

servico.adicionarPiloto(p01);
servico.adicionarPiloto(p02);

servicoAeronave.adicionarAeronave(a01);
servicoAeronave.adicionarAeronave(a02);

console.log(servicoAerovia.recupera('BANGU', 'STA CRUZ'));

// console.log(servico.todos())

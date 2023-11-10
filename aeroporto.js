import nReadlines from 'n-readlines'

let arq = new nReadlines('pilotos.txt')
let buf
let linha
let dados = []

// arq.next() // pular a primeira linha

// while(buf = arq.next()){
//     linha = buf.toString('utf8') 
//     linha = linha.split(',')
//     dados = [{matricula: linha[0], nome:linha[1], habilitacaoAtiva: linha[2].replace('\r', '')}]
//     console.log(dados[0])
// }

class Piloto {
    #matricula
    #nome
    #habilitacaoAtiva
    
    constructor(matricula, nome, habilitacaoAtiva){
        this.#matricula = matricula
        this.#nome = nome
        this.#habilitacaoAtiva = habilitacaoAtiva
    }

    get matricula() {
        return this.#matricula
    }    
}
class ServicoPilotos extends Piloto {
    #pilotos = []


    adicionarPiloto(piloto) {
        return this.#pilotos.push(piloto);
    }

    recupera(matricula) {
        console.log(this.#pilotos)
        return this.#pilotos.find(piloto => piloto.matricula === matricula);
    }
    todos() { // pesquisar pra ver como faz isso de retornar todos os pilotos armazenados (no trem acredito ter)
        let todos = []
        return todos
    }
}

class Aeronave {
    #prefixo
    #velocidadeCruzeiro
    #autonomia

    constructor(prefixo, velocidadeCruzeiro, autonomia ) {
        this.#prefixo = prefixo
        this.#velocidadeCruzeiro = velocidadeCruzeiro
        this.#autonomia = autonomia
    }
}

class AeronaveParticular extends Aeronave {
    #respmanutencao 

    constructor(respmanutencao) {
        this.#respmanutencao = respmanutencao 
    }
} 

class AeronaveComercial extends Aeronave {
    #nomeCIA

    constructor(nomeCIA) {
        this.#nomeCIA = nomeCIA
    }
}

class AeronavePassageiros extends AeronaveComercial {
    #maxPassageiros

    constructor (maxPassageiros) {
        this.#maxPassageiros = maxPassageiros
    }
}

class AeronaveCarga extends AeronaveComercial {
    #pesoMax

    constructor(pesoMax) {
        this.#pesoMax = pesoMax
    }
}

class ServicoAeronaves extends Aeronave {

    todas() { // retornar todas as aeronaves
        let todos = []
        return todos
    }
}

class Aerovia {
    #id
    #origem
    #destino
    #tamanho

    constructor (origem, destino, tamanho) {
        // atribuir o id, nao esquecer
        this.#origem = origem
        this.#destino = destino
        this.#tamanho = tamanho
    }
}

class ServicoAerovias extends Aerovia {
    recupera(origem, destino) {
        // retornar todas as aerovias com origem e destino de acordo com as do parametro
        return 
    }
}

const p01 = new Piloto('p01', 'teste', 'ativo')
const servico = new ServicoPilotos()
servico.adicionarPiloto(p01)
console.log(servico.recupera('j01'))
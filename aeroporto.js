import nReadlines from 'n-readlines'
// import promptsync from 'prompt-sync'
// const prompt = promptsync({sigint: true})

let arq = new nReadlines('OK_CtrlEspacoAereo.asta')
let buf
let linha

arq.next()


while(buf = arq.next()){
    linha = buf.toString('utf8') 
    console.log(linha)
}

class Piloto {
    #matricula
    #nome
    #habilitacaoAtiva
    
    constructor(matricula, nome, habilitacaoAtiva){
        this.#matricula = matricula
        this.#nome = nome
        this.#habilitacaoAtiva = habilitacaoAtiva
    }
}
class ServicoPilotos extends Piloto {

    recupera(matricula) { // deve retornar a matricula da matricula fornecida
        return super.matricula
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
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

    recupera(matricula) {
        return super.matricula
    }
    todos() {
        let todos = []
    }
}

class Aeronave {
    #prefixo
    #velocidadeCruzeiro
    #autonomia
}


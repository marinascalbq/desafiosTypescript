let botaoAtualizar = document.getElementById('atualizar-saldo');
let botaoLimpar = document.getElementById('limpar-saldo');
let soma = document.getElementById('soma') as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo');

let saldoAtual = 0

zerarSaldo()

function somarAoSaldo(soma: number) {
    if (campoSaldo){
    saldoAtual += soma
    campoSaldo.innerHTML = saldoAtual.toString();
    zerarCampoSoma();

    }
}

function zerarCampoSoma() {
    soma.value ="";
}

function zerarSaldo() {
    if(campoSaldo) {
        saldoAtual = 0;
        campoSaldo.innerHTML = saldoAtual.toString();
    }
}

if (botaoAtualizar) {
    botaoAtualizar.addEventListener('click', () => {
    somarAoSaldo(Number(soma.value));
    });
}

if (botaoLimpar){
    botaoLimpar.addEventListener('click',  () => {
    zerarSaldo();
    });
}
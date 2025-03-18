const prompt = require('prompt-sync')();

let tabuleiro = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

let AtualJogador = '🌚';

let Jogoiniciado = true;

function imprimirTabuleiro() {
    console.log(`	
        ${tabuleiro[0]} | ${tabuleiro[1]} | ${tabuleiro[2]}
        ---------
        ${tabuleiro[3]} | ${tabuleiro[4]} | ${tabuleiro[5]}
        ---------
        ${tabuleiro[6]} | ${tabuleiro[7]} | ${tabuleiro[8]}
        `);
}


function jogada(posicao) {
    if(tabuleiro[posicao] === " ") {
        tabuleiro[posicao] = AtualJogador;
    }else {
        console.log("Posição já ocupada, escolah outra posição");
        return false;
    }

    if(ganhou()) {
        imprimirTabuleiro();
        console.log(`Jogador ${AtualJogador} ganhou!`);
        Jogoiniciado = false;
        return true;
    }

    if(tabuleiro.every(posicao => posicao !== ' ')) {
        imprimirTabuleiro();
        console.log('É um Empate!');
        Jogoiniciado = false;
        return true;
    }

    AtualJogador = AtualJogador === "🌚" ? "🌞" : "🌚";
    return true;

}

function ganhou() {
    const condicoes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return condicoes.some((condicao) => {
        const [a, b, c] = condicao;
        return tabuleiro[a] === AtualJogador && tabuleiro[b] === AtualJogador && tabuleiro[c] === AtualJogador;
    });
}

while(Jogoiniciado) {
    imprimirTabuleiro();
    const posicao = prompt(`Jogador ${AtualJogador }, faça sua jogada (0-8): `);

    if(posicao >=0 && posicao <= 8) {
        jogada(parseInt(posicao));
    } else {
        console.log('Posição inválida, forneça um número de 0 a 8');
    }
}

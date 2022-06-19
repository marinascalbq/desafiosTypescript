enum Profissao {
    Atriz,
    Padeiro
}


interface IPessoa {
    nome: string,
    idade: number,
    profissao?: Profissao 
}

const maria = {
    nome: "maria",
    idade: 29,
    profissao: Profissao[0]
}

const roberto = {
    nome: "roberto",
    idade: 19,
    profissao: Profissao[1]
}
const laura = {
    nome: "laura",
    idade: 32,
    profissao: Profissao[0]
};

const carlos = {
    nome: "carlos",
    idade: 19,
    profissao: Profissao[1]
}

console.log(`${maria.nome} tem ${maria.idade} e trabalha como ${maria.profissao}!`);
console.log(`${roberto.nome} tem ${roberto.idade} e trabalha como ${roberto.profissao}!`);
console.log(`${laura.nome} tem ${laura.idade} e trabalha como ${laura.profissao}!`);
console.log(`${carlos.nome} tem ${carlos.idade} e trabalha como ${carlos.profissao}!`);

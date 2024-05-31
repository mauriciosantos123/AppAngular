export class Pessoa {
  pessoaid: number;
  nome: string;
  sobreNome: string;
  idade: number;
  profissao: string;

  constructor(pessoaId: number, nome: string, sobrenome: string, idade: number, profissao: string) {
    this.pessoaid = pessoaId;
    this.nome = nome;
    this.sobreNome = sobrenome;
    this.idade = idade;
    this.profissao = profissao;
  }
}

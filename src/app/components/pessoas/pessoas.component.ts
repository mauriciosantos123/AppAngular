import { PessoaService } from './../../pessoa.service';
import {Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pessoa } from '../../Pessoa';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
//import { ToastrModule } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';
import { subscribe } from 'diagnostics_channel';


@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [
    FormsModule,
     ReactiveFormsModule,
     CommonModule,
     ModalModule,
 //    ToastrModule
    ],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css'
})


export class PessoasComponent implements OnInit{

  formulario : any ;
  tituloFormulario : string | undefined;
  pessoas : Pessoa[] | undefined;
  pessoaid: number | undefined  ;
  nomePessoa : string | undefined;

  visibbilidadeTabela : boolean = true;
  visibilidadeFormulario : boolean = false

  modalRef : BsModalRef | undefined;


  constructor(
    private pessoaService : PessoaService,
    private modalService : BsModalService,
   // private toastr : ToastrService
  ){}

  ngOnInit(): void {

    this.pessoaService.PegarTodos().subscribe(resultado => {
      this.pessoas = resultado;
    });
    this.tituloFormulario = "Nova Pessoa" ;
    this.formulario = new FormGroup({
    nome: new FormControl(null),
    sobrenome: new FormControl(null),
    idade: new FormControl(null),
    profissao : new FormControl(null)

   });
  }

  AtualizarPessoas(pessoa : Pessoa) : void {

    console.log("caiu no att: " + pessoa.pessoaid)
    this.pessoaService.AtualizarPessoa(pessoa).subscribe(resultado => {
      this.visibbilidadeTabela = false;
      this.visibilidadeFormulario = true;
      alert("atualizado com sucesso");
      this.pessoaService.PegarTodos().subscribe(novasPessoas => {
        this.pessoas = novasPessoas ;
      })
      this.Voltar();
    })
  }



  SalvarPessoa(pessoa : Pessoa) : void {

    this.pessoaService.SalvarPessoa(pessoa).subscribe(resultado => {
      this.visibbilidadeTabela = false;
      this.visibilidadeFormulario = true;
      alert("inserida com sucesso");
      this.pessoaService.PegarTodos().subscribe(novasPessoas => {
        this.pessoas = novasPessoas ;
      })
      this.Voltar();
    })
  }

  EnviarFormulario(): void{

    const pessoa : Pessoa = this.formulario.value;
    console.log("caiu no att: teste " + pessoa);
    if(pessoa.pessoaid  > 0){
      console.log("caiu no att: " + pessoa.pessoaid)
      this.AtualizarPessoas(pessoa);
    }
    else{
      this.SalvarPessoa(pessoa);
    }
  }

  ExibirFormularioCadastro() : void{

    this.visibbilidadeTabela = false;
    this.visibilidadeFormulario = true;
  }

  ExibirFormularioAtualizacao(pessoaid: number): void {
    this.visibbilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pessoaService.PegarPeloId(pessoaid).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobreNome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaid),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobreNome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao),
      });
    });
  }

  ExibirConfirmacaoExclusao(pessoaId : number, nome: string, conteudoModal: TemplateRef<any>) : void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaid = pessoaId;
    this.nomePessoa = nome;
  }

  ExcluirPessoa(pessoaid : number | undefined) {
    if(pessoaid != undefined){
    this.pessoaService.DeletarPessoa(pessoaid).subscribe(result => {
      this.modalRef?.hide();
      alert('Pessoa excluido com sucesso ');
     // this.toastr.success("Excluido com sucesso");
      this.pessoaService.PegarTodos().subscribe(registros => {
        this.pessoas = registros;
      });
    });
    }else{
    // this.toastr.error(`pessoa veio sem ID > ${{pessoaid}}`);
    }

  }


  Voltar() :void {
    this.visibbilidadeTabela = true;
    this.visibilidadeFormulario= false;
  }
}






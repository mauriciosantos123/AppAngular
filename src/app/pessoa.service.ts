import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './Pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  apiUrl = '/api/pessoas'; // Caminho relativo

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  PegarPeloId(pessoaId: number): Observable<Pessoa> {
    const apiUrl = `${this.apiUrl}/${pessoaId}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  SalvarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa, this.httpOptions);
  }

  AtualizarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.apiUrl, pessoa, this.httpOptions);
  }

  DeletarPessoa(pessoaId: number): Observable<number> {
    const apiUrl = `${this.apiUrl}/${pessoaId}`;
    return this.http.delete<number>(apiUrl, this.httpOptions);
  }
}

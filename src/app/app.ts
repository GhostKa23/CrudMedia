import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modelo de um aluno com o resultado já calculado
interface Aluno {
  nome: string;
  media: number;
  situacao: string; // APROVADO, RECUPERAÇÃO ou REPROVADO
  classe: string; // usada no CSS para mudar a cor
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Campos do formulário
  nome: string = '';
  nota1: number | null = null;
  nota2: number | null = null;
  nota3: number | null = null;

  // Mensagens de erro de cada campo
  erroNome: string = '';
  erroNota1: string = '';
  erroNota2: string = '';
  erroNota3: string = '';

  // Resultado do último cálculo e lista da turma
  resultado: Aluno | null = null;
  turma: Aluno[] = [];

  // Verifica se uma nota é válida e devolve a mensagem de erro (ou vazio)
  validarNota(nota: number | null, nomeCampo: string): string {
    if (nota === null) {
      return 'Preencha a ' + nomeCampo + '.';
    }
    if (nota < 0) {
      return 'A ' + nomeCampo + ' não pode ser menor que 0.';
    }
    if (nota > 10) {
      return 'A ' + nomeCampo + ' não pode ser maior que 10.';
    }
    return '';
  }

  // Valida todos os campos. Retorna true se estiver tudo certo
  validar(): boolean {
    this.erroNome = this.nome.trim() === '' ? 'Informe o nome do aluno.' : '';
    this.erroNota1 = this.validarNota(this.nota1, 'Nota 1');
    this.erroNota2 = this.validarNota(this.nota2, 'Nota 2');
    this.erroNota3 = this.validarNota(this.nota3, 'Nota 3');

    return (
      this.erroNome === '' &&
      this.erroNota1 === '' &&
      this.erroNota2 === '' &&
      this.erroNota3 === ''
    );
  }

  calcular(): void {
    if (!this.validar()) {
      this.resultado = null;
      return;
    }

    const media = (this.nota1! + this.nota2! + this.nota3!) / 3;

    let situacao = '';
    let classe = '';
    if (media >= 7) {
      situacao = 'APROVADO';
      classe = 'aprovado';
    } else if (media >= 5) {
      situacao = 'RECUPERAÇÃO';
      classe = 'recuperacao';
    } else {
      situacao = 'REPROVADO';
      classe = 'reprovado';
    }

    this.resultado = { nome: this.nome.trim(), media: media, situacao: situacao, classe: classe };
    this.turma.push(this.resultado);
  }

  limpar(): void {
    this.nome = '';
    this.nota1 = null;
    this.nota2 = null;
    this.nota3 = null;
    this.erroNome = '';
    this.erroNota1 = '';
    this.erroNota2 = '';
    this.erroNota3 = '';
    this.resultado = null;
  }

  removerAluno(posicao: number): void {
    this.turma.splice(posicao, 1);
  }

  // Média geral da turma (média das médias dos alunos)
  mediaTurma(): number {
    if (this.turma.length === 0) {
      return 0;
    }
    let soma = 0;
    for (const aluno of this.turma) {
      soma += aluno.media;
    }
    return soma / this.turma.length;
  }
}

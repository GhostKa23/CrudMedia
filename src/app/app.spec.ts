import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let app: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    app = TestBed.createComponent(App).componentInstance;
  });

  it('deve aprovar com média 7 ou mais', () => {
    app.nome = 'Maria';
    app.nota1 = 8;
    app.nota2 = 8;
    app.nota3 = 9;
    app.calcular();
    expect(app.resultado?.situacao).toBe('APROVADO');
  });

  it('deve mandar para recuperação com média entre 5 e 7', () => {
    app.nome = 'João';
    app.nota1 = 5;
    app.nota2 = 6;
    app.nota3 = 7;
    app.calcular();
    expect(app.resultado?.situacao).toBe('RECUPERAÇÃO');
  });

  it('deve reprovar com média abaixo de 5', () => {
    app.nome = 'Ana';
    app.nota1 = 2;
    app.nota2 = 4;
    app.nota3 = 3;
    app.calcular();
    expect(app.resultado?.situacao).toBe('REPROVADO');
  });

  it('não deve aceitar nota maior que 10', () => {
    app.nome = 'Pedro';
    app.nota1 = 11;
    app.nota2 = 5;
    app.nota3 = 5;
    app.calcular();
    expect(app.resultado).toBeNull();
    expect(app.erroNota1).not.toBe('');
  });
});

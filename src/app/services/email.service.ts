import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://api.brevo.com/v3/smtp/email';
  private apiKey = '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'; 

  constructor(private http: HttpClient) {}

  enviarEmail(destinatario: string,  assunto: string, conteudoHtml: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': this.apiKey
    });

    const body = {
      sender: {
        name: 'Gato Fram',
        email: 'contato@framja.app.br'
      },
      to: [
        { email: destinatario, name: 'Nome do Destinatário' }
      ],
      subject: assunto,
      htmlContent: conteudoHtml
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
  
  enviarEmailBoasVindas(nome: string, email: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': this.apiKey
    });

    const body = {
      sender: {
        name: 'Framja',
        email: 'contato@framja.app.br'
      },
      to: [
        { email: email, name: nome }
      ],
      subject: 'Boas vindas ao Framja!',
      htmlContent: this.retornarHtmlBoasVindas(nome, email, senha)
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  private retornarHtmlBoasVindas(nome: string, email: string, senha: string): string {

    return `
      <p>Olá, ${nome}!</p>
      <p>O seu cadastro foi concluído com sucesso 💜</p>
      <p>Segue abaixo o seu login e senha para acessar o seu sistema Framja 💻</p>
      
      <p><strong>Email: ${email}</strong></p>
      <p><strong>Senha: ${senha}</strong></p>
      
      <p>Basta realizar as configurações iniciais para ter acesso total à plataforma!</p>

      <p>Aqui estão alguns links úteis para você:</p>
      <ul>
          <li><a href="https://framja.app.br">Acessar o sistema através do navegador</a></li>
          <li><a href="https://apps.apple.com/br/app/framja/id6526502666">Baixar o app no iOS</a></li>
          <li><a href="https://play.google.com/store/apps/details?id=framja.app.br&pli=1">Baixar o app no Android</a></li>
      </ul>

      <p>Se ficar com alguma dúvida, já sabe, manda uma mensagem no WhatsApp: <strong>(11) 91832-2521</strong> 📲, estaremos prontos para te atender! 🤗</p>

      <p>Um abraço,<br>
      Equipe Framja</p>
    `;

  }


}

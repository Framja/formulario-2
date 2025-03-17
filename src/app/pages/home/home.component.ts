import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UtilService } from '../../services/util.service';
import { UserFirebaseRequest } from '../../interfaces/user-firebase-request.interface';
import { environment } from '../../../environments/environment';
import { LeadCadastro } from '../../interfaces/lead-cadastro.interface';
import { AuthService } from '../../services/auth.service';
import { Empresa } from '../../interfaces/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';
import { RotasApi } from '../../enums/rotas-api.enum';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { Usuario } from '../../interfaces/usuario.interface';
import { Lead } from '../../interfaces/lead.interface';
import { StatusLead } from '../../enums/status-lead.enum';
import { forkJoin } from 'rxjs';
import { ServicoService } from '../../services/servico.service';
import { ConfiguracoesService } from '../../services/configuracoes.service';
import { UsuarioService } from '../../services/usuario.service';
import { ProfissionalService } from '../../services/profissional.service';
import { ServicoProfissional } from '../../interfaces/servico-profissional.interface';
import { Profissional } from '../../interfaces/profissional.interface';
import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [provideNgxMask()],
})
export class HomeComponent {

  leadForm: FormGroup;
  stepAtual = "step1";
  exibirSenha: boolean = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private configuracoesService: ConfiguracoesService,
    private emailService: EmailService,
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private profissionalService: ProfissionalService,
    private router: Router,
    private servicoService: ServicoService,
    private usuarioService: UsuarioService,
    private utilService: UtilService,
  ) {

    this.leadForm = this.fb.group({
      nome: ['', [Validators.required]],
      whatsapp: ['', [Validators.required, Validators.minLength(10)]],
      estabelecimento: ['', [Validators.required]],
      segmento: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }



  get lead(): LeadCadastro {
    return this.leadForm.value;
  }

  definirStep(step: string) {
    this.stepAtual = step;
  }

  avancarStep2(): void {

    const nomeValido = this.validarFormControl('nome');
    const whatsappValido = this.validarFormControl('whatsapp');
    if (nomeValido && whatsappValido) {
      this.leadForm.markAsUntouched();
      this.stepAtual = 'step2';

    } else {
      this.leadForm.markAllAsTouched();
      this.alertService.exibirAvisoCampoObrigatorio();
    }

  }

  avancarStep3(): void {

    const empresaValido = this.validarFormControl('estabelecimento');
    const segmentoValido = this.validarFormControl('segmento');
    const cargoValido = this.validarFormControl('cargo');
    if (empresaValido && segmentoValido && cargoValido) {
      this.leadForm.markAsUntouched();
      this.stepAtual = 'step3';

    } else {
      this.leadForm.markAllAsTouched();
      this.alertService.exibirAvisoCampoObrigatorio();
    }

  }

  voltarStep(step: string) {
    this.stepAtual = step;
  }


  enviar(): void {

    const emailValido = this.validarFormControl('email');
    const senhaValido = this.validarFormControl('senha');
    if (emailValido && senhaValido) {

      this.realizarCadastroCompleto();

    } else {
      this.leadForm.markAllAsTouched();
      this.alertService.exibirAvisoCampoObrigatorio();
    }

  }

  validarFormControl(nomeControle: string): boolean {
    return this.leadForm.controls[nomeControle].valid;
  }

  invalidarFormControl(nomeControle: string): boolean {
    return this.leadForm.controls[nomeControle].invalid && (this.leadForm.controls[nomeControle].touched);
  }

  realizarCadastroCompleto(): void {

    const email = this.utilService.removerAcentos(this.lead.email.toLowerCase());
    const password: string = this.lead.senha;
    let codigoEmpresa: number;

    let usuario: UserFirebaseRequest = {
      email: environment.auth.email,
      password: environment.auth.password
    }

    this.alertService.exibirLoading();

    this.authService.login(usuario).subscribe(
      () => {

        //Cria usuário na autenticação do firebase
        this.authService.criarUsuarioFirebaseAuth(email, password).subscribe(
          (criarUsuarioResponse) => {

            if (criarUsuarioResponse.sucesso) {

              let usuarioFirebase = criarUsuarioResponse.retorno;
              let empresa: Empresa;

              //Inicia o cadastro da empresa
              this.empresaService.obterProximoCodigoDeEmpresa().then(
                (codigo) => {

                  this.empresaService.obterLinkEmpresa(this.lead.estabelecimento).then(
                    (link) => {

                      codigoEmpresa = codigo;

                      empresa = {
                        codigo: codigoEmpresa,
                        ativo: true,
                        nomeResponsavel: this.lead.nome,
                        email: email,
                        telefone: this.lead.whatsapp,
                        nomeEmpresa: this.lead.estabelecimento,
                        cpfCnpj: "",
                        tipoPessoa: "",
                        dataCriacao: new Date(),
                        quantidadeProfissionais: 30,
                        corBotao: "dark",
                        plano: {
                          id: environment.idPlanoTesteGratis,
                          descricao: "Teste Grátis",
                          tipoPagamento: "0"
                        },
                        link: link,
                        segmento: this.lead.segmento,
                        exportado: false
                      }

                      this.empresaService.cadastrar<Empresa>(RotasApi.empresas, empresa)
                        .subscribe(cadastrarEmpresaResponse => {

                          if (cadastrarEmpresaResponse.sucesso) {

                            //Cria as constantes que serão utilizadas nos serviços
                            const nome: string = this.lead.nome;
                            const password: string = this.lead.senha;
                            const telefone: string = this.lead.whatsapp;
                            const empresa: string = cadastrarEmpresaResponse.retorno["name"];
                            const nomeEmpresa: string = this.lead.estabelecimento;
                            const segmento: string = this.lead.segmento;
                            const cargo: string = this.lead.cargo;
                            const tipoUsuario: TipoUsuario = TipoUsuario.administrador;

                            //Cria usuário do tipo administrador no banco de dados
                            const cadastrarUsuarioRequest: Usuario = {
                              email,
                              nome,
                              telefone,
                              empresa,
                              codigoEmpresa,
                              tipoUsuario,
                              ativo: true,
                              senha: password,
                              nomeEmpresa,
                              userFirebase: criarUsuarioResponse.retorno
                            };

                            //Cria lead no banco de dados
                            const leadRequest: Lead = {
                              dataContato: new Date,
                              email,
                              nome: nomeEmpresa,
                              nomeResponsavel: nome,
                              telefone: this.lead.whatsapp,
                              empresa: environment.idEmpresaFramja,
                              status: StatusLead.aberto,
                              termometro: "morno",
                              origem: "site.framja.app.br",
                              idEmpresa: empresa,
                              segmento,
                              exportado: false
                            }

                            forkJoin({
                              atualizarEmpresaFirebaseAuth: this.authService.atualizarEmpresaNaContaFirebaseAuth(usuarioFirebase.idToken, empresa),
                              categoriasServicos: this.servicoService.buscarCategorias(),
                              cadastrarConfiguracaoHorario: this.configuracoesService.cadastrarConfiguracaoHorarioPadrao(empresa),
                              cadastrarUsuario: this.usuarioService.cadastrarUsuario(cadastrarUsuarioRequest),
                              cadastrarLead: this.profissionalService.cadastrar<Lead>(RotasApi.leads, leadRequest)
                            }).subscribe(
                              ({ categoriasServicos, cadastrarUsuario: cadastrarUsuarioResponse, cadastrarLead: cadastrarLeadRequest, cadastrarConfiguracaoHorario }) => {
                                
                                if (cadastrarUsuarioResponse.sucesso && cadastrarLeadRequest.sucesso && cadastrarConfiguracaoHorario.sucesso) {

                                  //Cadastrar os serviços padrão para cada segmento
                                  const servicos = this.servicoService.obterServicosPadrao(empresa, segmento, categoriasServicos);

                                  // Criar um array de observáveis para as chamadas de cadastro
                                  const cadastroServicos$ = servicos.map(servico =>
                                    this.servicoService.cadastrarServicoComRetorno(servico)
                                  );

                                  // Aguarda todas as requisições de cadastro de serviço serem concluídas
                                  forkJoin(cadastroServicos$).subscribe({
                                    next: (servicosCadastrados) => {

                                      // Após todos os serviços serem cadastrados, cadastra o profissional
                                      let servicosProfissional: ServicoProfissional[] = [];

                                      servicosCadastrados
                                        .forEach(servico => {

                                          servicosProfissional.push({
                                            idServico: servico.retorno.id,
                                            duracao: servico.retorno.duracao,
                                            comissao: 0,
                                            valorCobrado: 0
                                          });

                                        });

                                      const horarioProfissional = this.configuracoesService.obterConfiguracaoHorarioPadrao(empresa).horarios;

                                      const profissionalRequest: Profissional = {
                                        ativo: true,
                                        cargo: cargo,
                                        email: email,
                                        empresa: empresa,
                                        exportado: false,
                                        horarioTrabalho: horarioProfissional,
                                        nome: nome,
                                        ordemNaAgenda: 0,
                                        possuiAgenda: true,
                                        servicos: servicosProfissional,
                                        telefone: telefone,
                                        tipoUsuario: TipoUsuario.administrador,
                                        senha: password
                                      }

                                      this.profissionalService.cadastrar<Profissional>(RotasApi.profissionais, profissionalRequest)
                                        .subscribe(profissionalResponse => {

                                          if (profissionalResponse.sucesso) {

                                            this.emailService.enviarEmailBoasVindas(nome, email, password).subscribe(
                                              () => {

                                               
                                                this.router.navigate(['/auth']);
                                                // try {
                                                //   window.parent.postMessage('redirectToObrigado', 'https://site.framja.app.br');
                                                //   console.log("Mensagem enviada com sucesso para o parent!");
                                                // } catch (error) {
                                                //   console.error("Erro ao enviar mensagem para a página pai:", error);
                                                // }
                                                

                                              }
                                            )



                                          }
                                          else {
                                            this.alertService.exibirErroGenerico("Sinto muito, estamos com muita demanda e volume de pedidos", "Por favor, entre em contato pelo nosso whatsapp (11)91832-2521");
                                            console.log(profissionalResponse.mensagem);
                                          }

                                        });

                                    }
                                  });

                                }

                              });



                          }
                          else {
                            this.alertService.exibirErro('Erro na gravação da empresa');
                          }

                        });

                    });

                });



            }
            else {
              this.alertService.exibirErro(criarUsuarioResponse.mensagem);
            }

          });

      });




  }

}
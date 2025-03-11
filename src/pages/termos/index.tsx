import { useCustomer } from '@/hooks/customer'

export function Termos() {
  const { customer } = useCustomer()
  return (
    <div className="bg-white px-6 py-32 md:px-40" id="privacidade">
      <div className="mx-auto text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Política de Privacidade e Termos de Uso
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
          1. Introdução
        </p>
        <div className="mt-4">
          <p className="mt-4">
            Bem-vindo(a) à Política de Privacidade {customer.display_name}. Esta
            política é parte integrante de nossos Termos de Uso. O uso dos
            serviços oferecidos em qualquer plataforma {customer.display_name}{' '}
            está condicionado à leitura e ao aceite integral desta política de
            privacidade.
          </p>
          <p className="mt-4">
            Esta política se refere à coleta de dados pessoais nos diversos
            serviços {customer.display_name}, incluindo (mas não limitado a),
            website institucional, plataforma de Internet Banking, aplicativo
            para dispositivos móveis, redes sociais e canais de atendimento ao
            cliente.
          </p>
          <p className="mt-4">
            Estão incluídos nesta Política de Privacidade também os dados
            referentes a serviços que rodam em plano de fundo e que não são
            necessariamente visíveis aos usuários finais, como é o caso de
            ferramentas de relatório de uso das plataformas{' '}
            {customer.display_name}.
          </p>
          <p className="mt-4">
            Ao utilizar qualquer um dos serviços {customer.display_name} você
            confirma que aceitou as condições propostas neste documento. Para
            reafirmar seu aceite em relação às condições será exigido que marque
            a opção Li e concordo com os Termos de Uso e Política de Privacidade
            antes de continuar seu cadastro. Se não concordar com qualquer ponto
            proposto, pare seu cadastro imediatamente. Por favor, entre em
            contato através do e-mail atendimento@stric.com.br e nos informe o
            ponto de discordância.
          </p>
          <p className="mt-4">
            Buscamos ser transparentes com nossos usuários e portanto este
            documento foi escrito de forma simples e de fácil leitura, caso
            surja alguma dúvida no decorrer do processo, não hesite em entrar em
            contato. Apenas prossiga com o uso dos serviços após sanar toda e
            qualquer questão.
          </p>
          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            2. Fontes de dados
          </p>
          <p className="mt-4">
            Ao aceitar este documento, o usuário concorda que poderá estar
            disponibilizando seus dados para coleta, processamento,
            armazenamento e compartilhamento, nos termos aqui descritos.
          </p>
          <p className="mt-4">
            Os dados dos usuários dos serviços {customer.display_name} podem ser
            coletados através dos seguintes canais e serviços{' '}
            {customer.display_name}:
          </p>
          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            2.1 Website Institucional
          </p>
          <p className="mt-4">
            O website institucional {customer.display_name} pode ser acessado
            através do endereço {customer.website}. O acesso a toda e qualquer
            subpágina deste endereço também está sujeita a este mesmo processo
            de coleta de dados.
          </p>
          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            2.2 Website de Internet Banking (Funções Bancárias Online)
          </p>
          <p className="mt-4">
            O website ou aplicativo web de Internet Banking pode ser acessado
            através do endereço {customer.ib} O acesso a toda e qualquer
            subpágina deste endereço também está sujeita ao mesmo processo de
            coleta de dados. Exemplos de subpáginas: Cadastro e Extrato
            Bancário.
          </p>
          <p className="mt-4">
            Este aplicativo web coleta dados integrais necessários para cadastro
            de contas com funcionalidades bancárias, conforme resoluções de
            órgãos regulatórios do Sistema Financeiro a qual a{' '}
            {customer.display_name} está sujeita. Para acesso integral ao
            aplicativo, será necessário realizar seu cadastro e informar dados
            da Pessoa Jurídica objeto do cadastro e das Pessoas Físicas
            diretamente envolvidas com a Pessoa Jurídica em questão.
          </p>
          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            2.3 Aplicativos para dispositivos Android
          </p>

          <p className="mt-4">
            O aplicativo para celulares smartphones e dispositivos com o sistema
            operacional Android pode ser acessado e baixado através da loja de
            aplicativos Google Play, mantida pela empresa Google.
          </p>

          <p className="mt-4">
            Este aplicativo coleta dados integrais necessários para cadastro de
            contas com funcionalidades bancárias, conforme resoluções de órgãos
            regulatórios do Sistema Financeiro a qual a {customer.display_name}{' '}
            está sujeita. Para acesso integral ao aplicativo, será necessário
            realizar seu cadastro e informar dados da Pessoa Jurídica objeto do
            cadastro e das Pessoas Físicas diretamente envolvidas com a Pessoa
            Jurídica em questão.
          </p>

          <p className="mt-4">
            O usuário pode estar sujeito também à coleta de dados por parte da
            operadora de telefonia e dados móveis e do fabricante de seu
            aparelho Android, no qual a {customer.display_name} não tem
            controle. Entre em contato com o fabricante e a operadora para ter
            acesso às Políticas de Privacidade específicas de seu aparelho.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            2.4 Aplicativos para dispositivos iOS
          </p>

          <p className="mt-4">
            O aplicativo para celulares smartphones e dispositivos com o sistema
            operacional iOS pode ser acessado e baixado através da loja de
            aplicativos App Store, mantida pela empresa Apple.
          </p>

          <p className="mt-4">
            Este aplicativo coleta dados integrais necessários para cadastro de
            contas com funcionalidades bancárias, conforme resoluções de órgãos
            regulatórios do Sistema Financeiro a qual a {customer.display_name}{' '}
            está sujeita. Para acesso integral ao aplicativo, será necessário
            realizar seu cadastro e informar dados da Pessoa Jurídica objeto do
            cadastro e das Pessoas Físicas diretamente envolvidas com a Pessoa
            Jurídica em questão.
          </p>

          <p className="mt-4">
            O usuário pode estar sujeito também à coleta de dados por parte da
            operadora de telefonia e dados móveis e do fabricante de seu
            aparelho iOS, no qual a {customer.display_name} não tem controle.
            Entre em contato com o fabricante e a operadora para ter acesso às
            Políticas de Privacidade específicas de seu aparelho.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            2.5 Redes Sociais
          </p>

          <p className="mt-4">
            O usuário que acessar qualquer uma das páginas ou perfis em
            plataformas de rede social da {customer.display_name} estará sujeito
            à coleta de dados da plataforma em questão.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            3. Tipos de Dados
          </p>

          <p className="mt-4">
            A depender da plataforma que o usuário acessa. São coletados e/ou
            diferentes tipos de dados.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            3.1 Dados de Navegação
          </p>

          <p className="mt-4">
            Ao visitar o website {customer.display_name}, são coletadas
            informações de navegação. Essas informações são coletadas através de
            um mecanismo chamado Cookie (um identificador adicionado ao seu
            navegador). São coletados dados anonimizados de IP, localização,
            data e hora, tempo na página, ações e etc. São utilizadas as
            ferramentas Google Analytics e Facebook Pixel neste processo.
          </p>

          <p className="mt-4">
            O usuário poderá pesquisar e seguir instruções do próprio navegador
            e remover ou restringir o uso de Cookies.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            3.2 Dados Pessoais
          </p>

          <p className="mt-4">
            Aos usuários que optarem por cadastrar e tornar usuários completos
            dos serviços {customer.display_name}, serão solicitadas informações
            pessoais referentes à empresa e a seus sócios. Algumas dessas
            informações são: CNPJ, nome, endereço, e-mail, faturamento, nome dos
            sócios, CPF dos sócios, nome da mãe dos sócios. Serão solicitadas
            fotos da face dos sócios e documentos de identificação.
          </p>

          <p className="mt-4">
            Caso o usuário não concorde em fornecer algum dos dados mediante
            solicitação na etapa de cadastro, deverá interromper imediatamente o
            processo.
          </p>

          <p className="mt-4">
            Todas essas informações fazem parte dos requisitos legais e
            regulatórios do Banco Central através de suas circulares para que
            Instituições de Pagamento possam operar.
          </p>

          <p className="mt-4">
            A {customer.display_name} se reserva no direito de acessar, ler,
            preservar e divulgar qualquer informação que se acredite ser
            necessária para cumprir ou aplicar a lei ou ordem judicial na medida
            requerida pela legislação e regulamentação aplicáveis. Tais dados
            nunca serão usados para fins de obtenção de vantagens indevidas.
          </p>

          <p className="mt-4">
            As informações particulares da empresa e de seus sócios serão
            armazenadas com os provedores de serviços bancários parceiros da
            {customer.display_name}, que são devidamente regularizados para
            operar no Sistema Financeiro Nacional. O provedor utilizado pela{' '}
            {customer.display_name} é Celcoin.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            4. Segurança no Armazenamento e Tráfego da Informação
          </p>

          <p className="mt-4">
            A fim de preservar a privacidade de seus usuários, a{' '}
            {customer.display_name} adota uma série de melhores práticas para
            que as informações sejam tratadas sempre com segurança. Abaixo estão
            algumas dessas medidas.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            4.1 Senha de Acesso
          </p>

          <p className="mt-4">
            A senha de acesso à conta {customer.display_name} é pessoal e
            intransferível. Ela é criada para que todas as informações estejam
            protegidas e não deve ser compartilhada com ninguém.
          </p>

          <p className="mt-4">
            Além disso, para conseguir realizar movimentações na conta, deve-se
            utilizar uma senha de 4 dígitos. Essa dupla autenticação existe para
            prevenir que pessoas não autorizadas realizem qualquer tipo de
            operação sensível.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            4.2 Segurança da informação
          </p>

          <p className="mt-4">
            Todas as informações trafegadas na web são criptografadas para caso
            alguém mal intencionado intercepte não consiga ter acesso. Além
            disso, as informações sensíveis são armazenadas de forma
            criptografada, de forma que nem mesmo membros da equipe{' '}
            {customer.display_name} tenham acesso a elas.
          </p>

          <p className="mt-4">
            São utilizadas as tecnologias mais robustas de criptografia e
            armazenamento presentes hoje para tratar as informações. Todos os
            softwares utilizados pela conta {customer.display_name} são
            atualizados frequentemente para que não sejam mantidas falhas de
            segurança no sistema.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            5. Alterações neste documento
          </p>

          <p className="mt-4">
            A {customer.display_name} se reserva no direito de alterar esta
            Política de Privacidade sem aviso prévio ou posterior. Recomendamos
            que visite periodicamente essa página para ficar ciente das
            alterações. Caso as modificações realizadas sejam julgadas
            significativas e exijam uma nova autorização dos usuários, eles
            serão comunicados com antecedência.
          </p>

          <div id="termos"></div>

          <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Termos e Condições de Uso
          </h1>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            Introdução
          </p>

          <p className="mt-4">
            Bem-vindo(a) aos Termos de Uso {customer.display_name}. Estes termos
            e condições gerais (“Termos de Uso”) se relacionam diretamente com
            nossa Política de Privacidade. Estes Termos de Uso se referem ao
            usuário do serviço gratuito ou pago (&ldquo;Usuário&ldquo;) e à
            plataforma de serviços financeiros, ferramentas e serviços gratuitos
            e pagos (&ldquo;{customer.display_name}&ldquo;). O uso do website{' '}
            {customer.website} (assim como seus subdomínios e diretórios), dos
            aplicativos para dispositivos móveis e de todas as funcionalidades
            contidas neles (&ldquo;Serviços&ldquo;) está condicionado à leitura
            e aceite integral dos termos de uso contidos nesta página.
          </p>

          <p className="mt-4">
            Os serviços oferecidos pela {customer.name} (&ldquo;
            {customer.display_name}&ldquo;) são feitos em parceria com Celcoin
            (CELCOIN INSTITUIÇÃO DE PAGAMENTO S.A), sociedade inscrita sob o
            CNPJ nº 13.935.893/0001-09 (&ldquo;Parceiro&ldquo;).
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            DO PRESTADOR DA SOLUÇÃO TECNOLÓGICA DE BANCO COMO SERVIÇO
            (&quot;BANKING AS A SERVICE/BAAS&quot;)
          </p>

          <p className="mt-4">
            O USUÁRIO/CLIENTE está ciente e concorda que a conta de pagamento de
            sua titularidade será aberta diretamente na CELCOIN INSTITUIÇÃO DE
            PAGAMENTO S.A, inscrita no CNPJ nº 13.935.893/0001-09, empresa
            parceira contratada pela (Nome da sua empresa aqui), para prestação
            da solução tecnológica de Banco como Serviço (&quot;Bank as a
            Service/BaaS&quot;), que contempla os procedimentos de abertura e
            gerenciamento de contas de pagamento, emissão de moeda eletrônica e
            serviços de processamento e liquidação.
          </p>

          <p className="mt-4">
            O USUÁRIO/CLIENTE está ciente e concorda que todos os dados
            fornecidos para abertura e manutenção da conta, serão utilizados
            pela CELCOIN apenas para o cumprimento da relação contratual firmada
            com (Nome da sua empresa aqui), dos deveres advindos da
            regulamentação vigente, sempre em observância a legislação que versa
            sobre proteção de dados e segurança da informação. A CELCOIN poderá,
            a qualquer momento, solicitar informações complementares para fins
            legais e regulatórios.”
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            1. Definições Importantes
          </p>

          <p className="mt-1 text-base font-semibold leading-7 text-indigo-600">
            1.1. Nestes Termos de Uso as palavras abaixo deverão ter o seguinte
            significado:
          </p>

          <p className="mt-4">
            Aplicações: também denominado aplicativos. São programas de
            computador que podem rodar na internet, como é o caso dos sites e do
            aplicativo móvel {customer.display_name}.
          </p>

          <p className="mt-4">
            Bandeira: MasterCard, empresa com sede no Brasil ou no exterior,
            proprietária do arranjo de pagamento que viabiliza o uso do Cartão
            nos Estabelecimentos credenciados.
          </p>

          <p className="mt-4">
            Cartão: é um cartão físico e/ou virtual que pode ser oferecido aos
            Titulares para usufruir os Serviços, a critério da{' '}
            {customer.display_name}.
          </p>

          <p className="mt-4">
            Chargeback: é o procedimento de contestação de débito por meio do
            qual você declara não reconhecer uma despesa efetuada com seu
            Cartão. Após aceito o Chargeback, será realizado um depósito na
            Conta do Titular, no prazo informado pelos Canais de Comunicação.
          </p>

          <p className="mt-4">
            Canais de Comunicação: são os canais oficiais para comunicação entre
            a {customer.display_name} e você, para temas referentes ao uso dos
            Serviços:
          </p>

          <p className="mt-4">
            <strong>E-mail:</strong> <br />
            contato@{customer.display_name}.com.br
          </p>

          <p className="mt-4">
            <strong>Chat:</strong> <br />O tempo de resposta por e-mail é de até
            3 (três) dias úteis. A depender do horário do contato, o chat pode
            redirecionar o atendimento para o e-mail. Conta{' '}
            {customer.display_name}: é a conta de pagamento digital pré-paga,
            sediada no Parceiro, destinada à realização de transações de
            pagamento.
          </p>

          <p className="mt-4">
            <strong>Estabelecimento:</strong> <br />
            qualquer fornecedor de produtos e/ou serviços que está habilitado a
            aceitar pagamentos com o seu Cartão, seja no Brasil e/ou no
            exterior, tanto em lojas físicas quanto por meio da internet.
          </p>

          <p className="mt-4">
            <strong>Instituição Financeira:</strong> <br />é a CELCOIN
            INSTITUIÇÃO DE PAGAMENTO S.A, instituição financeira inscrita sob o
            CNPJ nº 13.935.893/0001-09 responsável pelos serviços de
            individualização de Contas de Pagamento junto ao SPB (Sistema de
            Pagamento Brasileiro).
          </p>

          <p className="mt-4">
            <strong>Parceiros(as):</strong> <br />
            terceiros contratados pela {customer.display_name} para auxiliar ou
            viabilizar a prestação dos Serviços ou, ainda, empresas que poderão
            oferecer a Sua Empresa produtos e serviços relacionados ou não à{' '}
            {customer.display_name}.
          </p>

          <p className="mt-4">
            <strong>Política de Privacidade:</strong> <br />
            documento que regula e informa sobre a coleta, uso, transação e
            armazenamento de dados dos Usuários. A Política de Privacidade é
            parte integrante e inseparável destes Termos de Uso, de forma que a
            aceitação destes Termos de Uso implica, necessariamente, a aceitação
            da Política de Privacidade. Por este motivo, você deverá ler
            atentamente o referido documento. Acesse a Política de Privacidade
            aqui.
          </p>

          <p className="mt-4">
            <strong>Senha:</strong> <br />
            código inserido por meio de digitação ou outro método de validação
            pessoal utilizado para acesso à Conta {customer.display_name}.
          </p>

          <p className="mt-4">
            <strong>Sua Empresa:</strong> <br />
            pessoa jurídica constituída no Brasil, devidamente inscrita na
            Receita Federal do Brasil, titular da Conta {customer.display_name},
            Usuário do serviço {customer.display_name}, cujos representantes são
            autorizados a acessar as Aplicações e/ou utilizar os Serviços.
          </p>

          <p className="mt-4">
            <strong>Tarifas:</strong> <br />
            valores cobrados pela {customer.display_name} ou por Parceiros pela
            realização dos Serviços.
          </p>

          <p className="mt-4">
            <strong>Usuário:</strong> <br />
            pessoa física, portadora de CPF, representante autorizado de Sua
            Empresa, com poderes atribuídos pelos documentos societários de Sua
            Empresa, procuração ou cadastro junto à {customer.display_name}.
          </p>

          <p className="mt-4">
            <strong>Você:</strong> <br />
            Usuário responsável pelo cadastro de Sua Empresa para acesso aos
            Serviços.
          </p>

          <p className="mt-1 text-base font-semibold leading-7 text-indigo-600">
            2. Cadastro para Acesso aos Serviços
          </p>
          <p className="mt-4">
            Sua Empresa poderá ter acesso aos Serviços contratando-os
            diretamente por meio das Aplicações.
          </p>
          <p className="mt-4">
            Para efetuar o cadastro e ter acesso aos Serviços, o Usuário deve
            preencher certas informações pessoais, de acordo com a Circular
            3680/2013 do Banco Central, como: nome completo, razão social, data
            de nascimento dos sócios, data de constituição da empresa, número de
            inscrição no Cadastro de Pessoa Física (CPF) dos sócios, Cadastro
            Nacional de Pessoas Jurídicas (CNPJ), endereço residencial dos
            sócios, endereço comercial da empresa, número de telefone com DDD,
            e-mail, senha, tipo de atividade da empresa, assim como outras
            informações que podem ser exigidas pela {customer.display_name} ou
            pelo Parceiro e necessárias a essa finalidade. O Usuário declara que
            as Informações Pessoais fornecidas voluntariamente no momento do
            cadastro são corretas, completas e verdadeiras e compromete-se a
            sempre manter as Informações Pessoais atualizadas nas Aplicações,
            responsabilizando-se por qualquer resultado ou prejuízo decorrente
            da falsidade das suas Informações Pessoais ou da não atualização
            delas.
          </p>

          <p className="mt-4">
            O Usuário reconhece que as informações fornecidas voluntariamente
            poderão ser compartilhadas com a Instituição Financeira e o
            Parceiro, na medida necessária para disponibilização dos serviços
            oferecidos bem como para fins de registro ou qualquer outra
            finalidade.
          </p>

          <p className="mt-4">
            {customer.prefixDisplayName} {customer.display_name}, o Parceiro e a
            Instituição Financeira em hipótese alguma serão responsáveis pela
            veracidade das informações pessoais dos Usuários.
          </p>

          <p className="mt-4">
            Caso {customer.prefixDisplayName} {customer.display_name}, o
            Parceiro ou a Instituição Financeira detectem a abertura de conta a
            partir de informações falsas, incompletas, equivocadas, errôneas,
            enganosas, que não permita identificar a identidade do Titular, seja
            intencionalmente ou não, poderá ocorrer:
          </p>

          <p className="mt-4">
            (i) a solicitação de esclarecimentos e documentação adicional que
            julgarem necessários para a devida comprovação das informações
            prestadas e para a validação do cadastro, podendo, inclusive,
            recusarem-se a validar qualquer cadastro, a exclusivo critério da
            {customer.display_name}, do Parceiro e da Instituição Financeira.
          </p>

          <p className="mt-4">
            (ii) automaticamente a exclusão do seu cadastro, suspensão ou
            cancelamento da sua permissão de utilizar os Serviços, a exclusivo
            critério da {customer.display_name}, do Parceiro e da Instituição
            Financeira.
          </p>

          <p className="mt-4">
            Você poderá, a seu critério e responsabilidade, cadastrar Usuários
            autorizados a movimentar a Conta {customer.display_name} de Sua
            Empresa, que terão senhas próprias para acesso às Aplicações (de
            caráter confidencial, exclusivo e intransferível) e uso dos
            Serviços.
          </p>

          <p className="mt-4">
            Uma vez que o cadastro tenha sido realizado e aprovado, o Usuário
            passará a ter acesso a Conta, por meio unicamente das Aplicações,
            mediante a utilização da senha criada no momento do cadastro. O
            Titular é o único responsável por sua Conta e por qualquer atividade
            associada a esta Conta. Neste sentido, é proibido o
            compartilhamento, pelo Titular, de seu login e senha com terceiros.
          </p>

          <p className="mt-4">
            A {customer.display_name}, o Parceiro e a Instituição Financeira não
            serão responsáveis por acessos ou movimentações em sua Conta e/ou
            pelo uso indevido do Cartão, da Aplicação e/ou dos Serviços por
            terceiros ou por você.
          </p>

          <p className="mt-4">
            A {customer.display_name}, o Parceiro e a Instituição Financeira não
            serão responsáveis por qualquer dano direto ou indireto que resulte
            do mau uso ou da inabilidade de uso das Aplicações, da Conta, do
            Cartão e dos Serviços por terceiros ou por você.
          </p>

          <p className="mt-4">
            Havendo evidências ou meros indícios de uso irregular, inadequado,
            ou suspeito do Cartão, da Conta ou de qualquer um dos Serviços, o
            Usuário poderá ter seu cadastro suspenso ou cancelado imediatamente,
            sem prejuízo das demais sanções legais e contratuais.
          </p>

          <p className="mt-4">
            Em caso de perda, extravio, furto ou roubo do login ou Senha para
            acesso à Conta {customer.display_name} de Sua Empresa, Você ou outro
            Usuário deve, imediatamente, acessar as Aplicações e selecionar a
            opção de redefinição de senha. Caso não seja possível realizar esse
            procedimento, Você deverá contatar imediatamente a equipe{' '}
            {customer.display_name}
            através dos Canais de Comunicação, onde será realizado o bloqueio de
            sua Conta em até 24 (vinte e quatro) horas úteis. O acesso será
            liberado apenas após redefinição de informações junto ao Usuário.
          </p>

          <p className="mt-10 text-base font-semibold leading-7 text-indigo-600">
            3. Sobre os Serviços Oferecidos
          </p>

          <p className="mt-4">
            A {customer.display_name}, a Instituição Financeira e o Parceiro,
            juntos oferecem diversos Serviços financeiros, bancários e de
            pagamento para Sua Empresa. Os Serviços são acessados através de
            alguma Aplicação e o Usuário deverá realizar um cadastro para
            acessá-los.
          </p>

          <p className="mt-4">
            Após finalizada a etapa de cadastro, o Usuário poderá solicitar
            acesso ao cartão {customer.display_name}, disponível na modalidade
            físico e virtual. O prazo para liberação do cartão virtual e
            recebimento do cartão físico serão informados na Aplicação no
            momento da solicitação.
          </p>

          <p className="mt-4">
            É oferecido o serviço de aporte de recursos. Sua Empresa poderá
            acessar a Conta {customer.display_name} e transferir recursos
            financeiros para ela a partir do pagamento de boleto, transferências
            bancárias, PIX ou por outras formas que venham a ser
            disponibilizadas pela {customer.display_name}.
          </p>

          <p className="mt-4">
            É oferecido a possibilidade de comprar bens ou serviços em
            estabelecimentos com o Cartão. Para isso, os estabelecimentos devem
            aceitar pagamentos em cartões da Bandeira.
          </p>

          <p className="mt-4">
            É oferecido o serviço de saque com o Cartão, permitindo movimentar a
            Conta, de forma a retirar recursos em terminais eletrônicos
            habilitados;
          </p>

          <p className="mt-4">
            É oferecido o serviço de transferência de recursos. Essa
            transferência pode ser entre contas do sistema{' '}
            {customer.display_name}, contas bancárias de outras instituições e
            outras contas digitais de pagamento.
          </p>

          <p className="mt-4">
            É oferecido o serviço de pagamento de boletos e contas de consumo.
            Desde que possuam código de barras, valor definido e que estejam
            entre as contas conveniadas aceitas.
          </p>

          <p className="mt-4">
            É oferecido o serviço de emissão de boletos, cujo pagamento
            direciona os recursos diretamente para sua Conta{' '}
            {customer.display_name};
          </p>

          <p className="mt-4">
            É oferecido o serviço de emissão de QRCode PIX, cujo pagamento
            direciona os recursos diretamente para sua Conta{' '}
            {customer.display_name};
          </p>

          <p className="mt-1 text-base font-semibold leading-7 text-indigo-600">
            4. Responsabilidades e Regras de Uso
          </p>

          <p className="mt-4">
            A {customer.display_name}, o Parceiro e a Instituição Financeira não
            se responsabilizam pelas transações realizadas pelo Usuário em sua
            Conta, uma vez que não são parte de qualquer operação de compra e
            venda em estabelecimentos.
          </p>

          <p className="mt-4">
            O Usuário se compromete a não utilizar os Serviços da Conta{' '}
            {customer.display_name}
            para a realização de pagamentos ou transferências relacionadas a
            atividades ilegais, tais como, lavagem de dinheiro, estelionato,
            realização de fraudes contra terceiros, jogos de azar e apostas em
            geral, bem como relacionadas à compra e venda de produtos e serviços
            considerados ilegais pela legislação brasileira. A{' '}
            {customer.display_name}, o Parceiro e a Instituição Financeira se
            reservam no direito de imediatamente interromper o acesso à Conta
            pelo Usuário, caso identifique ou suspeite de má utilização ou uso
            inadequado da Conta.
          </p>

          <p className="mt-4">
            O Usuário confirma estar ciente de que é de total responsabilidade
            sua garantir a veracidade de quaisquer informações passadas para a
            {customer.display_name}, incluindo, mas não se limitando a,
            informações dos sócios, informações da empresa e informações sobre o
            uso dos Serviços. A{customer.display_name}, o Parceiro e a
            Instituição Financeira se reservam no direito de imediatamente
            interromper o acesso à Conta pelo Usuário, caso identifique ou
            suspeite de falsidade no conteúdo das informações.
          </p>

          <p className="mt-4">
            O Usuário se compromete a informar imediatamente quaisquer mudanças
            nos seus dados informados, como nome, número, endereço residencial,
            endereço comercial e e-mail.
          </p>

          <p className="mt-4">
            É responsabilidade do Usuário manter seu sistema protegido contra
            vírus e outros malwares, utilizando de ferramentas específicas para
            isso, como antivírus, firewall, entre outras. Bem como é obrigação
            do Usuário proteger suas senhas de acesso a Conta{' '}
            {customer.display_name} e senhas de 4 dígitos para autenticação de
            transações. Dessa forma, a {customer.display_name} não se
            responsabiliza por danos causados por vírus e malwares em
            decorrência de acesso, utilização ou navegação no site na internet
            ou como consequência da transferência de dados, arquivos, imagens,
            textos ou áudio contidos no mesmo. É de sua responsabilidade a
            certificação de estar acessando sua conta em redes seguras.
          </p>

          <p className="mt-4">
            Você como Usuário deve manter o seu celular em local seguro e com
            mecanismos restritivos de acesso aos seus aplicativos, nunca as
            divulgando e nem permitindo o seu uso por terceiros não autorizados.
            Você isenta a {customer.display_name} de qualquer responsabilidade
            pelo eventual acesso não autorizado de sua conta de e-mail,
            aplicativo e/ou número de telefone.
          </p>

          <p className="mt-4">
            O Usuário, bem como seus representantes e funcionários, não devem
            adotar, no âmbito da relação com a {customer.display_name}, condutas
            desrespeitosas, ofensivas, difamatórias, obscenas, ilegais ou
            realizar ameaças. Não devem realizar também a prática de SPAM ou
            qualquer tipo de atitudes contrárias às boas práticas da internet e
            das redes sociais. Podendo a {customer.display_name}, a seu
            exclusivo critério, bloquear ou excluir o Usuário nessas
            circunstâncias.
          </p>

          <p className="mt-4">
            Você isenta a {customer.display_name}, o Parceiro e a Instituição
            Financeira de qualquer responsabilidade referente a:
          </p>

          <p className="mt-4">
            (i) transações não realizadas em virtude da suspeita de crimes
            financeiros.
          </p>

          <p className="mt-4">
            (ii) transações realizadas por terceiros com o uso de suas senhas.
          </p>

          <p className="mt-4">
            (iii) transações realizadas por terceiros não autorizados em
            decorrência da falta de informe de bloqueio imediato da sua Conta
            {customer.display_name}, após furto, roubo e/ou perda do seu
            aparelho.
          </p>

          <p className="mt-4">
            É responsabilidade do Usuário consultar regularmente seu e-mail de
            contato cadastrado, assim como a caixa de spam, uma vez que todo
            contato feito pela {customer.display_name} se dará através deste
            canal. A responsabilidade de recebimento e visualização dos
            comunicados é do Usuário.
          </p>

          <p className="mt-4">
            É responsabilidade do Usuário inserir os dados corretos ao realizar
            transferências de recursos para contas {customer.display_name},
            contas bancárias de outras instituições e/ou outras contas de
            pagamentos de outras instituições. Qualquer erro, atraso, prejuízo
            ou dano causado devido ao cadastro de dados incorretos, incompletos
            ou desatualizados é de total responsabilidade do Usuário e de Sua
            Empresa.
          </p>

          <p className="mt-4">
            Tendo em vista as características inerentes ao ambiente da Internet
            e de tecnologia, o Usuário reconhece que A {customer.display_name},
            o Parceiro e a Instituição Financeira não se responsabilizam pelas
            falhas na plataforma decorrentes de circunstâncias alheias à sua
            vontade e controle, sejam ou não ocasionados por caso fortuito ou
            força maior, como: informações perdidas, incompletas, inválidas e/ou
            corrompidas; intervenções de hackers e software malicioso, falhas
            técnicas de qualquer tipo, incluindo, falhas no acesso ou na
            navegação do site decorrentes de falhas na Internet em geral, quedas
            de energia, mau funcionamento eletrônico ou físico de qualquer rede,
            interrupções ou suspensões de conexão e falhas de software e/ou
            hardware do Usuário; Paralisações para manutenção, atualização,
            migração e ajustes de configuração das Aplicações; Qualquer falha
            humana de qualquer outro tipo, que possa ocorrer durante o
            processamento das informações, eximindo-se de qualquer
            responsabilidade proveniente de tais fatos e/ou atos.
          </p>

          <p className="mt-1 text-base font-semibold leading-7 text-indigo-600">
            5. Uso do Cartão
          </p>

          <p className="mt-4">
            Assim que receber o Cartão físico, o Usuário deverá conferir todos
            os dados e realizar o desbloqueio por meio das Aplicações.
          </p>

          <p className="mt-4">
            A utilização do Cartão é formalizada com o uso da Senha ou, conforme
            o caso, por outros meios que caracterizam a sua expressa
            manifestação de vontade e concordância com a operação em questão,
            incluindo, sem limitação, pagamentos realizados por meio da
            tecnologia contactless (aproximação) e compras pela Internet.
          </p>

          <p className="mt-4">
            A {customer.display_name} poderá substituir o Cartão de Sua Empresa
            e/ou seus adicionais por Cartão equivalente ou superior, inclusive,
            alterar a Bandeira do referido Cartão. Isso pode ser feito a
            critério da {customer.display_name}
            ou da Bandeira. Sempre que possível, a {customer.display_name}{' '}
            informará referida substituição com antecedência mínima de 21 (vinte
            e um) dias.
          </p>

          <p className="mt-4">
            Como medida de segurança, a {customer.display_name} poderá bloquear
            ou limitar preventivamente ou reativamente o uso dos Cartões de sua
            Empresa caso verifique indícios ou confirmações de operações
            fraudulentas ou que fujam ao padrão de uso habitual.
          </p>

          <p className="mt-4">
            No caso do cancelamento de compra, Sua Empresa deverá obter junto ao
            estabelecimento, um comprovante de cancelamento.
          </p>

          <p className="mt-4">
            Sua Empresa deverá conferir todas as despesas lançadas em sua Fatura
            e/ou Extrato e, caso discorde de algum lançamento, deverá dar início
            a um processo de Chargeback, conforme descrito a seguir:
          </p>

          <p className="mt-4">
            (i) O Chargeback seguirá as regras estabelecidas pela Bandeira, pela
            {customer.display_name} e/ou pelo Parceiro, de forma que apenas será
            aprovado quando comprovado o erro ou o desacordo comercial que tenha
            gerado o débito indevido e não houver culpa exclusiva de Sua
            Empresa, nos termos das regras acima mencionadas.
          </p>

          <p className="mt-4">
            (ii) Uma vez aprovado o Chargeback, o valor será creditado na Conta
            {customer.display_name} de Sua Empresa, no prazo estabelecido pela
            Bandeira, pela
            {customer.display_name} e/ou pelo Parceiro, conforme aplicável.
          </p>

          <p className="mt-4">
            (iii) Sua Empresa aceita que os procedimentos de Chargeback somente
            serão considerados para compras no Cartão. Não estão previstos
            procedimentos de Chargeback
          </p>

          <p className="mt-4">
            Em caso de perda, extravio, furto ou roubo do Cartão de Sua Empresa,
            Você ou outro Usuário deve, imediatamente, acessar as Aplicações e
            selecionar a opção de bloqueio do cartão. Caso não seja possível
            realizar esse procedimento, Você deverá contatar imediatamente a
            equipe {customer.display_name} através dos Canais de Comunicação,
            onde será realizado o bloqueio do Cartão em até 24 (vinte e quatro)
            horas úteis. Você poderá solicitar um novo cartão posteriormente.
            Essa nova solicitação poderá estar sujeita a novos custos, conforme
            será informado ao Usuário na ocasião.
          </p>

          <p className="mt-1 text-base font-semibold leading-7 text-indigo-600">
            6. Cancelamento dos Serviços
          </p>

          <p className="mt-4">
            O Usuário poderá, a qualquer momento, solicitar o cancelamento de
            sua Conta e Cartão, mediante solicitação realizada pelos Canais de
            Comunicação. Uma vez efetuado o cancelamento, o Cartão será
            bloqueado e a Conta será definitivamente encerrada dentro do prazo
            máximo estabelecido na regulamentação aplicável, sendo facultado ao
            Titular (i) sacar o saldo remanescente; ou (ii) realizar sua
            transferência para outra conta.
          </p>

          <p className="mt-4">
            A {customer.display_name}, o Parceiro e a Instituição Financeiras se
            reservam no direito de cancelar a Conta e/ou Cartão do Usuário
            mediante seguintes condições:
          </p>

          <p className="mt-4">
            (i) Caso a Conta fique inativa e com saldo zerado por mais de 12
            meses consecutivos.
          </p>

          <p className="mt-4">
            (ii) Caso o Titular viole quaisquer das disposições destes Termos de
            Uso.
          </p>

          <p className="mt-4">
            (iii) Caso de má utilização ou uso inadequado dos Serviços por parte
            do Usuário.
          </p>

          <p className="mt-4">
            (iv) Caso sejam verificadas operações fora do padrão de uso, e o
            Titular deixe de atender pedido de envio de novos documentos para a
            comprovação da regularidade dessas operações.
          </p>

          <p className="mt-4">(v) Caso de extinção da Sua Empresa.</p>

          <p className="mt-4">
            Nos casos de cancelamento, a {customer.display_name} se reserva no
            direito de bloquear a entrada de recursos, cancelar as cobranças em
            aberto criadas pelo Usuário e solicitar ao Usuário uma nova conta
            bancária de mesmo titularidade da Conta {customer.display_name} para
            transferência dos recursos contidos nela.
          </p>

          <p className="mt-4">
            A Sua Empresa permanecerá responsável pelo pagamento dos valores e
            Tarifas devidos com relação às transações realizadas antes do
            efetivo cancelamento da Conta {customer.display_name}, sendo
            possível que haja dedução desses valores do saldo da Conta{' '}
            {customer.display_name}, se disponível.
          </p>

          <p className="mt-1 text-base font-semibold leading-7 text-indigo-600">
            7. Propriedade Intelectual
          </p>

          <p className="mt-4">
            Todos os direitos de propriedade intelectual relativos aos Serviços,
            bem como todas as suas funcionalidades, são de titularidade
            exclusiva da {customer.display_name}, do Parceira e/ou da
            Instituição Financeira
          </p>

          <p className="mt-4">
            É proibido usar, copiar, reproduzir, modificar, traduzir, publicar,
            transmitir, distribuir, executar, fazer o upload, exibir, licenciar,
            vender explorar ou fazer engenharia reversa dos textos, imagens,
            layouts, software, códigos, base de dados, gráficos, artigos,
            fotografias e demais conteúdos produzidos direta ou indiretamente
            pela {customer.display_name} ou pelo Parceiro. Qualquer uso não
            autorizado de algum conteúdo será considerado como violação dos
            direitos autorais e de propriedade intelectual.
          </p>

          <p className="mt-4">
            A {customer.display_name}, o Parceiro e a Instituição Financeira
            concedem ao Usuário uma licença limitada, temporária, não exclusiva,
            não transferível e revogável, para usar os Serviços e as Aplicações
            somente naquilo que seja estritamente necessário para o cumprimento
            das obrigações e exercício dos direitos previstos nestes Termos de
            Uso.
          </p>

          <p className="mt-4">
            Está vetado ao Usuário ceder, sublicenciar, doar, alienar, alugar,
            transmitir ou transferir os seus direitos e obrigações a terceiros,
            total ou parcialmente, sob quaisquer modalidades, a qualquer título,
            bem como é proibido adaptar, descompilar, desmontar ou executar
            engenharia reversa das Aplicações.
          </p>

          <p className="mt-4">
            Todos os textos, imagens, marcas e conteúdos de terceiros veiculados
            através das Aplicações são de propriedade de seus respectivos
            titulares, sendo expressamente proibida a utilização indevida de
            quaisquer conteúdos ou marcas apresentadas nas Aplicações.
          </p>

          <p className="mt-4">
            A {customer.display_name} se reserva no direito de alterar,
            simplificar, adicionar e remover funcionalidades, atualizar,
            descontinuar partes das Aplicações ou dos Serviços, temporária ou
            definitivamente, sem necessidade de aviso prévio ao Usuário e sem
            que lhe seja devida qualquer indenização.
          </p>

          <p className="mt-4">
            A {customer.display_name}, o Parceiro e a Instituição Financeira
            podem, a qualquer tempo e a seu critério, suspender, bloquear
            preventivamente ou cancelar o cadastro do Usuário nas Aplicações, em
            caso de mera suspeita de fraude, obtenção de benefício ou vantagem
            de forma ilícita, ou pelo não cumprimento de quaisquer condições
            previstas nestes Termos de Uso ou na legislação aplicável. Nesses
            casos, não será devida qualquer indenização ao Usuário. Poderão ser
            tomadas quaisquer medidas necessárias para preservar os interesses
            da {customer.display_name}, do Parceiro ou da Instituição
            Financeira.
          </p>

          <p className="mt-1 text-base font-semibold leading-7 text-indigo-600">
            8. Custos do Serviço
          </p>

          <p className="mt-4">
            Emissão de boletos e transferências bancárias podem gerar custos na
            Conta. Compras em estabelecimentos, pagamento de boletos e de contas
            de consumo não gerarão cobranças diretas por parte da{' '}
            {customer.display_name}.
          </p>

          <p className="mt-4">
            A {customer.display_name} poderá instituir, alterar ou deixar de
            cobrar quaisquer Tarifas, a qualquer momento, sempre informando Sua
            Empresa com antecedência mínima de 14 (quatorze) dias ou de acordo
            com a regulamentação aplicável.
          </p>

          <p className="mt-4">
            Ocorrendo a falta de pagamento de Tarifa ou qualquer obrigação
            assumida por Sua Empresa, será promovido registro junto aos órgãos
            de proteção de crédito, conforme pertinente.
          </p>

          <p className="mt-1 text-base font-semibold leading-7 text-indigo-600">
            9. Informações Adicionais
          </p>

          <p className="mt-4">
            Qualquer dúvida, reclamação ou solicitação deverá ser sempre
            encaminhada aos Canais de Comunicação e/ou de acordo com a forma
            descrita nestes Termos de Uso, de modo que qualquer outra forma de
            comunicação com a {customer.display_name} não será reconhecida.
          </p>

          <p className="mt-4">
            A {customer.display_name} não solicita ou exige a divulgação de
            senhas ou dados de Cartão. Outras informações nunca serão
            solicitadas por qualquer meio diferente dos Canais de Comunicação
            oficiais. Caso Sua Empresa receba qualquer comunicação com esse tipo
            de abordagem e conteúdo, deverá desconsiderar, não responder e, se
            possível, encaminhar o seu relato para nossos Canais de Comunicação.
          </p>

          <p className="mt-4">
            Estes Termos de Uso vigerão por prazo indeterminado, a partir de sua
            aceitação por Sua Empresa.
          </p>

          <p className="mt-4">
            Estes Termos de Uso e a Política de Privacidade são regidos pelas
            leis da República Federativa do Brasil.
          </p>

          <p className="mt-4">
            A {customer.display_name} se reserva no direito de alterar estes
            Termos de Uso sem aviso prévio ou posterior. Recomendamos que visite
            periodicamente essa página para ficar ciente das alterações. Caso as
            modificações realizadas sejam julgadas, a critério exclusivo da{' '}
            {customer.display_name}, como significativas e exijam uma nova
            autorização dos usuários, eles serão comunicados com antecedência.
            Optando por não aceitar os novos Termos de Uso, o Usuário deverá
            cancelar seu acesso aos Serviços.
          </p>
        </div>
      </div>
    </div>
  )
}

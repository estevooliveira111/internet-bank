const banksRaw = [
  {
    code: '',
    name: 'Selecione o banco -',
    description: 'Selecione o banco -',
  },
  {
    code: 1,
    name: 'Banco do Brasil S.A.',
    description: 'Banco do Brasil S.A.',
  },
  {
    code: 341,
    name: 'Itau Unibanco S.A',
    description: 'Itaú Unibanco S.A.',
  },
  {
    code: 237,
    name: 'Banco Bradesco S.A.',
    description: 'Banco Bradesco S.A.',
  },
  {
    code: 33,
    name: 'Banco Santander (Brasil) S.A.',
    description: 'Banco Santander (Brasil) S.A.',
  },
  {
    code: 104,
    name: 'Caixa Econômica Federal',
    description: 'Caixa Econômica Federal',
  },
  {
    code: 260,
    name: 'Nu Pagamentos S.A',
    description: 'Nu Pagamentos S.A',
  },
  {
    code: 77,
    name: 'Banco Inter S.A.',
    description: 'Banco Inter S.A.',
  },
  {
    code: 336,
    name: 'Banco C6 S.A.',
    description: 'Banco C6 S.A .',
  },
  {
    code: 756,
    name: 'Banco Cooperativo do Brasil S.A. – Bancoob',
    description: 'Banco Cooperativo do Brasil S.A. – Bancoob',
  },
  {
    code: 3,
    name: 'Banco da Amazônia S.A.',
    description: 'Banco da Amazônia S.A.',
  },
  {
    code: 4,
    name: 'Banco do Nordeste do Brasil S.A.',
    description: 'Banco do Nordeste do Brasil S.A.',
  },
  {
    code: 7,
    name: 'Banco Nacional de Desenvolvimento Econômico e Social – BNDES',
    description: 'Banco Nacional de Desenvolvimento Econômico e Social – BNDES',
  },
  {
    code: 10,
    name: 'Credicoamo Crédito Rural Cooperativa',
    description: 'Credicoamo Crédito Rural Cooperativa',
  },
  {
    code: 11,
    name: 'Credit Suisse Hedging-Griffo Corretora de Valores S.A.',
    description: 'Credit Suisse Hedging-Griffo Corretora de Valores S.A.',
  },
  {
    code: 12,
    name: 'Banco Inbursa S.A.',
    description: 'Banco Inbursa S.A.',
  },
  {
    code: 14,
    name: 'Natixis Brasil S.A. Banco Múltiplo',
    description: 'Natixis Brasil S.A. Banco Múltiplo',
  },
  {
    code: 15,
    name: 'UBS Brasil Corretora de Câmbio, Títulos e Valores Mobiliários S.A.',
    description:
      'UBS Brasil Corretora de Câmbio, Títulos e Valores Mobiliários S.A.',
  },
  {
    code: 16,
    name: 'Cooperativa de Crédito Mútuo dos Despachantes de Trânsito de Sta.Catarina e RS',
    description:
      'Cooperativa de Crédito Mútuo dos Despachantes de Trânsito de Sta.Catarina e RS',
  },
  {
    code: 17,
    name: 'BNY Mellon Banco S.A.',
    description: 'BNY Mellon Banco S.A.',
  },
  {
    code: 18,
    name: 'Banco Tricury S.A.',
    description: 'Banco Tricury S.A.',
  },
  {
    code: 21,
    name: 'Banco do Estado do Espírito Santo – Baneste S.A.',
    description: 'Banco do Estado do Espírito Santo – Baneste S.A.',
  },
  {
    code: 24,
    name: 'Banco Bandepe S.A.',
    description: 'Banco Bandepe S.A.',
  },
  {
    code: 25,
    name: 'Banco Alfa S.A.',
    description: 'Banco Alfa S.A.',
  },
  {
    code: 29,
    name: 'Banco Itau Consignado S.A.',
    description: 'Banco Itau Consignado S.A.',
  },
  {
    code: 37,
    name: 'Banco do Estado do Pará S.A.',
    description: 'Banco do Estado do Pará S.A.',
  },
  {
    code: 40,
    name: 'Banco Cargill S.A.',
    description: 'Banco Cargill S.A.',
  },
  {
    code: 41,
    name: 'Banco do Estado do Rio Grande do Sul S.A.',
    description: 'Banco do Estado do Rio Grande do Sul S.A.',
  },
  {
    code: 60,
    name: 'Confidence Corretora de Câmbio S.A.',
    description: 'Confidence Corretora de Câmbio S.A.',
  },
  {
    code: 62,
    name: 'Hipercard Banco Múltiplo S.A.',
    description: 'Hipercard Banco Múltiplo S.A.',
  },
  {
    code: 63,
    name: 'Banco Bradescard S.A.',
    description: 'Banco Bradescard S.A.',
  },
  {
    code: 64,
    name: 'Goldman Sachs do Brasil Banco Múltiplo S.A.',
    description: 'Goldman Sachs do Brasil Banco Múltiplo S.A.',
  },
  {
    code: 65,
    name: 'Banco Andbank (Brasil) S.A.',
    description: 'Banco Andbank (Brasil) S.A.',
  },
  {
    code: 66,
    name: 'Banco Morgan Stanley S.A.',
    description: 'Banco Morgan Stanley S.A.',
  },
  {
    code: 69,
    name: 'Banco Crefisa S.A.',
    description: 'Banco Crefisa S.A.',
  },
  {
    code: 70,
    name: 'Banco de Brasília S.A. (BRB)',
    description: 'Banco de Brasília S.A. (BRB)',
  },
  {
    code: 74,
    name: 'Banco J. Safra S.A.',
    description: 'Banco J. Safra S.A.',
  },
  {
    code: 75,
    name: 'Banco ABN Amro S.A.',
    description: 'Banco ABN Amro S.A.',
  },
  {
    code: 76,
    name: 'Banco KDB S.A.',
    description: 'Banco KDB S.A.',
  },
  {
    code: 78,
    name: 'Haitong Banco de Investimento do Brasil S.A.',
    description: 'Haitong Banco de Investimento do Brasil S.A.',
  },
  {
    code: 79,
    name: 'Banco Original do Agronegócio S.A.',
    description: 'Banco Original do Agronegócio S.A.',
  },
  {
    code: 80,
    name: 'BT Corretora de Câmbio Ltda.',
    description: 'BT Corretora de Câmbio Ltda.',
  },
  {
    code: 81,
    name: 'Banco Brasileiro de Negócios S.A. – BBN',
    description: 'Banco Brasileiro de Negócios S.A. – BBN',
  },
  {
    code: 82,
    name: 'Banco Topázio S.A.',
    description: 'Banco Topázio S.A.',
  },
  {
    code: 83,
    name: 'Banco da China Brasil S.A.',
    description: 'Banco da China Brasil S.A.',
  },
  {
    code: 84,
    name: 'Uniprime Norte do Paraná – Cooperativa de Crédito Ltda.',
    description: 'Uniprime Norte do Paraná – Cooperativa de Crédito Ltda.',
  },
  {
    code: 85,
    name: 'Cooperativa Central de Crédito Urbano – Cecred',
    description: 'Cooperativa Central de Crédito Urbano – Cecred',
  },
  {
    code: 88,
    name: 'Banco Randon S.A.',
    description: 'Banco Randon S.A.',
  },
  {
    code: 89,
    name: 'Cooperativa de Crédito Rural da Região da Mogiana',
    description: 'Cooperativa de Crédito Rural da Região da Mogiana',
  },
  {
    code: 91,
    name: 'Central de Cooperativas de Economia e Crédito Mútuo do Estado RS – Unicred',
    description:
      'Central de Cooperativas de Economia e Crédito Mútuo do Estado RS – Unicred',
  },
  {
    code: 92,
    name: 'Brickell (BRK) S.A. Crédito, Financiamento e Investimento',
    description: 'Brickell (BRK) S.A. Crédito, Financiamento e Investimento',
  },
  {
    code: 93,
    name: 'Pólocred Sociedade de Crédito ao Microempreendedor e Empresa de Pequeno Porte',
    description:
      'Pólocred Sociedade de Crédito ao Microempreendedor e Empresa de Pequeno Porte',
  },
  {
    code: 94,
    name: 'Banco Finaxis S.A.',
    description: 'Banco Finaxis S.A.',
  },
  {
    code: 95,
    name: 'Banco Confidence de Câmbio S.A.',
    description: 'Banco Confidence de Câmbio S.A.',
  },
  {
    code: 96,
    name: 'Banco BM&FBovespa',
    description: 'Banco BM&FBovespa',
  },
  {
    code: 97,
    name: 'Cooperativa Central de Crédito Noroeste Brasileiro Ltda. (CentralCredi)',
    description:
      'Cooperativa Central de Crédito Noroeste Brasileiro Ltda. (CentralCredi)',
  },
  {
    code: 99,
    name: 'Uniprime Central – Central Interestadual de Cooperativas de Crédito Ltda.',
    description:
      'Uniprime Central – Central Interestadual de Cooperativas de Crédito Ltda.',
  },
  {
    code: 100,
    name: 'Planner Corretora de Valores S.A.',
    description: 'Planner Corretora de Valores S.A.',
  },
  {
    code: 101,
    name: 'Renascença Distribuidora de Títulos e Valores Mobiliários Ltda.',
    description:
      'Renascença Distribuidora de Títulos e Valores Mobiliários Ltda.',
  },
  {
    code: 102,
    name: 'XP Investimentos Corretora de Câmbio, Títulos e Valores Mobiliários S/A',
    description:
      'XP Investimentos Corretora de Câmbio, Títulos e Valores Mobiliários S/A',
  },
  {
    code: 105,
    name: 'Lecca Crédito, Financiamento e Investimento S/A',
    description: 'Lecca Crédito, Financiamento e Investimento S/A',
  },
  {
    code: 107,
    name: 'Banco Bocom BBM S.A.',
    description: 'Banco Bocom BBM S.A.',
  },
  {
    code: 108,
    name: 'PortoCred S.A. Crédito, Financiamento e Investimento',
    description: 'PortoCred S.A. Crédito, Financiamento e Investimento',
  },
  {
    code: 111,
    name: 'Oliveira Trust Distribuidora de Títulos e Valores Mobiliários S.A.',
    description:
      'Oliveira Trust Distribuidora de Títulos e Valores Mobiliários S.A.',
  },
  {
    code: 113,
    name: 'Magliano S.A. Corretora de Cambio e Valores Mobiliarios',
    description: 'Magliano S.A. Corretora de Cambio e Valores Mobiliarios',
  },
  {
    code: 114,
    name: 'Central Cooperativa de Crédito no Estado do Espírito Santo – CECOOP',
    description:
      'Central Cooperativa de Crédito no Estado do Espírito Santo – CECOOP',
  },
  {
    code: 117,
    name: 'Advanced Corretora de Câmbio Ltda.',
    description: 'Advanced Corretora de Câmbio Ltda.',
  },
  {
    code: 118,
    name: 'Standard Chartered Bank (Brasil) S.A. Banco de Investimento',
    description: 'Standard Chartered Bank (Brasil) S.A. Banco de Investimento',
  },
  {
    code: 119,
    name: 'Banco Western Union do Brasil S.A.',
    description: 'Banco Western Union do Brasil S.A.',
  },
  {
    code: 120,
    name: 'Banco Rodobens S.A.',
    description: 'Banco Rodobens S.A.',
  },
  {
    code: 121,
    name: 'Banco Agibank S.A.',
    description: 'Banco Agibank S.A.',
  },
  {
    code: 122,
    name: 'Banco Bradesco BERJ S.A.',
    description: 'Banco Bradesco BERJ S.A.',
  },
  {
    code: 124,
    name: 'Banco Woori Bank do Brasil S.A.',
    description: 'Banco Woori Bank do Brasil S.A.',
  },
  {
    code: 125,
    name: 'Banco Brasil Plural S.A. – Banco Múltiplo',
    description: 'Banco Brasil Plural S.A. – Banco Múltiplo',
  },
  {
    code: 126,
    name: 'BR Partners Banco de Investimento S.A.',
    description: 'BR Partners Banco de Investimento S.A.',
  },
  {
    code: 127,
    name: 'Codepe Corretora de Valores e Câmbio S.A.',
    description: 'Codepe Corretora de Valores e Câmbio S.A.',
  },
  {
    code: 128,
    name: 'MS Bank S.A. Banco de Câmbio',
    description: 'MS Bank S.A. Banco de Câmbio',
  },
  {
    code: 129,
    name: 'UBS Brasil Banco de Investimento S.A.',
    description: 'UBS Brasil Banco de Investimento S.A.',
  },
  {
    code: 130,
    name: 'Caruana S.A. Sociedade de Crédito, Financiamento e Investimento',
    description:
      'Caruana S.A. Sociedade de Crédito, Financiamento e Investimento',
  },
  {
    code: 131,
    name: 'Tullett Prebon Brasil Corretora de Valores e Câmbio Ltda.',
    description: 'Tullett Prebon Brasil Corretora de Valores e Câmbio Ltda.',
  },
  {
    code: 132,
    name: 'ICBC do Brasil Banco Múltiplo S.A.',
    description: 'ICBC do Brasil Banco Múltiplo S.A.',
  },
  {
    code: 133,
    name: 'Cresol – Confederação Nacional Cooperativas Centrais de Crédito e Econ Familiar',
    description:
      'Cresol – Confederação Nacional Cooperativas Centrais de Crédito e Econ Familiar',
  },
  {
    code: 134,
    name: 'BGC Liquidez Distribuidora de Títulos e Valores Mobiliários Ltda.',
    description:
      'BGC Liquidez Distribuidora de Títulos e Valores Mobiliários Ltda.',
  },
  {
    code: 135,
    name: 'Gradual Corretora de Câmbio, Títulos e Valores Mobiliários S.A.',
    description:
      'Gradual Corretora de Câmbio, Títulos e Valores Mobiliários S.A.',
  },
  {
    code: 136,
    name: 'Confederação Nacional das Cooperativas Centrais Unicred Ltda (Unicred do Brasil)',
    description:
      'Confederação Nacional das Cooperativas Centrais Unicred Ltda (Unicred do Brasil)',
  },
  {
    code: 137,
    name: 'Multimoney Corretora de Câmbio Ltda',
    description: 'Multimoney Corretora de Câmbio Ltda',
  },
  {
    code: 138,
    name: 'Get Money Corretora de Câmbio S.A.',
    description: 'Get Money Corretora de Câmbio S.A.',
  },
  {
    code: 139,
    name: 'Intesa Sanpaolo Brasil S.A. – Banco Múltiplo',
    description: 'Intesa Sanpaolo Brasil S.A. – Banco Múltiplo',
  },
  {
    code: 140,
    name: 'Easynvest – Título Corretora de Valores SA',
    description: 'Easynvest – Título Corretora de Valores SA',
  },
  {
    code: 142,
    name: 'Broker Brasil Corretora de Câmbio Ltda.',
    description: 'Broker Brasil Corretora de Câmbio Ltda.',
  },
  {
    code: 143,
    name: 'Treviso Corretora de Câmbio S.A.',
    description: 'Treviso Corretora de Câmbio S.A.',
  },
  {
    code: 144,
    name: 'Bexs Banco de Câmbio S.A.',
    description: 'Bexs Banco de Câmbio S.A.',
  },
  {
    code: 145,
    name: 'Levycam – Corretora de Câmbio e Valores Ltda.',
    description: 'Levycam – Corretora de Câmbio e Valores Ltda.',
  },
  {
    code: 146,
    name: 'Guitta Corretora de Câmbio Ltda.',
    description: 'Guitta Corretora de Câmbio Ltda.',
  },
  {
    code: 149,
    name: 'Facta Financeira S.A. – Crédito Financiamento e Investimento',
    description: 'Easynvest – Título Corretora de Valores SA',
  },
  {
    code: 157,
    name: 'ICAP do Brasil Corretora de Títulos e Valores Mobiliários Ltda.',
    description: 'Broker Brasil Corretora de Câmbio Ltda.',
  },
  {
    code: 159,
    name: 'Casa do Crédito S.A. Sociedade de Crédito ao Microempreendedor',
    description:
      'Casa do Crédito S.A. Sociedade de Crédito ao Microempreendedor',
  },
  {
    code: 163,
    name: 'Commerzbank Brasil S.A. – Banco Múltiplo',
    description: 'Commerzbank Brasil S.A. – Banco Múltiplo',
  },
  {
    code: 169,
    name: 'Banco Olé Bonsucesso Consignado S.A.',
    description: 'Banco Olé Bonsucesso Consignado S.A.',
  },
  {
    code: 172,
    name: 'Albatross Corretora de Câmbio e Valores S.A ',
    description: 'Albatross Corretora de Câmbio e Valores S.A ',
  },
  {
    code: 173,
    name: 'BRL Trust Distribuidora de Títulos e Valores Mobiliários S.A.',
    description:
      'BRL Trust Distribuidora de Títulos e Valores Mobiliários S.A.',
  },
  {
    code: 174,
    name: 'Pernambucanas Financiadora S.A. Crédito, Financiamento e Investimento',
    description:
      'Pernambucanas Financiadora S.A. Crédito, Financiamento e Investimento',
  },
  {
    code: 177,
    name: 'Guide Investimentos S.A. Corretora de Valores',
    description: 'Guide Investimentos S.A. Corretora de Valores',
  },
  {
    code: 182,
    name: 'Dacasa Financeira S/A – Sociedade de Crédito, Financiamento e Investimento ',
    description:
      'Dacasa Financeira S/A – Sociedade de Crédito, Financiamento e Investimento ',
  },
  {
    code: 183,
    name: 'Socred S.A. – Sociedade de Crédito ao Microempreendedor',
    description: 'Socred S.A. – Sociedade de Crédito ao Microempreendedor',
  },
  {
    code: 184,
    name: 'Banco Itau BBA S.A.',
    description: 'Banco Itau BBA S.A.',
  },
  {
    code: 188,
    name: 'Ativa Investimentos S.A. Corretora de Títulos Câmbio e Valores',
    description:
      'Ativa Investimentos S.A. Corretora de Títulos Câmbio e Valores',
  },
  {
    code: 189,
    name: 'HS Financeira S/A Crédito, Financiamento e Investimentos',
    description: 'HS Financeira S/A Crédito, Financiamento e Investimentos',
  },
  {
    code: 190,
    name: 'Servicoop – Cooperativa de Economia e Crédito Mútuo dos Servidores Públicos Estaduais do Rio ',
    description:
      'Servicoop – Cooperativa de Economia e Crédito Mútuo dos Servidores Públicos Estaduais do Rio',
  },
  {
    code: 191,
    name: 'Nova Futura Corretora de Títulos e Valores Mobiliários Ltda.',
    description: 'Nova Futura Corretora de Títulos e Valores Mobiliários Ltda.',
  },
  {
    code: 194,
    name: 'Parmetal Distribuidora de Títulos e Valores Mobiliários Ltda.',
    description:
      'Parmetal Distribuidora de Títulos e Valores Mobiliários Ltda.',
  },
  {
    code: 196,
    name: 'Fair Corretora de Câmbio S.A.',
    description: 'Fair Corretora de Câmbio S.A.',
  },
  {
    code: 197,
    name: 'Stone Pagamentos S.A.',
    description: 'Stone Pagamentos S.A.',
  },
  {
    code: 204,
    name: 'Banco Bradesco Cartões S.A.',
    description: 'Banco Bradesco Cartões S.A.',
  },
  {
    code: 208,
    name: 'Banco BTG Pactual S.A.',
    description: 'Banco BTG Pactual S.A.',
  },
  {
    code: 212,
    name: 'Banco Original S.A.',
    description: 'Banco Original S.A.',
  },
  {
    code: 213,
    name: 'Banco Arbi S.A.',
    description: 'Banco Arbi S.A.',
  },
  {
    code: 217,
    name: 'Banco John Deere S.A.',
    description: 'Banco John Deere S.A.',
  },
  {
    code: 218,
    name: 'Banco BS2 S.A.',
    description: 'Banco BS2 S.A.',
  },
  {
    code: 222,
    name: 'Banco Credit Agricole Brasil S.A.',
    description: 'Banco Credit Agricole Brasil S.A.',
  },
  {
    code: 224,
    name: 'Banco Fibra S.A.',
    description: 'Banco Fibra S.A.',
  },
  {
    code: 233,
    name: 'Banco Cifra S.A.',
    description: 'Banco Cifra S.A.',
  },
  {
    code: 241,
    name: 'Banco Clássico S.A.',
    description: 'Banco Clássico S.A.',
  },
  {
    code: 243,
    name: 'Banco Máxima S.A.',
    description: 'Banco Máxima S.A.',
  },
  {
    code: 246,
    name: 'Banco ABC Brasil S.A.',
    description: 'Banco ABC Brasil S.A.',
  },
  {
    code: 248,
    name: 'Banco Boavista Interatlântico S.A.',
    description: 'Banco Boavista Interatlântico S.A.',
  },
  {
    code: 249,
    name: 'Banco Investcred Unibanco S.A.',
    description: 'Banco Investcred Unibanco S.A.',
  },
  {
    code: 250,
    name: 'Banco de Crédito e Varejo S.A. – BCV',
    description: 'Banco de Crédito e Varejo S.A. – BCV',
  },
  {
    code: 253,
    name: 'Bexs Corretora de Câmbio S.A.',
    description: 'Bexs Corretora de Câmbio S.A.',
  },
  {
    code: 254,
    name: 'Paraná Banco S.A.',
    description: 'Paraná Banco S.A.',
  },
  {
    code: 265,
    name: 'Banco Fator S.A.',
    description: 'Banco Fator S.A.',
  },
  {
    code: 266,
    name: 'Banco Cédula S.A.',
    description: 'Banco Cédula S.A.',
  },
  {
    code: 320,
    name: 'China Construction Bank (Brasil) Banco Múltiplo S.A.',
    description: 'China Construction Bank (Brasil) Banco Múltiplo S.A.',
  },
  {
    code: 366,
    name: 'Banco Société Générale Brasil S.A.',
    description: 'Banco Société Générale Brasil S.A.',
  },
  {
    code: 370,
    name: 'Banco Mizuho do Brasil S.A.',
    description: 'Banco Mizuho do Brasil S.A.',
  },
  {
    code: 376,
    name: 'Banco J. P. Morgan S.A.',
    description: 'Banco J. P. Morgan S.A.',
  },
  {
    code: 394,
    name: 'Banco Bradesco Financiamentos S.A.',
    description: 'Banco Bradesco Financiamentos S.A.',
  },
  {
    code: 412,
    name: 'Banco Capital S.A.',
    description: 'Banco Capital S.A.',
  },
  {
    code: 456,
    name: 'Banco MUFG Brasil S.A.',
    description: 'Banco MUFG Brasil S.A.',
  },
  {
    code: 464,
    name: 'Banco Sumitomo Mitsui Brasileiro S.A.',
    description: 'Banco Sumitomo Mitsui Brasileiro S.A.',
  },
  {
    code: 473,
    name: 'Banco Caixa Geral – Brasil S.A.',
    description: 'Banco Caixa Geral – Brasil S.A.',
  },
  {
    code: 477,
    name: 'Citibank N.A.',
    description: 'Citibank N.A.',
  },
  {
    code: 479,
    name: 'Banco ItauBank S.A',
    description: 'Banco ItauBank S.A',
  },
  {
    code: 487,
    name: 'Deutsche Bank S.A. – Banco Alemão',
    description: 'Deutsche Bank S.A. – Banco Alemão',
  },
  {
    code: 488,
    name: 'JPMorgan Chase Bank, National Association',
    description: 'JPMorgan Chase Bank, National Association',
  },
  {
    code: 492,
    name: 'ING Bank N.V.',
    description: 'ING Bank N.V.',
  },
  {
    code: 494,
    name: 'Banco de La Republica Oriental del Uruguay',
    description: 'Banco de La Republica Oriental del Uruguay',
  },
  {
    code: 495,
    name: 'Banco de La Provincia de Buenos Aires',
    description: 'Banco de La Provincia de Buenos Aires',
  },
  {
    code: 505,
    name: 'Banco Credit Suisse (Brasil) S.A.',
    description: 'Banco Credit Suisse (Brasil) S.A.',
  },
  {
    code: 545,
    name: 'Senso Corretora de Câmbio e Valores Mobiliários S.A. ',
    description: 'Senso Corretora de Câmbio e Valores Mobiliários S.A. ',
  },
  {
    code: 600,
    name: 'Banco Luso Brasileiro S.A.',
    description: 'Banco Luso Brasileiro S.A.',
  },
  {
    code: 604,
    name: 'Banco Industrial do Brasil S.A.',
    description: 'Banco Industrial do Brasil S.A.',
  },
  {
    code: 610,
    name: 'Banco VR S.A.',
    description: 'Banco VR S.A.',
  },
  {
    code: 611,
    name: 'Banco Paulista S.A.',
    description: 'Banco Paulista S.A.',
  },
  {
    code: 612,
    name: 'Banco Guanabara S.A.',
    description: 'Banco Guanabara S.A.',
  },
  {
    code: 613,
    name: 'Omni Banco S.A. ',
    description: 'Omni Banco S.A. ',
  },
  {
    code: 623,
    name: 'Banco Pan S.A.',
    description: 'Banco Pan S.A.',
  },
  {
    code: 626,
    name: 'Banco Ficsa S.A.',
    description: 'Banco Ficsa S.A.',
  },
  {
    code: 630,
    name: 'Banco Intercap S.A.',
    description: 'Banco Intercap S.A.',
  },
  {
    code: 633,
    name: 'Banco Rendimento S.A.',
    description: 'Banco Rendimento S.A.',
  },
  {
    code: 634,
    name: 'Banco Triângulo S.A.',
    description: 'Banco Triângulo S.A.',
  },
  {
    code: 637,
    name: 'Banco Sofisa S.A.',
    description: 'Banco Sofisa S.A.',
  },
  {
    code: 641,
    name: 'Banco Alvorada S.A.',
    description: 'Banco Alvorada S.A.',
  },
  {
    code: 643,
    name: 'Banco Pine S.A.',
    description: 'Banco Pine S.A.',
  },
  {
    code: 652,
    name: 'Banco Itau Unibanco Holding S.A.',
    description: 'Banco Itau Unibanco Holding S.A.',
  },
  {
    code: 653,
    name: 'Banco Indusval S.A.',
    description: 'Banco Indusval S.A.',
  },
  {
    code: 654,
    name: 'Banco A.J. Renner S.A.',
    description: 'Banco A.J. Renner S.A.',
  },
  {
    code: 655,
    name: 'Banco Votorantim S.A.',
    description: 'Banco Votorantim S.A.',
  },
  {
    code: 707,
    name: 'Banco Daycoval S.A.',
    description: 'Banco Daycoval S.A.',
  },
  {
    code: 712,
    name: 'Banco Ourinvest S.A.',
    description: 'Banco Ourinvest S.A.',
  },
  {
    code: 719,
    name: 'Banco Internacional do Funchal (Brasil) S.A. – Banif',
    description: 'Banco Internacional do Funchal (Brasil) S.A. – Banif',
  },
  {
    code: 735,
    name: 'Banco Neon S.A.',
    description: 'Banco Pine S.A.',
  },
  {
    code: 739,
    name: 'Banco Cetelem S.A.',
    description: 'Banco Cetelem S.A.',
  },
  {
    code: 740,
    name: 'Banco Barclays S.A.',
    description: 'Banco Barclays S.A.',
  },
  {
    code: 268,
    name: 'Barigui Companhia Hipotecária',
    description: 'Barigui Companhia Hipotecária',
  },
  {
    code: 269,
    name: 'HSBC Brasil S.A. Banco de Investimento',
    description: 'HSBC Brasil S.A. Banco de Investimento',
  },
  {
    code: 271,
    name: 'IB Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.',
    description: 'IB Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.',
  },
  {
    code: 300,
    name: 'Banco de La Nacion Argentina',
    description: 'Banco de La Nacion Argentina',
  },
  {
    code: 318,
    name: 'Banco BMG S.A.',
    description: 'Banco BMG S.A.',
  },
  {
    code: 399,
    name: 'HSBC Bank Brasil S.A. - Banco Múltiplo',
    description: 'HSBC Bank Brasil S.A. - Banco Múltiplo',
  },
  {
    code: 745,
    name: 'Banco Citibank S.A.',
    description: 'Banco Citibank S.A.',
  },
  {
    code: 47,
    name: 'Banco do Estado de Sergipe S.A.',
    description: 'Banco do Estado de Sergipe S.A.',
  },
  {
    code: 389,
    name: 'Banco Mercantil do Brasil S.A.',
    description: 'Banco Mercantil do Brasil S.A.',
  },
  {
    code: 422,
    name: 'Banco Safra S.A.',
    description: 'Banco Safra S.A.',
  },
  {
    code: 748,
    name: 'Banco Cooperativo Sicredi S.A.',
    description: 'Banco Cooperativo Sicredi S.A.',
  },
  {
    code: 741,
    name: 'Banco Ribeirão Preto S.A.',
    description: 'Banco Ribeirão Preto S.A.',
  },
  {
    code: 743,
    name: 'Banco Semear S.A.',
    description: 'Banco Semear S.A.',
  },
  {
    code: 746,
    name: 'Banco Modal S.A.',
    description: 'Banco Modal S.A.',
  },
  {
    code: 747,
    name: 'Banco Rabobank International Brasil S.A.',
    description: 'Banco Rabobank International Brasil S.A.',
  },
  {
    code: 751,
    name: 'Scotiabank Brasil S.A. Banco Múltiplo',
    description: 'Scotiabank Brasil S.A. Banco Múltiplo',
  },
  {
    code: 752,
    name: 'Banco BNP Paribas Brasil S.A.',
    description: 'Banco BNP Paribas Brasil S.A.',
  },
  {
    code: 753,
    name: 'Novo Banco Continental S.A. – Banco Múltiplo',
    description: 'Novo Banco Continental S.A. – Banco Múltiplo',
  },
  {
    code: 754,
    name: 'Banco Sistema S.A.',
    description: 'Banco Sistema S.A.',
  },
  {
    code: 755,
    name: 'Bank of America Merrill Lynch Banco Múltiplo S.A.',
    description: 'Bank of America Merrill Lynch Banco Múltiplo S.A.',
  },
  {
    code: 757,
    name: 'Banco Keb Hana do Brasil S.A.',
    description: 'Banco Keb Hana do Brasil S.A.',
  },
  {
    code: 278,
    name: 'Genial Investimentos Cvm S.A',
    description: 'Genial Investimentos Cvm S.A',
  },
  {
    code: 403,
    name: 'Cora Sociedade de Crédito Direto S.A.',
    description: 'Cora Sociedade de Crédito Direto S.A.',
  },
  {
    code: 332,
    name: 'Acesso Soluções de Pagamento S.A.',
    description: 'Acesso Soluções de Pagamento S.A.',
  },
  {
    code: 323,
    name: 'Mercado Pago – Conta Do Mercado Livre',
    description: 'Mercado Pago – Conta Do Mercado Livre',
  },
  {
    code: 290,
    name: 'PagSeguro Internet S.A.',
    description: 'PagSeguro Internet S.A.',
  },
  {
    code: 380,
    name: 'PICPAY SERVICOS S.A.',
    description: 'PICPAY SERVICOS S.A.',
  },
  {
    code: 450,
    name: 'Fitbank Instituicao De Pagamentos Eletronicos S.A.',
    description: 'Fitbank Instituicao De Pagamentos Eletronicos S.A.',
  },
]

export const banks = banksRaw.map((bank) => {
  return {
    id: bank.code,
    name: `${bank.code ?? ''} - ${bank.name}`,
    hidden: `${String(bank.code)} ${String(bank.name).toLocaleLowerCase()}`,
  }
})

import { FormatMonetaryValue } from './FormatMonetaryValue'

export const shareMessageWithDetailsAndQRCode = (amount, QRCode) => {
  const message = `Prezado(a),

    Seguem abaixo as informações necessárias para efetuar o pagamento utilizando PIX:
  
    - Tipo de Pagamento: PIX
    - Valor: ${FormatMonetaryValue(amount)}
    - Código de Pagamento: ${QRCode}
    
    Agradecemos desde já pela sua preferência.
    `

  return message
}
export const ShareMessageQRCodeOnly = (QRCode) => {
  const message = `Prezado(a), Segue abaixo nosso código PIX para efetuar o pagamento:

Código de pagamento: ${QRCode}

Agradecemos desde já pela sua preferência.`

  return message
}

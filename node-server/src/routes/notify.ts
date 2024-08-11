import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import twilio, { Twilio } from 'twilio'
import cron from 'node-cron'
import { loadExistingData } from '../utils/data'

dotenv.config()

const router = express.Router()

const TWILIO_PHONE_NUMBER = '+19388677873'
const TWILIO_ACCOUNT_SID = 'AC6d4cb78df0edddd94dd9b3e88ed781ca'
const TWILIO_AUTH_TOKEN = '1e7faf19ec5579d06fc86756eeb02357'

if (!TWILIO_PHONE_NUMBER || !TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN)
  throw new Error('Variáveis de ambiente Twilio não configuradas corretamente.')

const client: Twilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

interface Event {
  phoneNumber: string
  targetValue: number
}

let events: Event[] = []

router.post('/', (req: Request, res: Response) => {
  const { phoneNumber, targetValue } = req.body

  if (!phoneNumber) {
    console.warn('Número de telefone ausente')
    return res.status(400).json({
      status: 'error',
      message: 'Número de telefone é obrigatório.',
    })
  }

  const parsedTargetValue = parseFloat(targetValue)
  if (isNaN(parsedTargetValue)) {
    console.warn('Valor alvo inválido')
    return res.status(400).json({
      status: 'error',
      message: 'Valor alvo deve ser um número.',
    })
  }

  const event: Event = { phoneNumber, targetValue: parsedTargetValue }
  events.push(event)

  console.log(`Evento registrado: ${JSON.stringify(event)}`)
  return res.status(201).json({
    status: 'success',
    message: `Notificação registrada com sucesso. Você será alertado quando o dólar atingir R$${event.targetValue}.`,
    data: event,
  })
})

const sendSMS = async (phoneNumber: string, message: string) => {
  try {
    const messageInfo = await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: `+55${phoneNumber}`,
    })
    console.log(`SMS enviado: ${messageInfo.sid} para ${phoneNumber}`)
  } catch (error) {
    console.error(`Falha ao enviar SMS para ${phoneNumber}:`, error)
  }
}

const verifyDollarValue = async () => {
  try {
    const data = loadExistingData()

    if (data.length === 0) {
      console.error('Dados de dólar indisponíveis')
      return
    }

    const latestDollarValue = data[data.length - 1].price
    console.log(`Valor atual do dólar: R$${latestDollarValue}`)

    events = events.filter(event => {
      console.log(`Verificando evento: ${event.phoneNumber} - Alvo: R$${event.targetValue}`)

      if (latestDollarValue > event.targetValue) return true

      const notificationMessage = `Alerta! O dólar atingiu R$${latestDollarValue}, conforme o valor de R$${event.targetValue} que você definiu.`
      sendSMS(event.phoneNumber, notificationMessage)
      console.log(`Evento notificado e removido: ${event.phoneNumber}`)
      return false
    })
  } catch (error) {
    console.error('Erro ao verificar valor do dólar:', error)
  }
}

cron.schedule('*/1 * * * *', async () => {
// cron.schedule('0 */2 * * *', async () => {
  console.log('Iniciando verificação do valor do dólar...')
  await verifyDollarValue()
})

export default router

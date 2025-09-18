import axios from 'axios'

export async function sendMessageToTelegram(data: any) {
  await axios.post('/api/send', data)
}
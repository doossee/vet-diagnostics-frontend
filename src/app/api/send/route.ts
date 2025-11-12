import axios from 'axios'
import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TG_BOT_TOKEN
const BOT_USER = process.env.TG_BOT_USER

function escapeMarkdown(text: string) {
  return text?.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // console.log(body);
    
    const text = `
🚨 *Новый отчёт об ошибке*

💼 *Пройект:* Ветеринария
👤 *Пользователь:* ${escapeMarkdown(body.user)}
💬 *Сообщение:* ${escapeMarkdown(body.message)}

📁 *Файл:* ${escapeMarkdown(body.file)}
📄 *Страница:* ${escapeMarkdown(body.page)}
🧠 *Тип:* ${escapeMarkdown(body.type)}

💻 *Браузер:* ${escapeMarkdown(body.browser)}
🖥️ *ОС:* ${escapeMarkdown(body.os)}
📱 *Экран:* ${escapeMarkdown(body.screen)}
🌎 *Язык:* ${escapeMarkdown(body.lang)}

🕓 *Дата:* ${escapeMarkdown(new Date().toLocaleString("ru-RU"))}`;
// ━━━━━━━━━━━━━━━━━━
// \`\`\`
// ${escapeMarkdown(body.stack || "Без стека")}
// \`\`\`

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: BOT_USER,
      text,
      parse_mode: "MarkdownV2"
    })

    return new NextResponse("ok")
  } catch (error) {
    console.log(error);
    return new NextResponse("error")
  }
}
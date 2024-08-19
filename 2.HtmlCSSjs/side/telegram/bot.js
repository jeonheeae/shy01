require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT1;

const bot = new TelegramBot(token, { polling: true });

// bot.onText(/(안녕)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = "안녕하세요~"; //match[1]
//   bot.sendMessage(chatId, resp);
// });
bot.onText(/(아이유)/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log(match.input);
  const resp = "AgACAgUAAxkBAAM9Zr7K2lP5DQsBz5yShGjsyw6uqQ0AAojCMRt0gPhV3U_KwAQMg2cBAAMCAAN5AAM1BA";
  // bot.sendMessage(chatId, resp);
  bot.sendPhoto(chatId, resp);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
  bot.sendMessage(chatId, "봇이 당신의 말을 들었습니다.");
});

console.log("봇이 가동되었습니다.");

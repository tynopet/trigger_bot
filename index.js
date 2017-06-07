const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const buildNotification = (msg, count) => {
  const name = msg.from.username ? '@' + msg.from.username : msg.from.first_name;
  const bingoCount = count > 1 ? ` x${count}` : '';
  return `${name} выбивает бинго${bingoCount}`;
};

const createBot = (bingo) => {
  const port = process.env.PORT || 8443;
  const host = process.env.HOST;
  const bot = new TelegramBot(process.env.TOKEN, {
    polling: true,
    webHook: { port: port, host: host }
  });

  bot.onText(/\/ступени/, function (msg) {
    var chat_id = msg.chat.id;
    var resp = '@Tynopet @nastenkamurr @stop_kran @shellwiz @sinstarker @ustits ступени го';
    bot.sendMessage(chat_id, resp);
  });

  bot.on('message', (message) => {
    const chatId = message.chat.id;
    if (message.text) {
      const msg = message.text.toLowerCase();
      bingoCount = bingo.reduce((acc, w) => msg.search(w) !== -1 ? acc + 1 : acc, 0)
      if (bingoCount) {
        bot.sendMessage(chatId, '`Звуки бинго`');
        bot.sendMessage(chatId, buildNotification(message, bingoCount));
      }
    }
  });
}

fs.readFile(`${__dirname}/words.txt`, 'utf8', (err, data) => {
  if (err) console.error(err);
  const bingo = data.split(', ');
  createBot(bingo);
})
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');
const dateFns = require('date-fns');

const kakoy = [
  'странный', 'зашкваренный', 'батутный', 'дерзкий',
  'селинский', 'ретроградский', 'хайповый', 'фреймворковый',
  'версусовый', 'деревенский', 'олимпиадный', 'мгсушный',
  'марийский', 'сосаковский', 'ступенчатый', 'армаковский',
  'оракловый', 'джавовый', 'джаваскриптовый', 'питоновский',
  'фронтендовый', 'бекендовый', 'тестировочный', 'суппортовый',
  'девелопный', 'стейбловый', 'анстейбловый', 'бесюганский',
  'тткшный', 'совещательный', 'ронятельский', 'поднимательский',
  'твиксовый', 'местный', 'местный', 'текстайловый', 'нижний',
];

let cache = {};
let lastCleanCacheDate = new Date();

const getKakoy = (userId) => {
  const currentDate = dateFns.startOfDay(new Date());
  const cleanCacheDate = dateFns.startOfDay(dateFns.addDays(lastCleanCacheDate, 1));
  if (dateFns.isBefore(cleanCacheDate, currentDate)) {
    cache = {};
    lastCleanCacheDate = new Date();
  }

  if (cache[userId]) return cache[userId];
  const parameters = Math.round(Math.random() * 3) + 2;
  let result = '';
  let tmp = [...kakoy];
  for (let i = 0; i < parameters; i++) {
    const idx = Math.round(Math.random() * (tmp.length - 1));
    result += tmp[idx] + ' ';
    tmp = tmp.filter(el => el !== tmp[idx]);
  }
  cache[userId] = result;
  return result;
};

const buildNotification = (msg, count) => {
  const name = msg.from.username ? '@' + msg.from.username : msg.from.first_name;
  const bingoCount = count > 1 ? ` x${count}` : '';
  return `${name} выбивает бинго${bingoCount}`;
};

const createBot = (bingo) => {
  const token = process.env.TOKEN;
  const port = process.env.PORT || 8443;
  const bot = new TelegramBot(token, {
    webHook: { port: port }
  });

  const url = process.env.HOST;
  console.log(url);
  console.log(port);
  bot.setWebHook(`${url}/bot${token}`);

  bot.onText(/\/stupeni/, function (msg) {
    var chat_id = msg.chat.id;
    var resp = '@Tynopet @nastenkamurr @stop_kran @shellwiz @sinstarker @ustits @mazurikes ступени го';
    bot.sendMessage(chat_id, resp);
  });

  bot.onText(/\/kakoy/, (msg) => {
    const chat_id = msg.chat.id;
    const answer = getKakoy(msg.from.id);
    bot.sendMessage(chat_id, `Сегодня ты ${answer} Онимовец!`);
  });

  bot.on('message', (message) => {
    const chatId = message.chat.id;
    if (message.text) {
      const msg = message.text.toLowerCase();
      bingoCount = bingo.reduce((acc, w) => msg.search(w) !== -1 ? acc + 1 : acc, 0)
      if (bingoCount > 1) {
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
});

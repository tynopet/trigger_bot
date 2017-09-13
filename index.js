const TelegramBot = require('node-telegram-bot-api');
const dateFns = require('date-fns');
const Random = require('./prng');

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

const getKakoy = (userId) => {
  const currentDate = dateFns.startOfDay(new Date());
  const seed = userId + Math.round(dateFns.getTime(currentDate) / 1e7);
  const random = new Random(seed);
  const randomValue = random.next();
  const wordsCount = (randomValue % 4) + 1;

  let result = '';
  let tmp = [...kakoy];
  for (let i = 0; i < wordsCount; i++) {
    const idx = new Random(seed + i).next() % (tmp.length - 1);
    result += tmp[idx] + ' ';
    tmp = tmp.filter(el => el !== tmp[idx]);
  }
  return result;
};

const token = process.env.TOKEN;
const port = process.env.PORT || 8443;
const bot = new TelegramBot(token, {
  webHook: { port: port }
});

const url = process.env.HOST;
bot.setWebHook(`${url}/bot${token}`);

bot.onText(/\/stupeni/, function (msg) {
  var chat_id = msg.chat.id;
  var resp = '@tynopet @nastenkamurr @stop_kran @shellwiz @sinstarker @ustits @mazurikes ступени го';
  bot.sendMessage(chat_id, resp);
});

bot.onText(/\/kakoy/, (msg) => {
  const chat_id = msg.chat.id;
  const answer = getKakoy(msg.from.id);
  bot.sendMessage(chat_id, `Сегодня ты ${answer} Онимовец!`);
});

const TelegramBot = require("node-telegram-bot-api");
const dateFns = require("date-fns");
const Random = require("./prng");

const kakoy = [
  "странный",
  "зашкваренный",
  "батутный",
  "дерзкий",
  "селинский",
  "ретроградский",
  "хайповый",
  "фреймворковый",
  "версусовый",
  "деревенский",
  "олимпиадный",
  "мгсушный",
  "марийский",
  "сосаковский",
  "ступенчатый",
  "армаковский",
  "оракловый",
  "джавовый",
  "джаваскриптовый",
  "питоновский",
  "фронтендовый",
  "бекендовый",
  "тестировочный",
  "суппортовый",
  "девелопный",
  "стейбловый",
  "анстейбловый",
  "бесюганский",
  "тткшный",
  "совещательный",
  "ронятельский",
  "поднимательский",
  "твиксовый",
  "местный",
  "местный",
  "текстайловый",
  "нижний",
  "биллинговый",
  "undefined",
  "дедлоковый",
  "отчетный"
];

const getKakoy = (userId, date) => {
  const seed = userId + Math.round(dateFns.getTime(date) / 1e7);
  const random = new Random(seed);
  const randomValue = random.next();
  const wordsCount = randomValue % 4 + 1;

  let result = "";
  let tmp = [...kakoy];
  for (let i = 0; i < wordsCount; i++) {
    const idx = new Random(seed + i).next() % (tmp.length - 1);
    result += tmp[idx] + " ";
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

bot.onText(/\/stupeni/, function(msg) {
  var chat_id = msg.chat.id;
  var resp =
    "@tynopet @nastenkamurr @stop_kran @shellwiz @sinstarker @ustits @mazurikes ступени го";
  bot.sendMessage(chat_id, resp);
});

bot.onText(/^(\/kakoy \d+|\/kakoy@st_sf_trigger_bot \d+)$/, function(msg) {
  const chat_id = msg.chat_id;
  const count = parseInt(msg.text.match(/\d+/)[0], 10);
  if (count > 5) {
    bot.sendMessage(chat_id, `Я забыл, каким онимовцем ты был...`);
  }
  if (count < 1) {
    bot.sendMessage(chat_id, `Хватит тестировать меня на отрицательные числа!`);
  }
  let answer = "";
  const startDate = dateFns.startOfDay(new Date());
  for (let i = count; i > 0; i--) {
    const date = dateFns.addDays(startDate, -i);
    const kakoy = getKakoy(msg.from.id, date);
    answer += `${dateFns.format(
      date,
      "DD.MM.YYYY"
    )} ты был ${kakoy} Онимовцем!\n`;
  }
  bot.sendMessage(chat_id, answer);
});

bot.onText(/^(\/kakoy|\/kakoy@st_sf_trigger_bot)$/, msg => {
  const chat_id = msg.chat.id;
  const date = dateFns.startOfDay(new Date());
  const answer = getKakoy(msg.from.id, date);
  bot.sendMessage(chat_id, `Сегодня ты ${answer} Онимовец!`);
});

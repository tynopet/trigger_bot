const Telegraf = require("telegraf");
const dateFns = require("date-fns");
const Random = require("./prng");

const kakoy = [
  "сладкий",
  "уволившийся",
  "толстый",
  "как Кама пуля резкий",
  "турничковый",
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

const token = process.env.TOKEN;
const port = process.env.PORT || 8443;
const host = process.env.HOST;

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

const bot = new Telegraf(token);

bot.hears(/\/stupeni/, function(ctx) {
  const resp =
    "@tynopet @nastenkamurr @stop_kran @shellwiz @sinstarker @ustits ступени го";

  ctx.reply(resp);
});

bot.hears(/^(\/hist|\/hist@st_sf_trigger_bot)$/, (ctx) => {
  const count = 5;
  let answer = "";
  const startDate = dateFns.startOfDay(new Date());

  for (let i = count; i > 0; i--) {
    const date = dateFns.addDays(startDate, -i);
    const kakoy = getKakoy(ctx.update.message.from.id, date);
    answer += `${dateFns.format(
      date,
      "DD.MM.YYYY"
    )} ты был ${kakoy} Онимовец!\n`;
  }

  ctx.reply(answer);
});

bot.hears(/^(\/kakoy|\/kakoy@st_sf_trigger_bot)$/, (ctx) => {
  const date = dateFns.startOfDay(new Date());
  const answer = getKakoy(ctx.update.message.from.id, date);

  ctx.reply(
    `Сегодня ты ${answer} Онимовец!`,
    {
      reply_to_message_id: ctx.message.message_id
    }
  );
});

bot.telegram.setWebhook(host);
bot.startWebhook("/", null, port);
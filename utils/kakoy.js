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

module.exports = {
  getKakoy,
};
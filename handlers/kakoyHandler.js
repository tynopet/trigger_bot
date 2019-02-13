const dateFns = require("date-fns");
const {getKakoy} = require('./../utils/kakoy');

const histHandler = (ctx) => {
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
};

const kakoyHandler = (ctx) => {
  const date = dateFns.startOfDay(new Date());
  const answer = getKakoy(ctx.update.message.from.id, date);

  ctx.reply(
    `Сегодня ты ${answer} Онимовец!`,
    {
      reply_to_message_id: ctx.message.message_id
    }
  );
};

module.exports = {
  histHandler,
  kakoyHandler,
}
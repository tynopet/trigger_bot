const Telegraf = require("telegraf");
const Telegram = require('telegraf/telegram');

const token = process.env.TOKEN;

const bot = new Telegraf(token);
const telegram = new Telegram(token);

module.exports = {
  bot,
  telegram
};
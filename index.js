const {bot} = require('./clients');
const {loveHandler, stupeniHandler, kakoyHandler, histHandler} = require('./handlers');

const port = process.env.PORT || 8443;
const host = process.env.HOST;

bot.hears(/\/stupeni/, stupeniHandler);

bot.hears(/^(\/hist|\/hist@st_sf_trigger_bot)$/, histHandler);

bot.hears(/^(\/kakoy|\/kakoy@st_sf_trigger_bot)$/, kakoyHandler);

bot.command('love', loveHandler);

bot.telegram.setWebhook(host);
bot.startWebhook("/", null, port);
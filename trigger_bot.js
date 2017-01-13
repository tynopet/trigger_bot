var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var trigger_gif;
var token;

function readTrigger(chat_id) {
  fs.readFile(__dirname + '/trigger.gif', function(err, data) {
    if (err) {
      console.error('Error read gif');
    }
    trigger_gif = data;
  });
};

function readToken() {
  fs.readFile(__dirname + '/token.txt', function(err, data) {
    if (err) {
      console.error('Error read token');
    }
    readTrigger();
    token = data;
    var bot = new TelegramBot(token, {polling: true});

    bot.onText(/\/help/, function(msg) {
      var chat_id = msg.chat.id;
      var resp = 'Список команд: \n/echo msg - отзеркалит msg\n/trigger @username - триггернет @username\n/ttk_incoming_call - звонок из ТТК\n/putin - просит Камаева поклоняться императору';
      bot.sendMessage(chat_id, resp);
    });

    bot.onText(/\/echo (.+)/, function (msg, match) {
      var fromId = msg.chat.id;
      console.log(match);
      var resp = match[1];
      bot.sendMessage(fromId, resp);
    });

    bot.onText(/\/trigger (.+)/, function(msg, match) {
      var fromId = msg.chat.id;
      var resp = match[1].split(' ')[0];
      if (resp[0] == '@') {
        bot.sendMessage(fromId, resp + ' triggered');
      }
    });

    bot.onText(/\/ttk_incoming_call/, function(msg) {
      var chat_id = msg.chat.id;
      bot.sendMessage(chat_id, '@nastenkamurr ТТК здесь! Здесь все: Костин, Баринов, Степанюк! Сейчас будем проводить мЕграцию! ');
    });

    bot.onText(/\/putin/, function(msg) {
      var chat_id = msg.chat.id;
      bot.sendMessage(chat_id, '@stop_kran император уже здесь! Покланяйся великому Путлеру!');
    });

    bot.on('message', function(msg) {
      var chatId = msg.chat.id;
      if (msg.text) {
        var msg = msg.text.toLowerCase();
        if (msg.search(/putin/) != -1 || msg.search(/путин/) != -1) {
          bot.sendMessage(chatId, '@stop_kran triggered');
          bot.sendDocument(chatId, trigger_gif);
        }
        if (msg.search(/ттк/) != -1 || msg.search(/ttk/) != -1) {
          bot.sendMessage(chatId, '@nastenkamurr triggered'); 
          bot.sendDocument(chatId, trigger_gif);
        }
      }
    });
  });
}

readToken();
var request = require('request');
var cheerio = require('cheerio');
module.exports = {
  title: 'butts',
  match: /^!попка|^!butts|^!жопка/ig,
  onMsg: function (data) {
    /* !попка */
    with(data) {
      if (message.match(this.match)) {
        var num, max, lap, search = who;
        var params = message.trim().split(' ');
        params.shift();
        if (params.length) {
          search = params.join(' ');
        }
        request('http://obutts.ru', function (error, response, body) {
          var $ = cheerio.load(body);
          max = parseInt($('div#main').children().first().attr('id').split('s')[1]);
          gen_butts_link();
        });
        var gen_butts_link = function () {
          num = ((Math.random() * 10000) % max | 0).toString();
          num = (Array(6 - num.length)).join("0") + num;
          check_butts();
        };
        var check_butts = function() {
          request('http://media.obutts.ru/butts/' + num + ".jpg", function (error, response, body) {
            if (response.statusCode !== 404) {
              if (lap === 1) {
                bot.say(channel, search + ": http://media.obutts.ru/butts/" + num + ".jpg");
              } else {
                bot.say(channel, search + ": http://media.obutts.ru/butts/" + num + ".jpg" + " пришлось потрудиться");
              }
            } else if (lap < 3) {
              lap = lap + 1;
              gen_butts_link();
            } else {
              bot.say(channel, search + ": сожалеем, мы сделали все возможное");
            }
          });
        };
      }
    }
  }
};

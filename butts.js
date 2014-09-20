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
        setTimeout(function () {
          request('http://obutts.ru', function (error, response, body) {
            var $ = cheerio.load(body);
            max = $('div#main').children().first().attr('id').split('s')[1];
          });
          var gen_butts_link = function () {
            num = ((Math.random() * 10000) % max | 0).toString();
            num = (Array(6 - num.length)).join("0") + num;
            check_butts();
          };
          var check_butts = function() {
            request('http://media.obutts.ru/butts/' + num + ".jpg", function (error, response, body) {
              var check;
              var $ = cheerio.load(body);
              check = $('title').text();
              if (check !== '404 Not Found') {
                bot.say(channel, search + ": http://media.obutts.ru/butts/" + num + ".jpg");
                if (lap === 1) {
                  console.log("сруза все нашли");
                } else {
                  console.log("пришлось потрудиться");
                }
              } else {
                lap=lap+1;
                gen_butts_link();
              }
            });
          };
          gen_butts_link();
        }, 1000);
      }
    }
  }
};

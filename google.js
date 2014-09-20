var request = require('request');
var cheerio = require('cheerio');
module.exports = {
  title: 'google',
  match: /^!г |^!g |^!goo |^!google |^!гугл|^!загугл/ig,
  onMsg: function (data) {
    /* !google */
    with(data) {
      if (message.match(this.match)) {
        var params = message.trim().split(' ');
        params.shift();
        var _who = who;
        var search = '';
        if (params.length) {
          search = params.join(' ');
        }
        request('https://www.google.ru/search?q=' + search + '&ie=UTF-8&oe=UTF-8', function (error, response, body) {
          var $ = cheerio.load(body);
          var title = $('div#search li.g a').eq(0).text();
          var link = $('div#search li.g a').eq(0).attr('href');
          if (link) {
            link = link.replace('/url?', '');
            var url = '';
            link.split('&').forEach(function (el) {
              var pair = el.split('=');
              if (pair[0] == 'q') {
                url = pair[1];
                bot.say(channel, _who + ": \"" + title + "\" - " + decodeURIComponent(url));
              }
            });
          }
        });
      }
    }
  }
};

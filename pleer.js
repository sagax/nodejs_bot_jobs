var request = require('request');
var cheerio = require('cheerio');
module.exports = {
  title: 'pleer',
  match: /^!pleer|!плеер|!play|!плаер|!плэер|!плэй|!плей/ig,
  onMsg: function(data) {
    /* !pleer */
    with(data) {
      if (message.match(this.match)) {
        var args = require('optimist').parse(message.trim().split(' '));
        var params = args._;
        params.shift();
        if (args.top) {
          console.log(args);
          var loc = '';
          if (args.ru) {
            loc = '_rus';
          }
          var top_title = "Зарубежный \"ТОП за неделю\"";
          var _top = args.top;
          var ntop = 1;
          if (_top == '3-months') {
            ntop = 2;
            top_title = "Зарубежный \"ТОП за 3 месяца\"";
          }
          if (_top == '6-months') {
            ntop = 3;
            top_title = "Зарубежный \"ТОП за 6 месяцев\"";
          }
          if (_top == 'year') {
            ntop = 4;
            top_title = "Зарубежный \"ТОП за год\"";
          }
          if (_top == 'all-time') {
            ntop = 5;
            top_title = "Зарубежный \"ТОП за все времена\"";
          }
          request('http://pleer.com/gettopperiod?target2=r' + ntop + '&target1=e' + ntop, function(error, response, body) {
            var $ = cheerio.load(body);
            var $trackAs = $('#search-results' + loc + ' .track-main.song > a');
            var num = 0;
            if (args.n) {
              if (args.n > 0) {
                num = args.n - 1;
              }
            }
            var title = $trackAs.eq(num * 2 + 0).text().trim() + ' - ' + $trackAs.eq(num * 2 + 1).text().trim();
            var href = $trackAs.eq(num * 2 + 1).attr('href');
            var url = 'http://pleer.com' + href;
            if (href) {
              bot.say(channel, who + ", " + top_title + ", " + (num + 1) + " место: \"" + title + "\" - " + decodeURIComponent(url));
            }
            return;
          });
        }
        var search;
        if (params.length) {
          search = params.join(' ');
        }
        if (search) {
          request('http://pleer.com/search?q=' + search + '', function(error, response, body) {
            var $ = cheerio.load(body);
            var $trackAs = $('.track-main.song > a');
            var title = $trackAs.eq(0).text().trim() + ' - ' + $trackAs.eq(1).text().trim();
            var href = $trackAs.eq(1).attr('href');
            var url = 'http://pleer.com' + href;
            if (href) {
              bot.say(channel, who + ": \"" + title + "\" - " + decodeURIComponent(url));
            }
          });
        }
      }
    }
  }
};

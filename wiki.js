var request = require('request');
var cheerio = require('cheerio');
module.exports = {
  title: 'wiki-ru',
  match: /^!вики/ig,
  onMsg: function (data) {
    /* !вики */
    with(data) {
      if (message.match(this.match)) {
        var params = message.trim().split(' ');
        params.shift();
        var _who = who;
        var _str;
        if (params.length) {
          _str = params.join(' ').replace(' ', '_');
        }
        request('http://ru.wikipedia.org/wiki/' + _str, function (error, response, body) {
          var $ = cheerio.load(body);
          var lurk = $('#mw-content-text p>b').eq(0).parent().text();
          bot.say(channel, "" + _who + ": " + lurk);
        });
      }
    }
  }
};

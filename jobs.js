var request = require('request');
module.exports = {
  title: 'охуенный совет',
  match: /^!жобс/ig,
  onMsg: function(data) {
    /* !жобс */
    with(data) {
      if (message.match(this.match)) {
        var params = message.trim().split(' ');
        params.shift();
        var _who = who;
        if (params.length) {
          _who = params[0];
        }
        request('http://fucking-great-advice.ru/api/random', function(error, response, body) {
          if (error) return error;
          var obs = JSON.parse(body);
          bot.say(channel, "" + _who + "" + ": " + obs.text);
        });
      }
    }
  }
};

var request = require('request');
var cheerio = require('cheerio');

/* mongodb support */
var mongoskin = null;
var mongo = null;
try {
  mongoskin = require('mongoskin');
} catch (err) {

}

module.exports = {
  title: 'boobs',
  match: /^!boobs|^!сиськи|^!tits|^!пятница/ig,
  onLoad: function(data) {
    mongo = mongoskin.db('localhost:22022/ircbot');
  },
  onUnload: function(data) {
    mongo = null;
  },
  onMsg: function(data) {
    /* !попка */
    with(data) {
      if (message.match(this.match)) {
        var num, max, lap, search = who;
        var params = message.trim().split(' ');
        params.shift();
        if (params.length) {
          search = params.join(' ');
        }

        if (mongoskin) {
          mongo.collection('modules').findOne({
            name: this.title
          }, function(err, doc) {
            if (err) {
              return;
            }

            if (doc) {
              max = doc.max || 10000;
            } else {

              request('http://oboobs.ru', function(error, response, body) {
                var $ = cheerio.load(body);
                max = parseInt($('div#main').children().first().attr('id').split('s')[1]);
                mongo.collection('modules').update({
                  name: this.title
                }, {
                  max: max
                }, {
                  upsert: true
                });
                gen_butts_link();
              });

            }
          });

        } else {
          request('http://oboobs.ru', function(error, response, body) {
            var $ = cheerio.load(body);
            max = parseInt($('div#main').children().first().attr('id').split('s')[1]);
            gen_butts_link();
          });
        }

        var gen_butts_link = function() {
          num = ((Math.random() * 10000) % max | 0).toString();
          num = (Array(6 - num.length)).join("0") + num;
          check_butts();
        };
        var check_butts = function() {
          request('http://media.oboobs.ru/boobs/' + num + ".jpg", function(error, response, body) {
            if (response.statusCode !== 404) {
              if (lap === 1) {
                bot.say(channel, search + ": http://media.oboobs.ru/boobs/" + num + ".jpg");
              } else {
                bot.say(channel, search + ": http://media.oboobs.ru/boobs/" + num + ".jpg" + " пришлось потрудиться");
              }
            } else if (lap < 3) {
              lap = lap + 1;
              gen_butts_link();
            } else {
              bot.say(channel, search + "сожалеем, мы сделали все возможное");
            }
          });
        };
      }
    }
  }
};
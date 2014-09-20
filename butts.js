module.exports = {
  title: 'butts',
  match: /^!попка|^!butts|^!жопка/ig,
  onMsg: function (data) {
    /* !попка */
    /* TODO добавить проверку наличия картинки по сгенерированной ссылке */
    with(data) {
      if (message.match(this.match)) {
        var params = message.trim().split(' ');
        params.shift();
        setTimeout(function () {
          var num = ((Math.random() * 10000) % 01120 | 0).toString();
          num = (Array(6 - num.length)).join("0") + num;
          var search = who;
          if (params.length) {
            search = params.join(' ');
          }
          bot.say(channel, search + ": http://media.obutts.ru/butts/" + num + ".jpg");
        }, 1000);
      }
    }
  }
};

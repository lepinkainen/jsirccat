// https://node-irc.readthedocs.org/en/latest/API.html

// Create the configuration
var config = {
    channels: ["#example"],
    server: "irc.example.com",
    botName: "jsirccat",
    cat_host: 'localhost',
    cat_port: 12345,
};

var irc = require("irc");
var net = require("net");

// Create the bot
var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});

bot.addListener("message", function(nick, to, text, message) {
    console.log(to +" <"+nick+"> "+text);
});

bot.addListener("error", function(message) {
    console.log("ERROR");
    console.log(message);
});

bot.addListener("registered", function(message) {
    console.log("CONNECTED");
    console.log(message);
});

// listen for connections and forward all received messages to the configured channels
var server = net.createServer(function(c) {
console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
      console.log('received:');
      var dataString = data.toString();
      console.log(dataString.trim());
      config.channels.forEach(function(channel) {
          bot.say(channel, dataString);
      });
  });
});

// start the server
server.listen(config.cat_port, config.cat_host, function() {
  console.log('server listening on '+config.cat_host+":"+config.cat_port);
});

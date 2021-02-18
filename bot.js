var Discord = require('discord.js');
var auth = require('./auth.json');
var fs = require('fs');
var sleep = require('sleep');
// const
const prefix = "!";

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true,
    disableEveryone: false,
});

// init all Commands in attribute commands
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}


// Further Information on init
bot.on('ready', function (evt) {
    console.log("Bot läuft!");
});

bot.on('message', function (message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (bot.commands.has(cmd)) {
        try {
            bot.commands.get(cmd).execute(message, args);
        }
        catch (error) {
            console.log(error);
            message.reply("Mein Entwickler hat hier irgendwie Mist gebaut - verprügelt ihn!");
        }
    } else {
        message.channel.send("Das ist kein Befehl für mich, wie wärs wenn du mal !befehle liest?");
    }
});

bot.login(auth.token);



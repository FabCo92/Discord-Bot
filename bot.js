require('dotenv').config();
var Discord = require('discord.js');
var fs = require('fs');
var sleep = require('sleep');
// const
const prefix = "!";

// // Initialize Discord Bot
var bot = new Discord.Client();

// init all Commands in attribute commands
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}


// Further Information on init
bot.on('ready', () => {
    console.log("Bot läuft!");
});

bot.on('error', console.log);


bot.on('message', message => {
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
        message.reply("Das ist kein Befehl für mich, wie wärs wenn du mal !befehle liest?");
    }
});

bot.login();



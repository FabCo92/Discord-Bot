var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var sleep = require('sleep');
const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
var commandList = JSON.parse(fs.readFileSync('commands.json', 'utf8'));
// const
const prefix = "!";

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true,
    disableEveryone: false,
});

// Further Information on init
bot.on('ready', function (evt) {
    logger.info('Connected');
    // logger.info('Logged in as: ');
    // logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const cmd = args.shift().toLowerCase();
    // if (message === '!siege') {
    //     if (!userData[userID]) userData[userID] = {
    //         Siege: 0
    //     }
    //     userData[userID].Siege++;
    //     fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
    //         if (err) console.error(err);
    //     })
    //     bot.sendMessage({
    //         to: channelID,
    //         message: 'Sieg für ' + user + '\nSiege: ' + userData[userID].Siege
    //     });
    // }
    // try {
    if (cmd in commandList) {
        switch (cmd) {
            case 'ping':
                ping(message);
                break;
            case 'help':
                if (cmd in commandList && args.length == 1) {
                    help(message, args);
                } else {
                    message.reply("Su funktioniert !help nicht - was kannst du eigentlich?");
                }
                break;
            case 'befehle':
                befehle(message);
                break;
            case 'bier':
                bier(message);
                break;
            case 'resetme':
                resetMe(message);
                break;
            case 'maketeams':
                makeTeams(message, args);
                break;
        }
    }
    else {
        message.reply("Ich kann dich nicht verstehen, hör auf zu nuscheln und gib mir einen ordentlichen Befehl!")
    }
    // }
    // catch {
    //     console.log("Schief gelaufen!");
    // }
});

// Funktion für jeden Befehl (kann man bestimmt irgendwie besser machen)

function ping(msg) {
    const timeTaken = Date.now() - msg.createdTimestamp;
    msg.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
}

function help(msg, args) {
    msg.reply(`${commandList[args[0]]}`);
}

function befehle(msg) {
    var trenner = '\n ------------------------------------------------------------------------------------- \n';
    var output = " Hier sind lalle möglichen Befehle und Ihre Bedeutung:" + trenner + '\n';
    Object.keys(commandList).forEach(befehl => {
        output += befehl.padEnd(50 - befehl.length, ' ') + commandList[befehl] + '\n';
    })
    msg.reply(output + trenner)
}

function bier(msg) {
    var userData = JSON.parse(fs.readFileSync('userData.json', 'utf8'));
    if (!(msg.author.username in userData) || !(userData[msg.author.username].Biere)) {
        userData[msg.author.username] = {
            Biere: 1
        }
    } else {
        userData[msg.author.username].Biere++;
    }

    fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    })

    msg.reply(`Prost! Lass es dir schmecken. \nGetrunkene Biere: ${userData[msg.author.username].Biere}`)
}

function resetMe(msg) {
    var userData = JSON.parse(fs.readFileSync('userData.json', 'utf8'));
    if (msg.author.username in userData) {
        userData[msg.author.username] = {};
    }

    fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    })
    msg.reply("Du wurdest resettet.")
}

function makeTeams(msg, args) {
    for (let i = args.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [args[i], args[j]] = [args[j], args[i]];
    }

    msg.channel.send(" Deus Ex Machina wählt:\n");
    msg.channel.send(" Team 1:\n");
    var counter = args.length / 2;
    args.forEach(person => {
        if (counter > 0) {
            msg.channel.send(person);
            counter--;
            if (counter <= 0) {
                msg.channel.send("\nTeam 2: \n");
            }
        } else {
            msg.channel.send(person);
        }
    })

}
bot.login(auth.token);



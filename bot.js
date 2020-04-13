var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var userData = JSON.parse(fs.readFileSync('userData.json', 'utf8'));

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message === '!siege') {
        if (!userData[userID]) userData[userID] = {
            Siege: 0
        }
        userData[userID].Siege++;
        fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        bot.sendMessage({
            to: channelID,
            message: 'Sieg für ' + user + '\nSiege: ' + userData[userID].Siege
        });
    }
    if (message.slice(0,6) === '!kills') {
        var arg = message.slice(6,message.length);
        var kills = parseInt(arg);
        if (!userData[userID]) userData[userID] = {
            Kills: 0
        }
        userData[userID].Kills += kills;
        fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        bot.sendMessage({
            to: channelID,
            message: kills + ' Kills für ' + user + '\nGesamt-Kills: ' + userData[userID].Kills
        });
    }

    if (message === '!bier') {
        if (!userData[userID]) userData[userID] = {
            Biere: 0
        }
        userData[userID].Biere++;
        fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        bot.sendMessage({
            to: channelID,
            message: 'Prost ' + user + '\nGetrunkene Biere: ' + userData[userID].Biere
        });
    }

    if (message === '!userstats') {
        if (!userData[userID].Siege) userData[userID].Siege = 0;
        if (!userData[userID].Kills) userData[userID].Kills = 0;
        if (!userData[userID].Biere) userData[userID].Biere = 0;

        fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        bot.sendMessage({
            to: channelID,
            message: 'Statistik für ' + user + '\nSiege: ' + userData[userID].Siege + '\nKills: ' + userData[userID].Kills 
            + '\nBiere: ' + userData[userID].Biere
        });
    }

    if (message === '!reset') {
        userData[userID].Siege = 0;
        userData[userID].Kills = 0;
        userData[userID].Biere = 0;

        fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        bot.sendMessage({
            to: channelID,
            message: 'Stats für ' + user + ' resettet'
        });
    }

/*     if (message === '!scoreboardKills') {
        var erster = userData[userID];
        for (var i in userData){
         if (userData[i].Kills > erster.Kills){
            erster = userData[i];
         }
        }
        bot.sendMessage({
            to: channelID,
            message: 'Bester Killer ' + erster
        });               
    }
    if (message === '!scoreboardSiege') {
        var erster = userData[userID];
        for (var i in userData) {
            if (userData[i].Siege > erster.Siege) {
                erster = userData[i];
            }
        }
        bot.sendMessage({
            to: channelID,
            message: 'Meiste Siege ' + erster
        });
    }

    if (message === '!scoreboardBiere') {
        var erster = userData[userID];
        for (var i in userData) {
            if (userData[i].Biere > erster.Biere) {
                erster = userData[i];
            }
        }
        bot.sendMessage({
            to: channelID,
            message: 'Größter Säufer:  ' + erster.user
        });
    } */
})

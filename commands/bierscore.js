const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
const { inflateRawSync } = require('zlib');

module.exports = {
    name: 'bierscore',
    description: 'Zeigt, wer am meisten Bier drin hat',
    execute(msg, args) {
        var fs = require('fs');
        const path = require("path");
        const Discord = require('discord.js');

        //calculate Leader
        var userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "userData.json"), 'utf8'));

        var data = new Discord.Collection();
        var userToBeer = new Discord.Collection();
        for (var i in userData) {
            data.set(userData[i].Biere, userData[i].Name);
            userToBeer.set(userData[i].Name, userData[i].Biere);
        }

        var sortedArray = new Array();
        sortedArray[0] = userToBeer.keys().next().value;
        for (const [key, value] of userToBeer.entries()) {
            for (var iter = 0; iter < userToBeer.size; iter++) {
                if (key != sortedArray[iter]) {
                    if (value > userToBeer.get(sortedArray[iter])) {
                        sortedArray[iter - 1] = sortedArray[iter];
                        sortedArray[iter] = key;
                        console.log(sortedArray)
                        break;
                    }
                }
            }
        }

        const botRoot = process.cwd();
        const attachment = new Discord.MessageAttachment(botRoot + '/images/bier.jpg', 'bier.jpg');
        bierEmbed = new Discord.MessageEmbed()
            .setColor('#FF00FF')
            .setTitle('Wer hat am meisten Bier drin?')
            .attachFiles(attachment)
        bierEmbed.setThumbnail('attachment://bier.jpg')

        for (let k = 0; k < sortedArray.length; k++) {
            if (!sortedArray[k]) {
                bierEmbed.addField("Leider hat noch keiner ein Bier getrunken. Was ist los mit euch?");
            }
            else {
                bierEmbed.addField(sortedArray.length - k + ".Platz: " + sortedArray[k], "Biere " + userToBeer.get(sortedArray[k]));
            }
        }

        msg.channel.send(bierEmbed);
    }

}
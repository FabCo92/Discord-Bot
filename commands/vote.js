module.exports = {
    name: 'vote',
    description: 'Nimmt mit Leerzeichen getrennte Optionen entgegen und ruft zur Abstimmung auf. Jeder hat eine Stimme, höchstens 10 Optionen möglich',
    execute(msg, args) {
        if (args.length <= 1) {
            msg.reply("Du musst schon mehrere Optionen zur Auswahl stellen");
        }
        else {

            const path = require("path");
            const Discord = require('discord.js');const botRoot = process.cwd();
            const attachment = new Discord.MessageAttachment(botRoot + '/images/poll.jpg', 'poll.jpg');
            var smileylist = ["😃", "🥲", "❤️", "💩", "🙀", "🏋️‍♂️", "🗻", "🥰", "😈", "👯"]

            pollEmbed = new Discord.MessageEmbed()
                .setColor('#01F0C3')
                .setTitle(`Abstimmung von ${msg.author.username}`)
                .attachFiles(attachment)
                .setThumbnail('attachment://poll.jpg')
                .setDescription('Folgende Optionen stehen zur Abstimmung:')
            
            for (let opt = 0; opt < args.length; opt++) {
                pollEmbed.addField(args[opt], `Reagiere mit ${smileylist[opt]}`)
                
            }

            msg.channel.send(pollEmbed).then(sentEmbed => {
                for (let opt = 0; opt < args.length; opt++) {
                    sentEmbed.react(smileylist[opt])
                }
            });


        }
    }
}
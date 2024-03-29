
module.exports = {
    name: 'befehle',
    description: 'Gibt alle möglichen Befehle, die du mir geben kannst zurück',
    execute(msg, args) {

        var fs = require('fs');
        const path = require("path");
        // at the top of your file
        const Discord = require('discord.js');
        const botRoot = process.cwd();
        const attachment = new Discord.MessageAttachment(botRoot + '/images/ava.jpg', 'ava.jpg');
        // init all Commands in attribute commands
        const commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            if (command.permission != 'dev') {
                commands.set(command.name, command.description);
            }
        }
        msg.reply(attachment)
        befehleEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Hallo, ich bin DeusExMachina - dein Bot für Gaming und Bier')
            .setAuthor('entwickelt von Fabse', '', 'https://github.com/FabCo92/Discord-Bot')
            .setDescription('Hier findet ihr eine Übersicht über meine Befehle:')
            .attachFiles(attachment)
            .setThumbnail('attachment://ava.jpg')
        commands.forEach((key, val) => {
            befehleEmbed.addField("!" + val, key + "\n");
        })

        msg.channel.send(befehleEmbed);
    }

}
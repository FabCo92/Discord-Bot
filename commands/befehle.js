
module.exports = {
    name: 'befehle',
    description: 'Gibt alle möglichen Befehle, die du mir geben kannst zurück',
    execute(msg, args) {

        var fs = require('fs');
        // at the top of your file
        const Discord = require('discord.js');
        const imagepath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZA6uMx87i8CUI12fiYpHM0BFqc5nH00Z42w&usqp=CAU';
        // init all Commands in attribute commands
        const commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            commands.set(command.name, command.description);
        }
        befehleEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Hallo, ich bin DeusExMachina - dein Bot für Gaming und Bier')
            .setAuthor('entwickelt von Fabse', '', 'https://github.com/FabCo92/Discord-Bot')
            .setDescription('Hier findet ihr eine Übersicht über meine Befehle:')
            .setImage(imagepath)
        commands.forEach((key, val) => {
            befehleEmbed.addField("!" + val, key + "\n");
        })

        msg.channel.send(befehleEmbed);

    }

}
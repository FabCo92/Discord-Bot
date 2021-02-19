const { ConsoleTransportOptions } = require('winston/lib/winston/transports');

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

        var sortierteListe = new Array();
        sortierteListe[0] = userToBeer.keys().next().value;
        console.log(userToBeer.entries());
        // userToBeer.forEach((u,b) => {
        //     console.log(u,b);
        // })
        for (let iter = 0; iter < sortierteListe.length; iter++) {
            userToBeer.forEach((beer, user) => {
                console.log(beer, user)
                console.log(sortierteListe[iter])
                if (user != sortierteListe[iter]) {
                    console.log(user + " ist nicht gleich " + sortierteListe[iter])
                    if (beer > userToBeer.get(sortierteListe[iter])) {
                        console.log(beer + " ist größer als " + userToBeer.get(sortierteListe[iter]));
                        console.log(sortierteListe[i])
                        sortierteListe[iter + 1] = sortierteListe[iter];
                        sortierteListe[iter] = user;
                        console.log(sortierteListe);
                    }
                }
            })
        }

        console.log(sortierteListe.length)
        console.log(sortierteListe)
        const imgpath = 'https://www.bier.de/wp-content/uploads/2017/11/171102-bierde-blog-export-1.jpg'
        bierEmbed = new Discord.MessageEmbed()
            .setColor('#FF00FF')
            .setTitle('Wer hat am meisten Bier drin?')
            .setThumbnail(imgpath)

        // for (let k = scoreboardAsc.length - 1; k >= 0; k--) {
        //     bierEmbed.addField(scoreboardAsc.length - k + ".Platz: " + scoreboardAsc[k], "Biere " + userToBeer.get(scoreboardAsc[k]));
        // }

        msg.channel.send(bierEmbed);
    }


}
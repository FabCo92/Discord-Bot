module.exports = {
    name: 'schnaps',
    description: "Zähler für getrunkene Schnäpse. Pur oder Gemixt - jeder wie er mag. Wir sind ja nicht wie Paul",
    execute(msg, args) {
        var fs = require('fs');
        const path = require("path");
        var userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "userData.json"), 'utf8'));
        if (!(msg.author.id in userData) || !(userData[msg.author.id].Schnaps)) {
            userData[msg.author.id] = {
                Name: msg.author.username,
                Schnaps: 1
            }
        } else {
            userData[msg.author.id].Schnaps++;
        }

        fs.writeFileSync(path.resolve(__dirname, "userData.json"), JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        msg.react('🍷')
        msg.reply(`Prost! Lass es dir schmecken. \nGetrunkene Weine: ${userData[msg.author.id].Schnaps}`)
    }

}
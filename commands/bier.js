module.exports = {
    name: 'bier',
    description: "Zähler für geöffnete Biere",
    execute(msg, args) {
        var fs = require('fs');
        const path = require("path");
        var userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "userData.json"), 'utf8'));
        if (!(msg.author.id in userData) || !(userData[msg.author.id].Biere)) {
            userData[msg.author.id] = {
                Name: msg.author.username,
                Biere: 1
            }
        } else {
            userData[msg.author.id].Biere++;
        }

        fs.writeFileSync(path.resolve(__dirname, "userData.json"), JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        msg.react('🍻')
        msg.reply(`Prost! Lass es dir schmecken. \nGetrunkene Biere: ${userData[msg.author.id].Biere}`)
    }

}
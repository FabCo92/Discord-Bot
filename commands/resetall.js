module.exports = {
    name: 'resetall',
    description: 'Setzt die Werte aller zurück! Nur für den Bot-Gott ausführbar.',
    permission: 'dev',
    execute(msg, args) {

        var fs = require('fs');
        const path = require("path");
        var userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "userData.json"), 'utf8'));
        if (msg.author.id == 630867488992919562) {
            userData = {};
        }
        else {
            msg.reply("Du bist nicht mein Entwickler. Wenn du alle zurücksetzen möchtest, frag meinen Entwickler!")
        }
        fs.writeFileSync(path.resolve(__dirname, "userData.json"), JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        msg.reply("Alle wurden resettet.")
    }
}
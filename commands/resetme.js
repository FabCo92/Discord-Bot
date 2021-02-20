module.exports = {
    name: 'resetme',
    description: 'Setzt alle deine gespeicherten Werte zurück. IRREVERSIBLE!',
    execute(msg, args) {

        var fs = require('fs');
        const path = require("path");
        var userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "userData.json"), 'utf8'));
        if (msg.author.id in userData) {
            userData[msg.author.id] = {};
        }
        fs.writeFileSync(path.resolve(__dirname, "userData.json"), JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        msg.reply("Du wurdest resettet.")
    }
}
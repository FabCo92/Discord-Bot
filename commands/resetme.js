module.exports = {
    name: 'resetme',
    description: 'Setzt alle deine gespeicherten Werte zurück. IRREVERSIBLE!',
    execute(msg, args) {
        var userData = JSON.parse(fs.readFileSync('../userData.json', 'utf8'));
        if (msg.author.username in userData) {
            userData[msg.author.username] = {};
        }
        fs.writeFileSync('userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
        msg.reply("Du wurdest resettet.")
    }
}
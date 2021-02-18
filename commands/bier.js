module.exports = {
    name: 'bier',
    description: "Zähler für geöffnete Biere",
    execute(msg, args){
        var userData = JSON.parse(fs.readFileSync('../userData.json', 'utf8'));
        if (!(msg.author.username in userData) || !(userData[msg.author.username].Biere)) {
            userData[msg.author.username] = {
                Biere: 1
            }
        } else {
            userData[msg.author.username].Biere++;
        }
    
        fs.writeFileSync('../userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
    
        msg.reply(`Prost! Lass es dir schmecken. \nGetrunkene Biere: ${userData[msg.author.username].Biere}`)
    }

}
module.exports = {
    name: 'ping',
    description: "Gibt den Ping für den Bot zurück, um die Verbindung zu testen!",
    execute(msg, args){
        const timeTaken = Date.now() - msg.createdTimestamp;
        msg.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

}
module.exports = {
    name: 'maketeams',
    description: 'Nimmt eine mit Leerzeichen getrennte Reihe von Mitspielern entgegen und würfelt zwei Teams aus',
    execute(msg, args) {
        for (let i = args.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [args[i], args[j]] = [args[j], args[i]];
        }
    
        msg.channel.send(" Deus Ex Machina wählt:\nTeam 1:\n");
        var counter = args.length / 2;
        args.forEach(person => {
            if (counter > 0) {
                msg.channel.send(person);
                counter--;
                if (counter <= 0) {
                    msg.channel.send("\nTeam 2: \n");
                }
            } else {
                msg.channel.send(person);
            }
        })
    
    }
}
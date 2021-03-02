module.exports = {
    name: 'maketeams',
    description: 'Nimmt eine mit Leerzeichen getrennte Reihe von Mitspielern entgegen und würfelt zwei Teams aus',
    execute(msg, args) {
        for (let i = args.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [args[i], args[j]] = [args[j], args[i]];
        }

        msg.channel.send(" Deus Ex Machina hat gewählt:");
        var counter = parseInt(args.length / 2);
        var team1 = new Array();
        var team2 = new Array();
        for(let j = 0; j < counter; j++){
            team1.push(args[j]);
        }
        for(let k = counter; k < args.length; k++){
            team2.push(args[k]);
        }
        var output1 = "Team1: ";
        var output2 = "\nTeam2: ";

        team1.forEach((a) => {
            output1 += a + " ";
        })
        team2.forEach((a) => {
            output2 += a + " ";
        })

        msg.channel.send(output1);
        msg.channel.send(output2);

    }
}
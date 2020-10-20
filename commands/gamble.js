const money = require("../money.json");
const fs = require("fs");
const maxBet = 100000;

module.exports.run = async (bot, message, args) => {

    if(!money[message.author.id] || money[message.author.id].money <= 0) return message.reply("You don't have any money.");

    if(!args[0]) return message.reply("Please specify a bet.");

    if(args[0].toLowerCase() == "all") args[0] = money[message.author.id].money; //bet everything

    try{

        var bet = parseFloat(args[0]);

    } catch {

        return message.reply("C'mon man, make it easy... only whole numbers please");

    }

    if (bet != Math.floor(bet)) return message.reply("C'mon man, make it easy... only whole numbers please");

    if(money[message.author.id].money < bet) return message.reply("Woah bro. Poorer than you think, try `.bal` sometime soon");

    if(bet > maxBet) return message.reply(`The maximum bet you can place here is ${maxBet.toLocaleString()} ♏︎`);

    let chances = ['win', 'lose'];
    var pick = chances[Math.floor(Math.random() * chances.length)];

    if(pick == "lose"){

        money[message.author.id].money -= bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {

            if(err) console.log(err)

        })
        return message.reply(`You LOSE! New Balance: ${money[message.author.id].money}`);

    }
    else{

        money[message.author.id].money += bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {

            if(err) console.log(err);

        });
        return message.reply(`You WIN! New Balance: ${money[message.author.id].money} \nCongratulations!\n`);

    }

}

module.exports.help = {

    name: "gamble",
    aliases: []

}
const maxBet = 100000;
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

//CONNECT TO MONGOOSEDB
mongoose.connect(botconfig.passmongodb, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

});

//MODELS
const Data = require("../models/data.js")

module.exports.run = async (bot, message, args) => {

    if (message.channel.id != 768301568373161995) return message.reply("Sorry, you can't gamble in here. Try #gamble");

    Data.findOne({

        userID: message.author.id

    }, (err, data) => {

        if(err) console.log(err);
        if(!data)
        {

            const newData = new Data({

                name: message.author.username,
                userID: message.author.id,
                leaderboard: "all",
                money: 0,
                daily: 0,


            })
            newData.save().catch(err => console.log(err));
            return message.reply("Sorry, you don't have any money to gamble with. Maybe try the `.daily` command?")

        } else
        {

            if(data.money <= 0) return message.reply("You don't have any money.");

            if(!args[0]) return message.reply("Please specify a bet.");

            if(args[0].toLowerCase() == "all") args[0] = data.money; //bet everything

            try{
            
                var bet = parseFloat(args[0]);
            
            } catch {
            
                return message.reply("C'mon man, make it easy... only whole numbers please");
            
            }
        
            if (bet != Math.floor(bet)) return message.reply("C'mon man, make it easy... only whole numbers please");
        
            if(data.money < bet) return message.reply("Woah bro. Poorer than you think, try `.bal` sometime soon");
        
            if(bet > maxBet) return message.reply(`The maximum bet you can place here is ${maxBet.toLocaleString()} ♏︎`);
        
            let chances = ['win', 'lose'];
            var pick = chances[Math.floor(Math.random() * chances.length)];
        
            if(pick == "lose"){
            
                data.money -= bet;
                data.save().catch(err => console.log(err));
                return message.reply(`You LOSE! New Balance: ${data.money}`);
            
            }
            else{
            
                data.money += bet;
                data.save().catch(err => console.log(err));
                return message.reply(`You WIN! New Balance: ${data.money}\nCongratulations!\n`);
                
            
            }
        }
            
    })

    

}

module.exports.help = {

    name: "gamble",
    aliases: []

}
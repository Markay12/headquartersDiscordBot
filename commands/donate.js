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

    let user = message.mentions.members.first() || bot.users.cache.get(args[0]); //get user by mention
    if(!user) return message.reply("Sorry, couldn't find that member. Make sure they haven't been laid off... \n*we've had some recent budget cuts*");

    if(user.id == message.author.id) return message.reply("You can't pay yourself... you sly dog");

    if(args[1] != Math.floor(args[1])) return message.reply("Please only enter whole numbers");

    Data.findOne({

        userID: message.author.id

    }, (err, authorData) => {

        if(err) console.log(err);
        if(!authorData)
        {

            return message.reply("You don't have any money to send");

        } else {

            Data.findOne({

                userID: user.id

            }, (err, userData) => {

                if(err) console.log(err);

                if(!args[1]) return message.reply("Please specify the amount you would like to donate");

                if(!authorData.money) return message.reply("Sorry, you don't have any money :cry:");
                        
                if(parseInt(args[1]) > authorData.money) return message.reply("Sorry, you don't have enough money to donate.\n\nMaybe trying coding in :python: seems to make a lot of ♏︎'s right now");
                if(parseInt(args[1]) < 1) return message.reply("You can't send less than 1 ♏︎... how poor are you?");

                if(!userData)
                {

                    const newData = new Data({

                        name: bot.users.cache.get(user.id).username,
                        userID: user.id,
                        leaderboard: "all",
                        money: parseInt(args[1]),
                        daily: 0,
        
        
                    })

                    authorData.money -= parseInt(args[1]);

                    newData.save().catch(err => console.log(err));
                    authorData.save().catch(err => console.log(err));

                } else {

                    userData.money += parseInt(args[1]);
                    authorData.money -= parseInt(args[1]);
                    userData.save().cathc(err => console.log(err));
                    authorData.save().cathc(err => console.log(err));

                }

                return message.channel.send(`${message.author.username} payed ♏︎ ${args[1]} to ${bot.users.cache.get(user.id).username}`);

            })

        }

    })
  
}

module.exports.help = {

    name: "donate",
    aliases: ["d", "donate"]

}
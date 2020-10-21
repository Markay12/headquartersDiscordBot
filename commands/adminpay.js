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

    if(args[1] != Math.floor(args[1])) return message.reply("Please only enter whole numbers");

    Data.findOne({

        userID: user.id

    }, (err, userData) => {

        if(err) console.log(err);

        if(!args[1]) return message.reply("Please specify the amount you would like to donate");

        if(!userData)
        {

            const newData = new Data({

                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                leaderboard: "all",
                money: parseInt(args[1]),
                daily: 0,


            })
            newData.save().catch(err => console.log(err));


        } else {

            userData.money += parseInt(args[1]);
            userData.save().catch(err => console.log(err));


        }

        return message.channel.send(`${message.author.username} balance is now ${user.money} : ${args[1]} ♏︎ `);

    })
  
}

module.exports.help = {

    name: "adminpay",
    aliases: ["ap"]

}
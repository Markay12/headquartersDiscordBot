const { Client } = require("discord.js");
const mongoose = require("mongoose"); //add new package for database
const botconfig = require("../botconfig.json");

//CONNECT TO MONGOOSEDB
mongoose.connect(botconfig.passmongodb, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

});

//MODELS
const Data = require("../models/data.js")

module.exports.run = async (bot, message, args) => {

    if(!args[0]){

        var user = message.author;

    } else 
    {

        var user = message.mentions.users.first() || bot.users.cache.get(args[0]);

    }

    Data.findOne({

        userID: user.id //find the users account

    }, (err, data) => {

        if(err) console.log(err);
        if(!data) {

            const newData = new Data({

                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                leaderboard: "all",
                money: 0,
                daily: 0,


            })
            newData.save().catch(err => console.log(err));
            return message.channel.send(`${bot.users.cache.get(user.id).username} has 0 ♏︎`);

        } else { //if user already has a data amount


            return message.channel.send(`${bot.users.cache.get(user.id).username} has ${data.money} ♏︎`);

        }

    })

}

module.exports.help = {

    name: "balance",
    aliases: ["bal", "money"]

}
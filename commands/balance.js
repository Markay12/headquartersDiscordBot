const { Client } = require("discord.js");
const fs = require("fs");
const money = require("../money.json");
const mongoose = require("mongoose"); //add new package for database
const botconfig = require("../botconfig.json");

//CONNECT TO MONGOOSEDB
mongoose.connect(botconfig.passmongodb, {

    useNewUrlParser: true

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
    if (!money[user.id]) {

        money[user.id] = {

            name: bot.users.cache.get(user.id).tag,
            money: 0

        }
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {

            if (err) console.log(err)

        });


    }

    return message.channel.send(`${bot.users.cache.get(user.id).username} has ${money[user.id].money} ♏︎`);
    

}

module.exports.help = {

    name: "balance",
    aliases: ["bal", "money"]

}
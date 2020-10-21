const { Client } = require("discord.js");
const fs = require("fs");
const money = require("../money.json")
const mongoose = require("mongoose")
const botconfig = require("../botconfig.json")

/CONNECT TO MONGOOSEDB
mongoose.connect(botconfig.passmongodb, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

});

//MODELS
const Data = require("../models/data.js")

module.exports.run = async (bot, message, args) => {

    if(!args[1]) message.reply("Please specify which role you would like to purchase")

    var pillageRole = message.guild.roles.find(role => role.name === "Pillager");

    let user = message.author; //user can only apply role to themselves

    Data.findOne({

        userID: user.id //find the user account

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
            return message.channel.send(`You have no balance yet, but I've just started up your piggy bank! Nice to meet you ${message.author}`)

        }
        else 
        {

            //what if the user already has money? 
            var pillagerPrice = 150;

            //lets buy pillager rank for 150
            if (data.money >= pillagerPrice)
            {

                message.author.addRole(pillageRole);
                data.money -= pillagerPrice;
                data.save().catch(err => console.log(err));
                return message.reply(`Welcome to the land of the pillagers. Long way to move up but a great start indeed`)

            } else {

                return message.reply(`Sorry, you do not have enough to purchase this role... This role costs 150 ♏︎`)

            }



        }

    })


}

module.exports.help = {

    name: "buy",
    aliases: ["purchase"]

}
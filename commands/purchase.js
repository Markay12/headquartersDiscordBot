const { Client } = require("discord.js");
const fs = require("fs");
const money = require("../money.json")
const mongoose = require("mongoose")
const botconfig = require("../botconfig.json")

//CONNECT TO MONGOOSEDB
mongoose.connect(botconfig.passmongodb, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

});

//MODELS
const Data = require("../models/data.js")

module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.reply("Please specify which role you would like to purchase")

    let pillageRole = '768585859192586251';
    var pillagerPrice = 250; //set price

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

            if (args[0].toLowerCase() == "pillager") 
            {
                //what if the user can try and purchase this role
                

                //lets buy pillager rank for 150
                if (data.money >= pillagerPrice)
                {

                    //if they already have the role
                    if(message.member.roles.cache.has(pillageRole)) return message.reply("You already have this role");

                    message.member.roles.add(pillageRole).catch(console.error);
                    data.money -= pillagerPrice;
                    data.save().catch(err => console.log(err));
                    return message.reply(`*You have just purchased the Pillager Role for 150 ♏︎*\n Welcome to the land of the pillagers. Long way to move up but a great start indeed!`);

                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs 150 ♏︎`);

                }

            }
        }

    })


}

module.exports.help = {

    name: "buy",
    aliases: ["purchase"]

}
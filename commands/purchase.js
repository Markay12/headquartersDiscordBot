const { Client } = require("discord.js");
const fs = require("fs");
const money = require("../money.json")
const mongoose = require("mongoose")
const botconfig = require("../botconfig.json")
const color = require("../colors.json")
const Discord = require("discord.js");

//CONNECT TO MONGOOSEDB
mongoose.connect(botconfig.passmongodb, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

});

//MODELS
const Data = require("../models/data.js")

module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.reply("Please specify which role you would like to purchase")

    let applicantRole = '768858705197531156';
    let wanderRole = '768618964774682645';
    let wanderPrice = 100; //set price
    let tempRole = '768619085151469608';
    let tempPrice = 500;
    let internRole = '768650304941719582';
    let internPrice = 1000;

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

            if (args[0].toLowerCase() == "wander" || args[0].toLowerCase() == "wandering") 
            {
                //what if the user can try and purchase this role
                

                //lets buy pillager rank for 150
                if (data.money >= wanderPrice)
                {

                    //if they already have the role
                    if(message.member.roles.cache.has(wanderRole)) return message.reply("You already have this role");

                    message.member.roles.add(wanderRole).catch(console.error);
                    message.member.roles.remove(applicantRole).catch(console.error);
                    data.money -= wanderPrice;
                    data.save().catch(err => console.log(err));

                    let wanderEmbed = new Discord.MessageEmbed();

                    wanderEmbed.setDescription(`*You have just purchased the Wandering Role for 150 ♏︎*\n Welcome to the server! You've now found a place and ready to move on up!\n Speak with members, get yourself known`)
                    wanderEmbed.setColor(color.brown);

                    return message.reply(wanderEmbed);

                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs 150 ♏︎`);

                }

            } else if (args[0].toLowerCase() == "temp")
            {

                //if they are already a wanderer or if they don't have pillager yet
                if(message.member.roles.cache.has(tempRole)) return message.reply("You already have this role");
                if(!message.member.roles.cache.has(wanderRole)) return message.reply("You can't buy this role until you purchase Wandering");

                if(data.money >= tempPrice)
                {

                    message.member.roles.add(tempRole).catch(console.error);
                    message.member.roles.remove(wanderRole).catch(console.error);
                    data.money -= tempPrice;
                    data.save().catch(err => console.log(err));

                    let tempEmbed = new Discord.MessageEmbed();

                    tempEmbed.setDescription(`*You have just purchased the Temp Role for 1000 ♏︎*\n Welcome! Make sure to change the printer ink. \nI like 2 packets of sugar in my coffee and a splash of cream. Not too cold and not too warm.. just about 195 degrees F\n`);

                    tempEmbed.setColor(color.cream);
                    return message.reply(tempEmbed);

                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs 1000 ♏︎`);

                }

            } else if (args[0].toLowerCase() == "intern")
            {

                //if they are already a wanderer or if they don't have pillager yet
                if(!message.member.roles.cache.has(tempRole)) return message.reply("You can't buy this role until you have access to the temp role");
                if(message.member.roles.cache.has(internRole)) return message.reply("You already have this role");

                if(data.money >= internPrice)
                {

                    message.member.roles.add(internRole).catch(console.error);
                    message.member.roles.remove(tempRole).catch(console.error);
                    data.money -= internPrice;
                    data.save().catch(err => console.log(err));

                    let internEmbed = new Discord.MessageEmbed();
                    internEmbed.setDescription(`We really appreciate all the work that you have put into this company\nTherefore we are happy to announce that we are officially promoting you to Intern position immediately. Congratulations!\n\nYou spent 2000 ♏︎ on this rank`);
                    internEmbed.setColor(color.blue);

                    return message.reply(internEmbed);

                } else {

                    //user doesn't have enough to purchase this role
                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${internPrice} ♏︎`);

                }


            }

        }

    })


}

module.exports.help = {

    name: "buy",
    aliases: ["purchase"]

}

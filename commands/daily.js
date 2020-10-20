const ms = require("parse-ms");
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

    let timeout = 86400000; //seconds in one full day
    let reward = 100;

    Data.findOne({

        userID: message.author.id

    }, (err, data) => {

        if(err) console.log(err);
        if(!data) {

            const newData = new Data({

                name: message.author.username,
                userID: message.author.id,
                leaderboard: "all",
                money: 0,
                daily: Date.now(),


            })
            newData.save().catch(err => console.log(err));
            return message.channel.send(`${message.author.username} has ${reward} ♏︎`);

        } else { //if user already has a data amount

            if(timeout - (Date.now() - data.daily) > 0)
            {

                //set time
                let time = ms(timeout - (Date.now() - data.daily));

                return message.reply(`**You Already Collected your Daily Rewards!**\nCollect Again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);

            }
            else
            {

                data.money += reward; //add reward to user
                
                //set cooldown
                data.daily = Date.now();

                data.save().catch(err => console.log(err)); //save data

                return message.reply(`You have recieved ${reward} ♏︎ for a total of ${data.money}`)

            }

        }

    })

}

module.exports.help = {

    name: "daily",
    aliases: []

}
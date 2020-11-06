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

//role data
let applicantDaily = 100;
let wanderDaily = 300;
let tempDaily = 500;
let internDaily = 1000;
let deskDaily = 1500;
let juniorDaily = 2000;
let seniorDaily = 3000;
let applicantRole = '768858705197531156';
let wanderRole = '768618964774682645';
let tempRole = '768619085151469608';
let internRole = '768650304941719582';
let deskAgentRole = '774106270130241566';
let juniorRole = '763565026006269982';
let seniorRole = '763564784104112130';


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

                if (message.member.roles.cache.has(applicantRole))
                {

                    data.money += applicantDaily; //add reward to user
                    
                    //set cooldown
                    data.daily = Date.now();

                    data.save().catch(err => console.log(err)); //save data

                    return message.reply(`You have recieved ${applicantDaily} ♏︎ for being the role of Applicant. \nYour total balance is now ${data.money} ♏︎`)
                }
                else if (message.member.roles.cache.has(wanderRole))
                {

                    data.money += wanderDaily; //add reward to user
                    
                    //set cooldown
                    data.daily = Date.now();

                    data.save().catch(err => console.log(err)); //save data

                    return message.reply(`You have recieved ${wanderDaily} ♏︎ for being the role of Wanderer. \nYour total balance is now ${data.money} ♏︎`) 

                }
                else if (message.member.roles.cache.has(internRole))
                {

                    data.money += internDaily;
                    data.daily = Date.now();
                    data.save().catch(err => console.log(err)); //save data

                    return message.reply(`You have recieved ${internDaily} ♏︎ for being the role of Intern. \nYour total balance is now ${data.money} ♏︎`) 

                }
                else if (message.member.roles.cache.has(deskAgentRole))
                {

                    data.money += deskDaily;
                    data.daily = Date.now();
                    data.save().catch(err => console.log(err));

                    return message.reply(`You have recieved ${deskDaily} ♏︎ for being the role of Desk Agent! \nYour total balance is now ${data.money} ♏︎`)

                }
                else if (message.member.roles.cache.has(juniorRole))
                {

                    data.money += juniorDaily;
                    data.daily = Date.now();

                    data.save().catch(err => console.log(err));

                    return message.reply(`You have recieved ${juniorDaily} ♏︎ for being the role of Junior Developer! \nYour total balance is now ${data.money} ♏︎`)


                }
                else if (message.member.roles.cache.has(seniorRole))
                {

                    data.money += seniorDaily;
                    data.daily = Date.now();

                    data.save().catch(err => console.log(err));

                    return message.reply(`You have recieved ${seniorDaily} ♏︎ for being the role of SENIOR Developer! \nYour total balance is now ${data.money} ♏︎`)

                }

            }

        }

    })

}

module.exports.help = {

    name: "daily",
    aliases: []

}
const { Client } = require("discord.js");
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


    let wanderPrice = 100; //set price
    let tempPrice = 500;
    let internPrice = 1000;
    let deskAgentPrice = 5000;
    let juniorPrice = 10000;
    let seniorPrice = 20000; 
    let applicantRole = '768858705197531156';
    let wanderRole = '768618964774682645';
    let tempRole = '768619085151469608';
    let internRole = '768650304941719582';
    let deskAgentRole = '774106270130241566';
    let juniorRole = '763565026006269982';
    let seniorRole = '763564784104112130';

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

            if (message.member.roles.cache.has(applicantRole)) 
            {
                //what if the user can try and purchase this role
                

                //lets buy pillager rank for 150
                if (data.money >= wanderPrice)
                {


                    message.member.roles.add(wanderRole).catch(console.error);
                    message.member.roles.remove(applicantRole).catch(console.error);
                    data.money -= wanderPrice;
                    data.save().catch(err => console.log(err));

                    let wanderEmbed = new Discord.MessageEmbed();

                    wanderEmbed.setDescription(`*You have just purchased the Wandering Role for 100 ♏︎*\n Welcome to the server! You've now found a place and ready to move on up!\n Speak with members, get yourself known`)
                    wanderEmbed.setColor(color.brown);

                    return message.reply(wanderEmbed);

                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs 100 ♏︎`);

                }

            } else if (message.member.roles.cache.has(wanderRole))
            {

                if(!message.member.roles.cache.has(wanderRole)) return message.reply("You can't buy this role until you purchase Wandering");

                if(data.money >= tempPrice)
                {

                    message.member.roles.add(tempRole).catch(console.error);
                    message.member.roles.remove(wanderRole).catch(console.error);
                    data.money -= tempPrice;
                    data.save().catch(err => console.log(err));

                    let tempEmbed = new Discord.MessageEmbed();

                    tempEmbed.setDescription(`*You have just purchased the Temp Role for ${tempPrice} ♏︎*\n Welcome! Make sure to change the printer ink. \nI like 2 packets of sugar in my coffee and a splash of cream. Not too cold and not too warm.. just about 195 degrees F\n`);

                    tempEmbed.setColor(color.cream);
                    return message.reply(tempEmbed);

                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${tempPrice} ♏︎`);

                }

            } else if (message.member.roles.cache.has(tempRole))
            {

                if(message.member.roles.cache.has(internRole)) return message.reply("You already have this role");

                if(data.money >= internPrice)
                {

                    message.member.roles.add(internRole).catch(console.error);
                    message.member.roles.remove(tempRole).catch(console.error);
                    data.money -= internPrice;
                    data.save().catch(err => console.log(err));

                    let internEmbed = new Discord.MessageEmbed();
                    internEmbed.setDescription(`We really appreciate all the work that you have put into this company\nTherefore we are happy to announce that we are officially promoting you to Intern position immediately. Congratulations!\n\nYou spent 1000 ♏︎ on this rank`);
                    internEmbed.setColor(color.blue);

                    return message.reply(internEmbed);

                } else {

                    //user doesn't have enough to purchase this role
                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${internPrice} ♏︎`);

                }


            } else if(message.member.roles.cache.has(internRole))
            {

                if(message.member.roles.cache.has(deskAgentRole)) return message.reply("You already have this role");

                if(data.money >= deskAgentPrice)
                {

                    message.member.roles.add(deskAgentRole).catch(console.error);
                    message.member.roles.remove(internRole).catch(console.error);
                    data.money -= deskAgentPrice;
                    data.save().catch(err => console.log(err));

                    let deskAgentEmbed = new Discord.MessageEmbed();
                    deskAgentEmbed.setDescription("Congratulations! You have now been offered a real job here! We are happy that you have stayed with us and decidede to join this team!\nYour new daily paycheck will be 1500 ♏︎!\n\nWelcome to the team!");
                    
                    deskAgentEmbed.setColor(color.orange);

                    return message.reply(deskAgentEmbed);


                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${deskAgentPrice} ♏︎`);

                }

            } else if (message.member.roles.cache.has(deskAgentRole))
            {

                if(message.member.roles.cache.has(juniorRole)) return message.reply("You already have this role");

                if(data.money >= juniorPrice)
                {

                    message.member.roles.add(juniorRole).catch(console.error);
                    message.member.roles.remove(deskAgentRole).catch(console.error);
                    data.money -= juniorPrice;
                    data.save().catch(err => console.log(err));

                    let juniorRoleEmbed = new Discord.MessageEmbed();
                    juniorRoleEmbed.setDescription("We can't believe it has been this long and you've stuck with us.\n\nI congratulate you on all of your success!\n Thank you!! Your new paycheck is 2000 ♏︎");

                    
                    juniorRoleEmbed.setColor(color.purple);

                    return message.reply(juniorRoleEmbed);


                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${juniorPrice} ♏︎`);

                }

            } else if(message.member.roles.cache.has(seniorRole))
            {

                if(message.member.roles.cache.has(seniorRole)) return message.reply("You already have this role");

                if(data.money >= seniorPrice)
                {

                    message.member.roles.add(seniorRole).catch(console.error);
                    message.member.roles.remove(juniorRole).catch(console.error);
                    data.money -= seniorPrice;
                    data.save().catch(err => console.log(err));

                    let seniorRoleEmbed = new Discord.MessageEmbed();
                    seniorRoleEmbed.setDescription("Good job. You've made it. Now instead of learning how to code and being a programmer you're solving everyone's issues\nYou are becoming a great worker and have definitely graduated from StackOverflow\n\nNew paycheck = 3000 ♏︎");

                    
                    seniorRoleEmbed.setColor(color.red);

                    return message.reply(seniorRoleEmbed);


                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${seniorPrice} ♏︎`);

                }

            }

        }

    })


}

module.exports.help = {

    name: "buy",
    aliases: ["rankup", "purchase"]

}

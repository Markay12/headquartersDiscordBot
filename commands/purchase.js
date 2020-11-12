const { Client } = require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");
const color = require("../colors.json");
const Discord = require("discord.js");
const role = require("../roles.json");

//CONNECT TO MONGOOSEDB
mongoose.connect(botconfig.passmongodb, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

});

//MODELS
const Data = require("../models/data.js")

module.exports.run = async (bot, message, args) => {

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

            if (message.member.roles.cache.has(role.applicant.role)) 
            {
                //what if the user can try and purchase this role
                

                //lets buy pillager rank for 150
                if (data.money >= role.wander.price)
                {


                    message.member.roles.add(role.wander.role).catch(console.error);
                    message.member.roles.remove(role.applicant.role).catch(console.error);
                    data.money -= role.wander.price;
                    data.save().catch(err => console.log(err));

                    let wanderEmbed = new Discord.MessageEmbed();

                    wanderEmbed.setDescription(`*You have just purchased the Wandering Role for 100 ♏︎*\n Welcome to the server! You've now found a place and ready to move on up!\n Speak with members, get yourself known`)
                    wanderEmbed.setColor(color.brown);

                    return message.reply(wanderEmbed);

                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs 100 ♏︎`);

                }

            } else if (message.member.roles.cache.has(role.wander.role))
            {

                if(!message.member.roles.cache.has(role.wander.role)) return message.reply("You can't buy this role until you purchase Wandering");

                if(data.money >= role.temp.price)
                {

                    message.member.roles.add(role.temp.role).catch(console.error);
                    message.member.roles.remove(role.wander.role).catch(console.error);
                    data.money -= role.temp.price;
                    data.save().catch(err => console.log(err));

                    let tempEmbed = new Discord.MessageEmbed();

                    tempEmbed.setDescription(`*You have just purchased the Temp Role for ${role.temp.price} ♏︎*\n Welcome! Make sure to change the printer ink. \nI like 2 packets of sugar in my coffee and a splash of cream. Not too cold and not too warm.. just about 195 degrees F\n`);

                    tempEmbed.setColor(color.cream);
                    return message.reply(tempEmbed);

                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${role.temp.price} ♏︎`);

                }

            } else if (message.member.roles.cache.has(role.temp.role))
            {

                if(message.member.roles.cache.has(role.intern.role)) return message.reply("You already have this role");

                if(data.money >= role.intern.price)
                {

                    message.member.roles.add(role.intern.role).catch(console.error);
                    message.member.roles.remove(role.temp.role).catch(console.error);
                    data.money -= role.intern.price;
                    data.save().catch(err => console.log(err));

                    let internEmbed = new Discord.MessageEmbed();
                    internEmbed.setDescription(`We really appreciate all the work that you have put into this company\nTherefore we are happy to announce that we are officially promoting you to Intern position immediately. Congratulations!\n\nYou spent 1000 ♏︎ on this rank`);
                    internEmbed.setColor(color.blue);

                    return message.reply(internEmbed);

                } else {

                    //user doesn't have enough to purchase this role
                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${role.intern.price} ♏︎`);

                }


            } else if(message.member.roles.cache.has(role.intern.role))
            {

                if(message.member.roles.cache.has(role.deskAgent.role)) return message.reply("You already have this role");

                if(data.money >= role.deskAgent.price)
                {

                    message.member.roles.add(role.deskAgent.role).catch(console.error);
                    message.member.roles.remove(role.intern.role).catch(console.error);
                    data.money -= role.deskAgent.price;
                    data.save().catch(err => console.log(err));

                    let deskAgentEmbed = new Discord.MessageEmbed();
                    deskAgentEmbed.setDescription("Congratulations! You have now been offered a real job here! We are happy that you have stayed with us and decidede to join this team!\nYour new daily paycheck will be 1500 ♏︎!\n\nWelcome to the team!");
                    
                    deskAgentEmbed.setColor(color.orange);

                    return message.reply(deskAgentEmbed);


                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${role.deskAgent.price} ♏︎`);

                }

            } else if (message.member.roles.cache.has(role.deskAgent.role))
            {

                if(message.member.roles.cache.has(role.juniorDev.role)) return message.reply("You already have this role");

                if(data.money >= role.juniorDev.price)
                {

                    message.member.roles.add(role.juniorDev.role).catch(console.error);
                    message.member.roles.remove(role.deskAgent.role).catch(console.error);
                    data.money -= role.juniorDev.price;
                    data.save().catch(err => console.log(err));

                    let juniorEmbed = new Discord.MessageEmbed();
                    juniorEmbed.setDescription("We can't believe it has been this long and you've stuck with us.\n\nI congratulate you on all of your success!\n Thank you!! Your new paycheck is 2000 ♏︎");

                    
                    juniorEmbed.setColor(color.purple);

                    return message.reply(juniorEmbed);


                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${role.juniorDev.price} ♏︎`);

                }

            } else if(message.member.roles.cache.has(role.seniorDev.role))
            {

                if(message.member.roles.cache.has(role.seniorDev.role)) return message.reply("You already have this role");

                if(data.money >= role.seniorDev.price)
                {

                    message.member.roles.add(role.seniorDev.role).catch(console.error);
                    message.member.roles.remove(role.juniorDev.role).catch(console.error);
                    data.money -= role.seniorDev.price;
                    data.save().catch(err => console.log(err));

                    let seniorEmbed = new Discord.MessageEmbed();
                    seniorEmbed.setDescription("Good job. You've made it. Now instead of learning how to code and being a programmer you're solving everyone's issues\nYou are becoming a great worker and have definitely graduated from StackOverflow\n\nNew paycheck = 3000 ♏︎");

                    
                    seniorEmbed.setColor(color.red);

                    return message.reply(seniorEmbed);


                } else {

                    return message.reply(`Sorry, you do not have enough to purchase this role... This role costs ${role.seniorDev.price} ♏︎`);

                }

            }

        }

    })


}

module.exports.help = {

    name: "buy",
    aliases: ["rankup", "purchase"]

}

const money = require("../money.json");
const fs = require("fs");
const { parse } = require("path");

module.exports.run = async (bot, message, args) => {

    if(message.author.id != "580894635606409228") return message.reply("You cannot use this command")

    let user = message.mentions.members.first() || bot.users.cache.get(args[0]); //get user by mention
    if(!user) return message.reply("Sorry, couldn't find that member. Make sure they haven't been laid off... \n*we've had some recent budget cuts*");

    if(!args[1]) return message.reply("Please specify the amount you would like to donate");
    

    if(!money[user.id])
    {

        money[user.id] = 
        {

            name: bot.users.cache.get(user.id).tag,
            money: parseInt(args[1])

        }


        fs.writeFile("./money.json", JSON.stringify(money), (err) => {

            if(err) console.log(err);

        });

    } else
    {

        money[user.id].money += parseInt(args[1]);


        fs.writeFile("./money.json", JSON.stringify(money), (err) => {

            if(err) console.log(err);

        });

    }

    return message.channel.send(`${message.author.username} admin payed ♏︎ ${args[1]} to ${bot.users.cache.get(user.id).username}`);

    
}

module.exports.help = {

    name: "adminpay",
    aliases: []

}
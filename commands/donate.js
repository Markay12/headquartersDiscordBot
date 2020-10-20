const money = require("../money.json");
const fs = require("fs");
const { parse } = require("path");

module.exports.run = async (bot, message, args) => {

    let user = message.mentions.members.first() || bot.users.cache.get(args[0]); //get user by mention
    if(!user) return message.reply("Sorry, couldn't find that member. Make sure they haven't been laid off... \n*we've had some recent budget cuts*");

    if(!args[1]) return message.reply("Please specify the amount you would like to donate");

    if(!money[message.author.id]) return message.reply("Sorry, you don't have any money :cry:");

    if(user.id == message.author.id) return message.reply("You can't pay yourself... you sly dog");

    if(parseInt(args[1]) > money[message.author.id].money) return message.reply("Sorry, you don't have enough money to donate.\n\nMaybe trying coding in :python: seems to make a lot of ♏︎'s right now");
    if(parseInt(args[1]) < 1) return message.reply("You can't send less than 1 ♏︎... how poor are you?");

    if(!money[user.id])
    {

        money[user.id] = 
        {

            name: bot.users.cache.get(user.id).tag,
            money: parseInt(args[1])

        }

        money[message.author.id].money -= parseInt(args[1]);

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {

            if(err) console.log(err);

        });

    } else
    {

        money[user.id].money += parseInt(args[1]);

        money[message.author.id].money -= parseInt(args[1]);

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {

            if(err) console.log(err);

        });

    }

    return message.channel.send(`${message.author.username} payed ♏︎ ${args[1]} to ${bot.users.cache.get(user.id).username}`);

    
}

module.exports.help = {

    name: "donate",
    aliases: ["d", "donate"]

}
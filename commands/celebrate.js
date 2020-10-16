const Discord = require("discord.js");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    let gifs = [

        "https://media.giphy.com/media/QlvPwCTw59B2E/giphy.gif",
        "https://media.giphy.com/media/s2qXK8wAvkHTO/giphy.gif",
        "https://media.giphy.com/media/m8crpzTJFRDPhqqhXJ/giphy.gif",
        "https://media.giphy.com/media/HqJmOe2M1Af9C/giphy.gif"

    ]

    let pick = gifs[Math.floor(Math.random() * gifs.length)];

    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.gold);
    embed.setImage(pick);

    if(args[0]){

        let user = message.mentions.members.first();
        embed.setTitle(`${message.author.username} Congratulations! ${bot.users.cache.get(user.id).username}!`);


    } else {

        embed.setTitle(`${message.author.username} wants a Celebration!`);

    }

    message.channel.send(embed);

}

module.exports.help = {

    name: "celebrate",
    aliases: []

}
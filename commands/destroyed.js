const Discord = require("discord.js");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    let gifs = [

        "https://media.giphy.com/media/26FfaYF8aDEmaJMdy/giphy.gif",
        "https://media.giphy.com/media/26tjZQs8GhNsXA7p6/giphy.gif",
        "https://media.giphy.com/media/5qoRdabXeT4GY/giphy.gif",
        "https://i.kym-cdn.com/entries/icons/original/000/022/134/elmo.jpg"
    ]

    let pick = gifs[Math.floor(Math.random() * gifs.length)];

    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.orange);
    embed.setImage(pick);

    if(args[0]){

        embed.setTitle(args[0] + " got DESTROYED!");


    } else {

        embed.setTitle(`DESTRUCTION!!`);

    }

    message.channel.send(embed);

}

module.exports.help = {

    name: "destruction",
    aliases: []

}
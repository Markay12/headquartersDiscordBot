const Discord = require("discord.js");
const color = require("../colors.json")

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    embed.setDescription("New Bot Updates as of 12 November 2020\n\n*Minor Change*\nFixed issue with donation to user. Now fixed between 0-10000\n\nContact Markay#5500 for any more information");

    embed.setColor(color.red);
    return message.channel.send(embed);

}

module.exports.help = {

    name: "updates",
    aliases: ["new"]

}

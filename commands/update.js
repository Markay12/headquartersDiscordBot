const Discord = require("discord.js");
const color = require("../colors.json")

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    embed.setDescription("New Bot Updates as of 12 November 2020\n\n**Added New Role Information!**\n.json file includes all role information. New role available for purchase Senior Developer which costs 20,000.\n Modules and .ranks has been updated as well\n\nContact Markay#5500 for any more information");

    embed.setColor(color.red);
    return message.channel.send(embed);

}

module.exports.help = {

    name: "updates",
    aliases: ["new"]

}

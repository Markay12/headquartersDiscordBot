const Discord = require("discord.js");
const color = require("../colors.json")

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    embed.setDescription("New Bot Updates as of 05 November 2020\n\n**Added New Roles!**\nDesk Agent, Junior Developer and Senior Developer are available for Purchase\n\nDaily functionality is set for each role and will update for each new role.\nDesk Agent Recieves 1500\nJunior Developer Recieves 2000 and Senior Developer recieves 3000");

    embed.setColor(color.red);
    return message.channel.send(embed);

}

module.exports.help = {

    name: "updates",
    aliases: ["new"]

}

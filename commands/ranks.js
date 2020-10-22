const color = require("../colors.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    embed.setDescription(`RISE THROUGH THE RANKS!\n
                        Use .purchase <rankname> to purchase each rank and move your way through the server!\n-------------------------------------------\n
                        Wandering --------- 100 ♏︎\n
                        Temp --------- 500 ♏︎\n
                        Intern --------- 1000 ♏︎\n`);


    embed.setColor(color.gold);
    return message.channel.send(embed);

}

module.exports.help = {

    name: "ranks",
    aliases: ["ranks", "ranklist", "rl"]

}

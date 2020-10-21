const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    embed.setDescription(`RISE THROUGH THE RANKS!\n-------------------------------------------\n
                         Wandering --------- 250 ♏︎\n
                         Peasant --------- 1000\n`);


    embed.setColor(color.gold);
    return message.channel.send(embed);

}

module.exports.help = {

    name: "ranks",
    aliases: ["ranks", "ranklist", "rl"]

}
const color = require("../colors.json");
const Discord = require("discord.js");
const role = require("../roles.json");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    embed.setDescription(`RISE THROUGH THE RANKS!\n
                        Use .purchase <rankname> to purchase each rank and move your way through the server!\n-------------------------------------------\n
                        Applicant ------------- FREE ♏︎\n
                        Wandering -------------  ${role.wander.price} ♏︎\n
                        Temp ------------------- ${role.temp.price} ♏︎\n
                        Intern ---------------- ${role.intern.price} ♏︎\n
                        Desk Agent ------------ ${role.deskAgent.price} ♏︎\n
                        Junior Developer ----- ${role.deskAgent.price} ♏︎\n
                        Senior Developer ----- ${role.seniorDev.price} ♏︎\n`);


    embed.setColor(color.gold);
    return message.channel.send(embed);

}

module.exports.help = {

    name: "ranks",
    aliases: ["ranks", "ranklist", "rl"]

}

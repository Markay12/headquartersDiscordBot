const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    embed.setDescription(`Hi! I am Human Resources for this server!\nThough I may not be super cool and can't do everything there are still some awesome commands that I can do!\n
                         I'll list them below!\n\n\n
                         
                         Basic Commands\n---------------------
                         .ping ---> You can use this to make sure I'm awake and check latency between us\n
                         .help ---> Well... you got here somehow???\n\n
                         Economy\n---------------------
                         YOU HAVE TO USE COMMAND .bal before you can claim your daily rewards
                         .bal ---> Check your server balance for daily rewards and betting!\n
                         .daily ---> Collect your daily rewards balance here!\n\n\nFeel free to send CEO Markay#5500 or COO FeatheredSnake#6504 any questions or things you would like implemented in the future!`);



    embed.setColor("0000ff");
    return message.channel.send(embed);

}

module.exports.help = {

    name: "help",
    aliases: ["h", "help", "commands"]

}
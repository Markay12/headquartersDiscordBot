const { Client } = require("discord.js");
const fs = require("fs");
const money = require("../money.json")

module.exports.run = async (bot, message, args) => {

    if(!args[0])
    {

        //TODO: Add Code
        return;

    }
    

}

module.exports.help = {

    name: "buy",
    aliases: ["purchase"]

}
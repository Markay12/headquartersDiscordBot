module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission!");
    if(!args[0]) return message.reply("How many messages would you like to clear? ");
    if(parseInt(args[0]) > 99) return message.reply("You cannot delete more than 99 messages at one time");

    message.channel.bulkDelete(parseInt(args[0])+ 1).then(()  => {

        message.channel.send(`Cleared ${args[0]} messages!`).then(msg => msg.delete({timeout: 300}));

    }).catch((err)  => {

        return message.reply("An error has occured!");

    })

}

module.exports.help = {

    name: "1216681349",
    aliases: ["clear"]

}
# The Headquarters
Python bot for The HQ Discord server ran by Markay#5500, first bot in Python rather than Node JS

![Headquarters](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2016%2F03%2FCity-Building-PNG-180x180.png&f=1&nofb=1)

# Table of Contents
* [About Me]()
* [Commands]()
* [Economy]()
* [Database]()


# About Me
Hello, I am the human resources bot for the Headquarters discord server. I am here to moderate and add functionality to the server for everyone.
* If you have any questions for me, ask Markay#5500 on Discord

# Commands
These are my commands which will be updated frequently, some are for fun but some should be able to help most with their daily work.

Firstly, this is my prefix `.` which is just one period. You use this before every command that you want i.e. `.commands`

1. `.bal` --> Returns the balance of each user and starts the collection of the users information into the database
2. `.celebrate <@user>` --> Pass in someones name (or no name) to display a celebration gif 
3. `.clear` --> allows the user to clear a certain amount of messages (max 99 messages)
4. `.daily` --> ability to collect an amount of money every 24-hours
5. `.destroyed <@user>` --> similar to celebrate, the user can show a destroyed message with a username if wanted
6. `.donate <@user>` --> donate an amount of money to any user within the server. Cannot donate to yourself
7. `.gamble <amount>` --> gamble a certain amount of money (risk it all with .gamble all)
8. `.help` --> list all commands in the server
9. `.ping` --> initial command, shows latency
10. `.purchase` --> purchase roles within the server 
11. `.ranks` --> Displays which ranks the user can buy and upgrade 

# Economy
This server continues to expand on and include our fully functioning economy where users can increase, donate, gamble and purchase items. The economy is used for these items right now and is included in the command list above. 
New ways to use the economy are being implemented everyday and will continue to grow

# Database
The economy for this server has been uploaded online so that the daily reset and amount of money will always be up to date.
Using Mongoose Databse I was able to create a schema which tracks each userID, money, daily reset and plcae within the leaderboard.

This database can be accessed through an account if any issues should occur. 

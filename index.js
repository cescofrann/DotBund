global.Discord = require('discord.js')
global.client = new Discord.Client({
    intents: [
      "GUILDS", 
      "GUILD_MEMBERS", 
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_BANS",
      "GUILD_INTEGRATIONS",
      "GUILD_WEBHOOKS",
      "GUILD_INVITES",
      "GUILD_VOICE_STATES",
      "GUILD_PRESENCES",
      "GUILD_MESSAGE_TYPING",
      "DIRECT_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_TYPING",
      "DIRECT_MESSAGES"
    ],
    partials: ["CHANNEL", "MESSAGE", "REACTIONS"],
    allowedMentions: { parse: ["users", "roles", "everyone"], repliedUser: true }
  });
global.config = require('./config.json')
const { SlashCommandBuilder } = require('@discordjs/builders');

const { MessageActionRow, MessageButton } = require('discord.js');

client.login(config.token)


const fs = require("fs")
client.commands = new Discord.Collection()

console.log('Inizio a controllare le license: \n')
const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command)
    }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client))
};

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    command.execute(interaction).catch(err => {})
})




    //     //-------------------  Filtra parole  ----------------------------

    if (message.author.id == client.user.id) return
    if (message.member.roles.cache.has(r => r.id ==  config.roleSupport)) return 

    const badwords = config.BadWords

 
        badwords.forEach( async parola =>{
            

                if (message.content.toLowerCase().includes(parola)) {
                    var allertEmbed = new Discord.MessageEmbed()
                        .setTitle("Warning ")
                        .setDescription("Hai Scritto una parola non consentita " + message.author.toString())  
                        .setColor("ff0000");
                    var logEmbed = new Discord.MessageEmbed()
                        .setTitle("BadWord Detection")
                        .setDescription(message.author.toString()+ "Ha detto: \n" + "``" + message.content + "``")
                        .setThumbnail("https://icon-library.com/images/security-lock-icon/security-lock-icon-11.jpg")                          
                        .setColor(config.serverColorMain)
                        .setTimestamp()
                        .setFooter('DotBund',"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670");
                const logStaff= client.channels.cache.get(config.logStaff);
                message.author.send({ embeds: [allertEmbed] }); 

                
                await message.delete().catch(e=>{console.log("-_-")});
                return logStaff.send({embeds: [logEmbed]}) 
                }
            



            
            

            
        })

                    
    
    

    





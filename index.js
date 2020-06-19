// require the discord.js module
const Discord = require('discord.js');
const fs = require('fs');

const { prefix, token } = require('./config.json');


// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Dynamicalled retrieve command files
// returns an array of all the files names
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(token);

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (!client.commands. has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch(error) {
		console.error(error);
		message.reply('there was an error trying to executre that command!');
	}


    // if (command === 'args-info') {
    //     if (!args.length) {
    //         return message.channel.send(`You didn't provide any arguments, ${message.guild.members}!`);
    //     }
    
    //     message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    // }

	// const memberN = message.mentions.members.first();
	
   // memberN.kick();
    
});
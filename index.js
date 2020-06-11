// require the discord.js module
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// client.user.setActivity('<Minister for General Mayhem>');
 
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(token);

client.on('message', message => {

    // if (!message.content.startsWith(prefix) || message.author.bot) return;

    // const args = message.content.slice(prefix.length).split(/ +/);
    // const command = args.shift().toLowerCase();

    // if (command === 'args-info') {
    //     if (!args.length) {
    //         return message.channel.send(`You didn't provide any arguments, ${message.guild.members}!`);
    //     }
    
    //     message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    // }
    if (message.content === '!speech') {
		if (message.channel.type !== 'text') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=v6L66xhKdgE', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('end', () => voiceChannel.leave());
		});
    }
    
    if (message.content === '!come out') {
		if (message.channel.type !== 'text') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=covsPZt6bwM', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('end', () => voiceChannel.leave());
		});
	}

	if (message.content === `${prefix}ooh ahh`) {

        message.guild.members.fetch().then(fetchedMembers => {
           // console.log(fetchedMembers);
            const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
            // We now have a collection with all online member objects in the totalOnline variable
            const members = totalOnline.toJSON();

            const users = members.map(member => member.displayName);
            //console.log(members);
            message.channel.send(`${users} are in the RA!`);
        });
        
		// send back "Pong." to the channel the message was sent in
		// message.channel.send(`Up the Ra! ${message.guild.name}`);
		
	}
    
});
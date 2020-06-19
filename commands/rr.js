module.exports = {
	name: 'rr',
	description: 'Russian Roulette, will disconnect one random player from the voice channel that the user qho issued the command is in',
	execute(message) {
        if (message.content === '!rr') {

            if (message.channel.type !== 'text') return;

            // Only Continue if the user who gave the command is currently in a 
            const voiceChannel = message.member.voice.channel;  

            if (!voiceChannel) {
                return message.reply('please join a voice channel first!');
            }
            // Select a "random" user from the current voice channel and kick them from it
            const victims = voiceChannel.members.map(member => member);
            const userArray = Object(victims);
            const loser = userArray[(Math.floor(Math.random() * voiceChannel.members.size))];
            loser.voice.kick();
        }
	},
};
module.exports = {
	name: 'kneecap',
	description: 'Plays "Get your Brits out" by Kneecap from YoutTube',
	execute(message) {

        const ytdl = require('ytdl-core');

		if (message.content === '!kneecap') {
            if (message.channel.type !== 'text') return;

            const voiceChannel = message.member.voice.channel;

            if (!voiceChannel) {
                return message.reply('please join a voice channel first!');
            }

            voiceChannel.join().then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=2SsOmjwZKrI', { filter: 'audioonly' });
                const dispatcher = connection.play(stream);

                dispatcher.on('end', () => voiceChannel.leave());
            });
        }
	},
};
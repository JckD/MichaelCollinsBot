module.exports = {
	name: 'comeout',
	description: 'Plays Come out Ye Black and Tans from YouTube',
	execute(message) {
		if (message.content === '!come out') {

            const ytdl = require('ytdl-core');

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
	},
};
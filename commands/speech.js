module.exports = {
	name: 'speech',
	description: 'Command that plays a Michael Collins speech from YouTube',
	execute(message) {

        const ytdl = require('ytdl-core');

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
    
	},
};
 
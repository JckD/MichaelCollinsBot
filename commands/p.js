module.exports = {
	name: 'p',
	description: 'Plays a youtbe video taking the URL of the video and volume for the bot to stream at.',
	execute(message, args) {

		const ytdl = require('ytdl-core');
        
        if (message.channel.type !== 'text') return;

        const voiceChannel = message.member.voice.channel;

        // Only play if a the user who sent the command is in a voice channel
        if (!voiceChannel) {
            return message.reply('please join a voice channel first!');
        }
        // Set volume
        let volume = 0;
        // Make sure the volume argument is valid and if it is divide it by ten and set it to 'volume'
        if (args[1] > 10 || args[1] < 1) {
            return message.reply('please give a volume for the bot play at from 1-10 separated by a space.');
        } 
        else if (args[1] === undefined) {
            volume = 0.5;
        }
        else {
            volume = args[1] / 10;
        }

        // Join the voice channel and start the stream from the given youtube link
        voiceChannel.join().then(connection => {
            const stream = ytdl(args[0], { filter: 'audioonly' });
            const dispatcher = connection.play(stream, { volume : volume });

            dispatcher.on('end', () => voiceChannel.leave());
        });
        
	},
};
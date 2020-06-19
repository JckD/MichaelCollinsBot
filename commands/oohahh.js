module.exports = {
	name: 'oohahh',
	description: 'Returns a list of all online members in the guild',
	execute(message) {

        if (message.content === '!oohahh') {

            message.guild.members.fetch().then(fetchedMembers => {
            // console.log(fetchedMembers);
                const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
                // We now have a collection with all online member objects in the totalOnline variable
                const members = totalOnline.toJSON();

                const users = members.map(member => member.displayName);
                // console.log(members);
                message.channel.send(`${users} are in the RA!`);
            });
            
            // message.channel.send(`Up the Ra! ${message.guild.name}`);
            
        }
	},
};
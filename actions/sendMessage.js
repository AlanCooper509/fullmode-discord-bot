const {ChannelType} = require('discord.js');

module.exports = {
    async toChannel(channel, messageContent) {
        try {
            if (channel && channel.type === ChannelType.GuildText) {
                await channel.send(messageContent);
                console.log('Message sent successfully.');
            } else {
                console.log('Invalid channel or channel is not a text channel.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    },
    async toUser(user, messageContent) {
        try {
            if (user) {
                await user.send(messageContent);
            } else {
                console.log('This user does not exist');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}
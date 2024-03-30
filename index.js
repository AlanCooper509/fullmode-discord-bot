// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, ChannelType } = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN
console.log(process.env.token)
// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
    ]
});

// Contants
const guildId = '1215081626527342613';
const mainChannelId = '1215081627017936999';

// FUNCTIONS

// Function to send a message to a channel
async function sendMessageToChannel(channelId, messageContent) {
    try {
        //console.log('Fetching channel with ID:', channelId);
        const channel = await client.channels.fetch(channelId);
        //console.log('Channel Name:', channel.name);
        //console.log('Channel type:', channel.type);
        if (channel && channel.type === ChannelType.GuildText) {
            await channel.send(messageContent);
            console.log('Message sent successfully.');
        } else {
            console.log('Invalid channel or channel is not a text channel.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Sends a message to a user's direct message
async function sendMessageToUser(userId, messageContent) {
    try {
        const guild = await client.guilds.fetch(guildId);
        const user = await guild.members.fetch(userId);
        if (user) {
            await user.send(messageContent);
        } else {
            console.log('This user does not exist');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Gives a selected role to user
async function giveRoleUser(guild, userId, roleId){
    try {
        const member = await guild.members.fetch(userId);
        const role = guild.roles.cache.get(roleId);
        if (!role || !member) {
            return;
        }
        await member.roles.add(role);
        return `Gave ${role} to ${member}`
    } catch (error) {
        console.log('Error adding role to user: ', error);
        return;
    }
}

// This function is for testing purposes only
// Currently it just assigns the Test role to a user
async function test(){
    try {
        const guild = await client.guilds.fetch(guildId);
        const testRoleId = '1219759540556529664';
        const result = await giveRoleUser(guild, '193142397142695936', testRoleId);
        await sendMessageToChannel(mainChannelId, result);
    } catch(error) {
        console.log('Error adding role to user:', error);
    }
}

// EVENTS

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async(readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    try {
        //await sendMessageToChannel('1215081627017936999', '**bold text**');
        await sendMessageToUser('193142397142695936', 'this is a secret message do not share');
    } catch(error) {
        console.error('Error fetching guild:', error);
    }
});

client.on("messageCreate", (message) => {
    if(message.content == '' || message.author.bot) {
        /* Conditions:
         * - empty channel message?
         * - Discord.GatewayIntentBits.MessageContent intent not set
         * - some bot messaged the channel
         */
        return;
    }
    // message.reply('Goodbye');
});

// Log in to Discord with your client's token
client.login(token);
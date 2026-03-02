const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// SEUS IDs
const GUILD_ID = "1301421637606047755";
const VOICE_CHANNEL_ID = "1301632901024321646";

const TOKEN = process.env.TOKEN;

client.once('ready', async () => {
  console.log(`Logado como ${client.user.tag} ✅`);

  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false
  });

  console.log('Bot entrou na call 24/7 🎧');
});

client.login(TOKEN);

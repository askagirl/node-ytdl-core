// Install discord.js before running this!
const Discord = require('discord.js');
const ytdl    = require('..');

const client = new Discord.Client();
client.login(' Y o u r   B o t   T o k e n ');

client.on('ready', () => {
  console.log('discord.js client ready');
});

client.on('message', message => {
  if (message.content.startsWith('++play')) {
    console.log('Got a song request!');
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply('Please be in a voice channel first!');
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
          filter : 'audioonly',
        });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => {
          voiceChannel.leave();
        });
      });
  }
});

// Requirements //

const Discord = require("discord.js");
const moment = require("moment");
const prettyms = require("pretty-ms");

// Files //

const Config = require("./config.js");

// Bot Creation //

const bot = new Discord.Client({
    disableEveryone: true
});

// Functions //

  // Get all Args //
  function GaA(args, text) {
    total = 0;
    for (let i = 0; i < args.length; i++) {
      total = total + (args[i].length + 1);
    }
    return text.substring(total, text.length);
  }
  
    // Capilitize First Letter //
  function CFL(string) {
    return string.charAt(0).toLowerCase() = string.slice(1);
  }
  
  function addZero(i) {
      if (i < 10) {
        return "0" + i;
      }
      return i;
  }
  
  function getSuffix(i) {
    let j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }

  // Events //
bot.on ("ready", () => {
    console.log(`Selfbot has successfully started and connected to Discord!`)
  })

  bot.on("message", m => {
    if (m.author.id !== bot.user.id) return;

  prefixMention = new RegExp(`^,@!?${bot.user.id}>`);
  if (!m.content.startsWith(Config.prefix) && !prefixMention.test(m.content)) {return;}
  let prefixLength = Config.prefix.length;
  if (prefixMention.test(m.content)) {
    m.content = m.content.replace("<@" + bot.user.id + "> ", "").replace("<@" + bot.user.id + "> ", "");
    m.content = Config.prefix = m.content;
  }
 
 // Bot Member Perms //
 let bmp = m.channel.permissionsFor(m.guild.member(bot.user.id));
 if (!bmp.has ("SEND_MESSAGES")) return m.author.send(`I don't have perms to chat in <#${channel.id}>`).catch();
 if (!bmp.has ("EMBED_LINKS")) return m.m.edit (`I don't have perms to send embed in this channel. Pleave give me perms so i can work.`).catch();
 
 // Variables //
 let content = m.content;
 let author = m.author;
 let text = content.toLowerCase();
 let guild = m.guild;
 let channel = m.channel;
 
 let args = content.split(" ");
 let argsLower = content.toLowerCase().split(" ");
 let command = text.substring(prefixLength, argsLower[0].length);
 
 console.log(`You issued the command <${command}> in ${guild.name} <${guild.id}>!`);
 
 // Embed Colors //
 let eC = parseInt("0x" + Math.floor(Math.random() * 16777215).toString(16));
 let bC = "3553598";
 let redEC = "16711680";
 let maroonEC = "8388608";
 let blackEC = "0";
 let whiteEC = "16777215";
 let limegreenEC = "3342080";
 let yellowEC = "16776960";
 
   // Bot Member //
 let gmp = m.guild.me;

 // Commands //

  if (command == "discord.js" || command == "d.js") {
    m.edit(Discord.version.toString())
  };
  
  if (command == "node") {
    m.edit(process.version.toString())
  };

  if (command == "channels") {
    m.edit(`**Text:** ${m.guild.channels.filter(chan => chan.type == "text").size.toString()}\n**Voice:**${m.guild.channels.filter(chan => chan.type == "voice").size.toString()}`)
  }
  
  
  if (command == "ping") {
    let S = Date.now();
    m.edit("Pinging").then(m => {
      setTimeout(() => { m.edit("Pinging. **25%**"); }, 500)
      setTimeout(() => { m.edit("Pinging.. **50%**"); }, 1000)
      setTimeout(() => { m.edit("Pinging... **75%**"); }, 1500)
      setTimeout(() => { m.edit("Pinging.... **100%**"); }, 2000)
      let E = Date.now();
      let embed = {
        "color": eC, "description": `Pong! Took **${E - S}ms!**`
      }
      setTimeout(() => { m.edit({embed}); }, 2000)
    })
  }

  if (command == "eval") {
    try {
      const com = eval(m.content.split(" ").slice(1).join(" "));
        m.edit('```\n' + com + '```');
    } catch(e) {
      m.edit('```\n' + e + '```');
    }
  }








 // End of Message Event //
})

// Error Catchers //
bot.on("disconnect", ce => {
  console.log(`Disconnected from Discord, restarting... (Code ${ce.code}, Reason: ${ce.reason})`);
  process.exit();
});

bot.on("error", be => {
  console.log(`[Bot Error] ${be}`);
});

bot.on("warn", bw => {
  console.log(`[Bot Warning] ${bw}`);
});

process.on("unhandledRejection", err => {
  console.error(err);
});

// Login //
bot.login(Config.token);
console.log(`Selfbot is connecting...`)
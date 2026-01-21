// export default {
//   name: 'ping',
//   description: 'Check bot latency',
//   category: 'utility',

//   async execute(sock, m, args) {
//     const start = Date.now();

//     // Initial scanning animation
//     await sock.sendMessage(m.key.remoteJid, {
//       text: `
// ╭━━🐺 *WOLFBOT SYSTEM CHECK* 🐺━╮
// ┃  ⚙️ Initializing Neural Circuits...
// ┃  📡 Tracking Core Signal...
// ┃  🧠 Syncing Wolf Consciousness...
// ╰━━━━━━━━━━━━━━━╯
// `
//     }, { quoted: m });

//     const latency = Date.now() - start;

//     // Determine latency status
//     let statusEmoji, statusText, mood;
//     if (latency <= 100) {
//       statusEmoji = "🟢";
//       statusText = "Lightning Fast";
//       mood = "⚡ Hyper Instinct Mode Activated!";
//     } else if (latency <= 300) {
//       statusEmoji = "🟡";
//       statusText = "Moderate";
//       mood = "🧠 Calculating Precision Hunt...";
//     } else {
//       statusEmoji = "🔴";
//       statusText = "Slow";
//       mood = "🌑 Patience of the Wolf… recalibrating senses.";
//     }

//     // Themed response
//     await sock.sendMessage(m.key.remoteJid, {
//       text: `
// ╭━━🌕 *WOLFBOT PONG!* 🌕━━╮
// ┃  ⚡ *Latency:* ${latency}ms
// ┃  ${statusEmoji} *Status:* ${statusText}
// ┃  🐾 *Mode:* ${mood}
// ╰━━━━━━━━━━━━━━━━╯

// _🐺 The Moon Watches — The Hunt Continues..._
// `
//     }, { quoted: m });
//   }
// };
























// export default {
//   name: 'ping',
//   description: 'Check bot latency',
//   category: 'utility',

//   async execute(sock, m, args) {
//     const start = Date.now();

//     // Simple initial syncing message
//     const loadingMessage = await sock.sendMessage(m.key.remoteJid, {
//       text: `🐺 *WolfBot* is syncing... █▒▒▒▒▒▒▒▒▒`
//     }, { quoted: m });

//     const latency = Date.now() - start;

//     // Determine latency status
//     let statusEmoji, statusText, mood;
//     if (latency <= 100) {
//       statusEmoji = "🟢";
//       statusText = "Lightning Fast";
//       mood = "⚡ Hyper Instinct Mode Activated!";
//     } else if (latency <= 300) {
//       statusEmoji = "🟡";
//       statusText = "Moderate";
//       mood = "🧠 Calculating Precision Hunt...";
//     } else {
//       statusEmoji = "🔴";
//       statusText = "Slow";
//       mood = "🌑 Patience of the Wolf… recalibrating senses.";
//     }

//     // Edit the original message with ping results
//     await sock.sendMessage(m.key.remoteJid, {
//       text: `
// ╭━━🌕 *WOLFBOT PONG!* 🌕━━╮
// ┃  ⚡ *Latency:* ${latency}ms
// ┃  ${statusEmoji} *Status:* ${statusText}
// ┃  🐾 *Mode:* ${mood}
// ╰━━━━━━━━━━━━━━━━━━━━╯

// _🐺 The Moon Watches — The Hunt Continues..._
// `
//     }, { 
//       quoted: m,
//       edit: loadingMessage.key
//     });
//   }
// };













// export default {
//   name: 'ping',
//   description: 'Check bot latency',
//   category: 'utility',

//   async execute(sock, m, args) {
//     const start = Date.now();

//     // Send initial syncing message
//     const loadingMessage = await sock.sendMessage(m.key.remoteJid, {
//       text: `🐺 *WolfBot* is syncing... █▒▒▒▒▒▒▒▒▒`
//     }, { quoted: m });

//     const latency = Date.now() - start;

//     // Determine latency status
//     let statusEmoji, statusText, mood;
//     if (latency <= 100) {
//       statusEmoji = "🟢";
//       statusText = "Lightning Fast";
//       mood = "⚡Hyper Instinct";
//     } else if (latency <= 300) {
//       statusEmoji = "🟡";
//       statusText = "Moderate";
//       mood = "🧠Precision Hunt...";
//     } else {
//       statusEmoji = "🔴";
//       statusText = "Slow";
//       mood = "🌑 Patience.";
//     }

//     // Wait for 1 second total (including time already passed)
//     const timePassed = Date.now() - start;
//     const remainingTime = 1000 - timePassed;
//     if (remainingTime > 0) {
//       await new Promise(resolve => setTimeout(resolve, remainingTime));
//     }

//     // Edit the original message with ping results
//     await sock.sendMessage(m.key.remoteJid, {
//       text: `
// ╭━━🌕 *WOLFBOT PONG!* 🌕━━╮
// ┃  ⚡ *Latency:* ${latency}ms
// ┃  ${statusEmoji} *Status:* ${statusText}
// ┃  🐾 *Mode:* ${mood}
// ╰━━━━━━━━━━━━━━━━━━━━╯
// _🐺 The Moon Watches — ..._
// `,
//       edit: loadingMessage.key
//     }, { quoted: m });
//   }
// };













import axios from 'axios';
import moment from 'moment-timezone';

export default {
  name: 'ping',
  aliases: ['p', 'speed', 'latency'],
  description: 'Check bot latency and response time',
  category: 'utility',

  async execute(sock, m, args, PREFIX) {
    try {
      const jid = m.key.remoteJid;
      const sender = m.key.participant || m.key.remoteJid;
      
      // Fake contact function (same as repo command)
      function createFakeContact(message) {
        return {
          key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "WOLFBOT"
          },
          message: {
            contactMessage: {
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:WOLFBOT\nitem1.TEL;waid=${message.key.participant?.split('@')[0] || message.key.remoteJid.split('@')[0]}:${message.key.participant?.split('@')[0] || message.key.remoteJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
          },
          participant: "0@s.whatsapp.net"
        };
      }

      const fkontak = createFakeContact(m);
      const start = Date.now();

      // Send initial syncing message
      const loadingMessage = await sock.sendMessage(jid, {
        text: `🐺 *WolfBot* is syncing... █▒▒▒▒▒▒▒▒▒`
      }, { quoted: fkontak });

      const latency = Date.now() - start;

      // Determine latency status
      let statusEmoji, statusText, mood, bar;
      if (latency <= 100) {
        statusEmoji = "🟢";
        statusText = "Lightning Fast";
        mood = "⚡Hyper Instinct";
        bar = "[██████████]";
      } else if (latency <= 300) {
        statusEmoji = "🟡";
        statusText = "Moderate";
        mood = "🧠Precision Hunt";
        bar = "[██████▒▒▒▒]";
      } else if (latency <= 600) {
        statusEmoji = "🟠";
        statusText = "Slow";
        mood = "🌑Patience...";
        bar = "[████▒▒▒▒▒▒]";
      } else {
        statusEmoji = "🔴";
        statusText = "Very Slow";
        mood = "💤Lagging";
        bar = "[██▒▒▒▒▒▒▒▒]";
      }

      // Get system time
      const time = moment().tz('Asia/Kolkata').format('HH:mm:ss');
      
      // Get date
      const date = moment().format('DD/MM/YYYY');
      
      // Get uptime (if available)
      let uptime = "N/A";
      try {
        const seconds = process.uptime();
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        uptime = `${days}d ${hours}h ${minutes}m`;
      } catch {}

      // Add small delay for dramatic effect
      const timePassed = Date.now() - start;
      const remainingTime = Math.max(800, 1500 - timePassed);
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      // Create response message
      const pingText = `
╭━━🌕 *WOLFBOT PONG!* 🌕━━╮
┃
┃  ⚡ *Latency:* ${latency}ms
┃  ${statusEmoji} *Status:* ${statusText}
┃  ${bar} ${Math.min(100, Math.floor((1 - (latency / 1000)) * 100))}%
┃
┃  🐾 *Mode:* ${mood}
╰━━━━━━━━━━━━━━━━━━━━╯
_🐺 The Moon Watches — .._
`;

      // Edit the original message with ping results
      await sock.sendMessage(jid, {
        text: pingText,
        mentions: [sender]
      }, { 
        quoted: fkontak,
        edit: loadingMessage.key 
      });

      // Send reaction
      await sock.sendMessage(jid, {
        react: { text: '⚡', key: m.key }
      });

    } catch (error) {
      console.error("Ping command error:", error);
      
      // Fallback simple ping
      const start = Date.now();
      const latency = Date.now() - start;
      
      await sock.sendMessage(m.key.remoteJid, {
        text: `🏓 Pong! ${latency}ms\n🐺 WolfBot is online!`
      }, { quoted: m });
    }
  }
};
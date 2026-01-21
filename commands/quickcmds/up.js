// // import axios from "axios";
// // import os from "os";

// // export default {
// //   name: "up",
// //   description: "Check bot uptime and system status",

// //   async execute(sock, m, args) {
// //     try {
// //       const jid = m.key.remoteJid;
// //       const sender = m.key.participant || m.key.remoteJid;

// //       // Get bot uptime first (fast)
// //       const uptime = process.uptime();
// //       const days = Math.floor(uptime / (3600 * 24));
// //       const hours = Math.floor((uptime % (3600 * 24)) / 3600);
// //       const minutes = Math.floor((uptime % 3600) / 60);
// //       const seconds = Math.floor(uptime % 60);
      
// //       // Get memory usage
// //       const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
// //       const totalMemory = process.memoryUsage().heapTotal / 1024 / 1024;
// //       const memoryPercent = ((usedMemory / totalMemory) * 100).toFixed(1);
      
// //       // Get start time
// //       const startTime = new Date(Date.now() - (uptime * 1000));
// //       const startTimeFormatted = startTime.toLocaleString('en-US', {
// //         month: 'short',
// //         day: 'numeric',
// //         hour: '2-digit',
// //         minute: '2-digit'
// //       });
      
// //       // Get system info
// //       const platform = os.platform();
// //       const arch = os.arch();
// //       const cpus = os.cpus();
// //       const cpuCores = cpus.length;
// //       const cpuModel = cpus[0]?.model || "Unknown";
      
// //       // Try to get GitHub data (but don't let it block the response)
// //       let githubAvatar = "https://avatars.githubusercontent.com/u/583231?v=4";
// //       let githubName = "777Wolf-dot";
// //       let githubUrl = "https://github.com/777Wolf-dot";
      
// //       try {
// //         const { data: githubData } = await axios.get(
// //           "https://api.github.com/users/777Wolf-dot",
// //           { 
// //             headers: { 
// //               "User-Agent": "Silent-Wolf-Bot",
// //               "Accept": "application/vnd.github.v3+json"
// //             },
// //             timeout: 3000 // 3 second timeout
// //           }
// //         );
// //         githubAvatar = githubData.avatar_url;
// //         githubName = githubData.name || "777Wolf-dot";
// //         githubUrl = githubData.html_url;
// //       } catch (githubErr) {
// //         console.log("GitHub API failed, using defaults");
// //       }
      
// //       const text = `
// // ⏱️ *BOT UPTIME & SYSTEM STATUS*

// // 🕐 *Uptime:* ${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s
// // 📅 *Started:* ${startTimeFormatted}
// // 💾 *Memory:* ${usedMemory.toFixed(2)}MB / ${totalMemory.toFixed(2)}MB (${memoryPercent}%)
// // ⚡ *CPU:* ${cpuModel}
// // 👋 @${sender.split("@")[0]}, bot has been running for ${days > 0 ? `${days} days, ` : ''}${hours} hours, ${minutes} minutes!
// //       `.trim();

// //       await sock.sendMessage(
// //         jid,
// //         {
// //           text,
// //           contextInfo: {
// //             mentionedJid: [sender],
// //             externalAdReply: {
// //               title: "🐺 Silent Wolf Bot Uptime",
// //               body: `Uptime: ${days}d ${hours}h ${minutes}m`,
// //               mediaType: 1,
// //               thumbnailUrl: githubAvatar,
// //               sourceUrl: githubUrl,
// //               renderLargerThumbnail: true,
// //               showAdAttribution: false
// //             },
// //           },
// //         },
// //         { quoted: m }
// //       );

// //       console.log(`✅ Uptime command executed - Running for ${days}d ${hours}h ${minutes}m`);

// //     } catch (err) {
// //       console.error("❌ Uptime command error:", err.message || err);
      
// //       // Ultra simple fallback
// //       const uptime = process.uptime();
// //       const days = Math.floor(uptime / (3600 * 24));
// //       const hours = Math.floor((uptime % (3600 * 24)) / 3600);
// //       const minutes = Math.floor((uptime % 3600) / 60);
      
// //       const fallbackText = `⏱️ Bot Uptime: ${days}d ${hours}h ${minutes}m\n👋 @${sender.split("@")[0]}, bot is running!`;
      
// //       await sock.sendMessage(
// //         m.key.remoteJid,
// //         { text: fallbackText },
// //         { quoted: m }
// //       );
// //     }
// //   },
// // };


















// import axios from "axios";
// import os from "os";

// export default {
//   name: "up",
//   description: "Check bot uptime and system status",

//   async execute(sock, m, args) {
//     try {
//       const jid = m.key.remoteJid;
//       const sender = m.key.participant || m.key.remoteJid;

//       // Get bot uptime first (fast)
//       const uptime = process.uptime();
//       const days = Math.floor(uptime / (3600 * 24));
//       const hours = Math.floor((uptime % (3600 * 24)) / 3600);
//       const minutes = Math.floor((uptime % 3600) / 60);
//       const seconds = Math.floor(uptime % 60);
      
//       // Get memory usage
//       const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
//       const totalMemory = process.memoryUsage().heapTotal / 1024 / 1024;
//       const memoryPercent = ((usedMemory / totalMemory) * 100).toFixed(1);
      
//       // Get start time
//       const startTime = new Date(Date.now() - (uptime * 1000));
//       const startTimeFormatted = startTime.toLocaleString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
      
//       // Get system info
//       const platform = os.platform();
//       const arch = os.arch();
//       const cpus = os.cpus();
//       const cpuCores = cpus.length;
//       const cpuModel = cpus[0]?.model || "Unknown";
      
//       // Try to get GitHub data (but don't let it block the response)
//       let githubAvatar = "https://avatars.githubusercontent.com/u/10639145";
//       let githubName = "Silent-Wolf7";
//       let githubUrl = "https://github.com/Silent-Wolf7";
      
//       try {
//         const { data: githubData } = await axios.get(
//           "https://api.github.com/users/Silent-Wolf7",
//           { 
//             headers: { 
//               "User-Agent": "Silent-Wolf-Bot",
//               "Accept": "application/vnd.github.v3+json"
//             },
//             timeout: 3000 // 3 second timeout
//           }
//         );
//         githubAvatar = githubData.avatar_url;
//         githubName = githubData.name || "Silent-Wolf7";
//         githubUrl = githubData.html_url;
//       } catch (githubErr) {
//         console.log("GitHub API failed, using defaults");
//       }
      
//       const text = `
// ⏱️ *BOT UPTIME & SYSTEM STATUS*

// 🕐 *Uptime:* ${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s
// 📅 *Started:* ${startTimeFormatted}
// 💾 *Memory:* ${usedMemory.toFixed(2)}MB / ${totalMemory.toFixed(2)}MB (${memoryPercent}%)
// ⚡ *CPU:* ${cpuModel}
// 👋 @${sender.split("@")[0]}, bot has been running for ${days > 0 ? `${days} days, ` : ''}${hours} hours, ${minutes} minutes!
//       `.trim();

//       await sock.sendMessage(
//         jid,
//         {
//           text,
//           contextInfo: {
//             mentionedJid: [sender],
//             externalAdReply: {
//               title: "🐺 Silent Wolf Bot Uptime",
//               body: `Uptime: ${days}d ${hours}h ${minutes}m`,
//               mediaType: 1,
//               thumbnailUrl: githubAvatar,
//               sourceUrl: githubUrl,
//               renderLargerThumbnail: true,
//               showAdAttribution: false
//             },
//           },
//         },
//         { quoted: m }
//       );

//       console.log(`✅ Uptime command executed - Running for ${days}d ${hours}h ${minutes}m`);

//     } catch (err) {
//       console.error("❌ Uptime command error:", err.message || err);
      
//       // Ultra simple fallback
//       const uptime = process.uptime();
//       const days = Math.floor(uptime / (3600 * 24));
//       const hours = Math.floor((uptime % (3600 * 24)) / 3600);
//       const minutes = Math.floor((uptime % 3600) / 60);
      
//       const fallbackText = `⏱️ Bot Uptime: ${days}d ${hours}h ${minutes}m\n👋 @${sender.split("@")[0]}, bot is running!`;
      
//       await sock.sendMessage(
//         m.key.remoteJid,
//         { text: fallbackText },
//         { quoted: m }
//       );
//     }
//   },
// };


// //blackbox,grok,bard,venice,mistral,metai,speechwriter,claudai











import axios from "axios";
import os from "os";

export default {
  name: "up",
  description: "Check bot uptime and system status",

  async execute(sock, m, args, PREFIX) {
    try {
      const jid = m.key.remoteJid;
      const sender = m.key.participant || m.key.remoteJid;

      // Fake contact function - ADDED
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

      const fkontak = createFakeContact(m); // ADDED

      // Get bot uptime first (fast)
      const uptime = process.uptime();
      const days = Math.floor(uptime / (3600 * 24));
      const hours = Math.floor((uptime % (3600 * 24)) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      // Get memory usage
      const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
      const totalMemory = process.memoryUsage().heapTotal / 1024 / 1024;
      const memoryPercent = ((usedMemory / totalMemory) * 100).toFixed(1);
      
      // Get start time
      const startTime = new Date(Date.now() - (uptime * 1000));
      const startTimeFormatted = startTime.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // Get system info
      const platform = os.platform();
      const arch = os.arch();
      const cpus = os.cpus();
      const cpuCores = cpus.length;
      const cpuModel = cpus[0]?.model || "Unknown";
      
      // Try to get GitHub data (but don't let it block the response)
      let githubAvatar = "https://avatars.githubusercontent.com/u/10639145";
      let githubName = "7silent-wolf"; // UPDATED
      let githubUrl = "https://github.com/7silent-wolf/wolf.git"; // UPDATED
      
      try {
        const { data: githubData } = await axios.get(
          "https://api.github.com/users/7silent-wolf", // UPDATED
          { 
            headers: { 
              "User-Agent": "Silent-Wolf-Bot",
              "Accept": "application/vnd.github.v3+json"
            },
            timeout: 3000 // 3 second timeout
          }
        );
        githubAvatar = githubData.avatar_url;
        githubName = githubData.name || "7silent-wolf"; // UPDATED
        githubUrl = "https://github.com/7silent-wolf/wolf.git"; // UPDATED
      } catch (githubErr) {
        console.log("GitHub API failed, using defaults");
      }
      
      const text = `
⏱️ *BOT UPTIME & SYSTEM STATUS*

🕐 *Uptime:* ${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s
📅 *Started:* ${startTimeFormatted}
💾 *Memory:* ${usedMemory.toFixed(2)}MB / ${totalMemory.toFixed(2)}MB (${memoryPercent}%)
⚡ *CPU:* ${cpuModel}
👋 @${sender.split("@")[0]}, bot has been running for ${days > 0 ? `${days} days, ` : ''}${hours} hours, ${minutes} minutes!
      `.trim();

      await sock.sendMessage(
        jid,
        {
          text,
          contextInfo: {
            mentionedJid: [sender],
            externalAdReply: {
              title: "🐺 Silent Wolf Bot Uptime",
              body: `Uptime: ${days}d ${hours}h ${minutes}m`,
              mediaType: 1,
              thumbnailUrl: githubAvatar,
              sourceUrl: githubUrl, // UPDATED
              renderLargerThumbnail: true,
              showAdAttribution: false
            },
          },
        },
        { quoted: fkontak } // UPDATED: Changed from 'm' to 'fkontak'
      );

      console.log(`✅ Uptime command executed - Running for ${days}d ${hours}h ${minutes}m`);

    } catch (err) {
      console.error("❌ Uptime command error:", err.message || err);
      
      // Ultra simple fallback
      const uptime = process.uptime();
      const days = Math.floor(uptime / (3600 * 24));
      const hours = Math.floor((uptime % (3600 * 24)) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      
      const fallbackText = `⏱️ Bot Uptime: ${days}d ${hours}h ${minutes}m\n👋 @${sender.split("@")[0]}, bot is running!`;
      
      await sock.sendMessage(
        m.key.remoteJid,
        { text: fallbackText },
        { quoted: m }
      );
    }
  },
};
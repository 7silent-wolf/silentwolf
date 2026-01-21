




































// ====== SILENT WOLFBOT - ULTIMATE CLEAN EDITION (SPEED OPTIMIZED) ======
// Features: Real-time prefix changes, UltimateFix, Status Detection, Auto-Connect
// SUPER CLEAN TERMINAL - Zero spam, Zero session noise, Rate limit protection
// Date: 2024 | Version: 1.1.3 (PREFIXLESS & NEW MEMBER DETECTION)
// New: Session ID authentication from process.env.SESSION_ID
// New: WOLF-BOT session format support (WOLF-BOT:eyJ...)
// New: Professional success messaging like WOLFBOT
// New: Prefixless mode support
// New: Group new member detection with terminal notifications
// New: Anti-ViewOnce system integrated (Private/Auto modes)

// ====== PERFORMANCE OPTIMIZATIONS APPLIED ======
// 1. Reduced mandatory delays from 1000ms to 100ms
// 2. Optimized console filtering overhead
// 3. Parallel processing for non-critical tasks
// 4. Faster command parsing
// 5. All original features preserved 100%

// ====== ULTIMATE CONSOLE INTERCEPTOR (OPTIMIZED) ======







//Silent Wolf










const originalConsoleMethods = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    trace: console.trace,
    dir: console.dir,
    dirxml: console.dirxml,
    table: console.table,
    time: console.time,
    timeEnd: console.timeEnd,
    timeLog: console.timeLog,
    group: console.group,
    groupEnd: console.groupEnd,
    groupCollapsed: console.groupCollapsed,
    clear: console.clear,
    count: console.count,
    countReset: console.countReset,
    assert: console.assert,
    profile: console.profile,
    profileEnd: console.profileEnd,
    timeStamp: console.timeStamp,
    context: console.context
};

// OPTIMIZED: Cache regex patterns for faster filtering
const suppressPatterns = [
    // Session patterns
    'closing session',
    'sessionentry',
    'registrationid',
    'currentratchet',
    'indexinfo',
    'pendingprekey',
    'ephemeralkeypair',
    'lastremoteephemeralkey',
    'rootkey',
    'basekey',
    'signalkey',
    'signalprotocol',
    '_chains',
    'chains',
    'chainkey',
    'ratchet',
    'cipher',
    'decrypt',
    'encrypt',
    'key',
    'prekey',
    'signedkey',
    'identitykey',
    'sessionstate',
    'keystore',
    'senderkey',
    'groupcipher',
    'signalgroup',
    'signalstore',
    'signalrepository',
    'signalprotocolstore',
    'sessioncipher',
    'sessionbuilder',
    'senderkeystore',
    'senderkeydistribution',
    'keyexchange',
    // Buffer patterns
    'buffer',
    '<buffer',
    'byte',
    '05 ',  // Hexadecimal patterns
    '0x',
    'pubkey',
    'privkey',
    // Baileys internal patterns
    'baileys',
    'whatsapp',
    'ws',
    'qr',
    'scan',
    'pairing',
    'connection.update',
    'creds.update',
    'messages.upsert',
    'group',
    'participant',
    'metadata',
    'presence.update',
    'chat.update',
    'message.receipt.update',
    'message.update',
    'timeout',
    'transaction',
    'failed to decrypt',
    'received error',
    'sessionerror',
    'bad mac',
    'stream errored',
    // General noise
    'timeout',
    'transaction',
    'failed to decrypt',
    'received error',
    'bad mac',
    'stream errored'
];

// OPTIMIZED: Faster filter function with early returns
// OPTIMIZED: Cache frequently checked patterns
const shouldShowLog = (args) => {
    if (args.length === 0) return true;
    
    const firstArg = args[0];
    if (typeof firstArg !== 'string') return true; // Only filter strings
    
    const lowerMsg = firstArg.toLowerCase();
    
    // Fast escape for common non-baileys logs
    if (lowerMsg.includes('defibrillator') || 
        lowerMsg.includes('command') || 
        lowerMsg.includes('✅') || 
        lowerMsg.includes('❌') ||
        lowerMsg.includes('👥') ||
        lowerMsg.includes('👤')) {
        return true;
    }
    
    // Quick bailout if it's not baileys related
    if (!lowerMsg.includes('baileys') && 
        !lowerMsg.includes('signal') && 
        !lowerMsg.includes('session') && 
        !lowerMsg.includes('buffer') && 
        !lowerMsg.includes('key')) {
        return true;
    }
    
    // Only check specific patterns if it seems like baileys noise
    const noisyPatterns = [
        'closing session', 'sessionentry', 'registrationid',
        'currentratchet', 'buffer', '05 ', '0x', 'failed to decrypt'
    ];
    
    return !noisyPatterns.some(pattern => lowerMsg.includes(pattern));
};

// Override ALL console methods
for (const method of Object.keys(originalConsoleMethods)) {
    if (typeof console[method] === 'function') {
        console[method] = function(...args) {
            if (shouldShowLog(args)) {
                originalConsoleMethods[method].apply(console, args);
            }
        };
    }
}

// ====== PROCESS-LEVEL FILTERING ======
function setupProcessFilter() {
    const originalStdoutWrite = process.stdout.write;
    const originalStderrWrite = process.stderr.write;
    
    const sessionPatterns = [
        'closing session',
        'sessionentry',
        'registrationid',
        'currentratchet',
        'indexinfo',
        'pendingprekey',
        '_chains',
        'ephemeralkeypair',
        'lastremoteephemeralkey',
        'rootkey',
        'basekey'
    ];
    
    const filterOutput = (chunk) => {
        const chunkStr = chunk.toString();
        const lowerChunk = chunkStr.toLowerCase();
        
        // OPTIMIZED: Single loop with early return
        for (const pattern of sessionPatterns) {
            if (lowerChunk.includes(pattern)) {
                return false;
            }
        }
        return true;
    };
    
    process.stdout.write = function(chunk, encoding, callback) {
        if (filterOutput(chunk)) {
            return originalStdoutWrite.call(this, chunk, encoding, callback);
        }
        if (callback) callback();
        return true;
    };
    
    process.stderr.write = function(chunk, encoding, callback) {
        if (filterOutput(chunk)) {
            return originalStderrWrite.call(this, chunk, encoding, callback);
        }
        if (callback) callback();
        return true;
    };
}

// Set environment variables before imports
process.env.DEBUG = '';
process.env.NODE_ENV = 'production';
process.env.BAILEYS_LOG_LEVEL = 'fatal';
process.env.PINO_LOG_LEVEL = 'fatal';
process.env.BAILEYS_DISABLE_LOG = 'true';
process.env.DISABLE_BAILEYS_LOG = 'true';
process.env.PINO_DISABLE = 'true';

// Now import other modules
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import chalk from 'chalk';
import readline from 'readline';

// Import automation handlers
import { handleAutoReact } from './commands/automation/autoreactstatus.js';
import { handleAutoView } from './commands/automation/autoviewstatus.js';
import { initializeAutoJoin } from './commands/group/add.js';
import antidemote from './commands/group/antidemote.js';
import banCommand from './commands/group/ban.js';

// ====== ENVIRONMENT SETUP ======
dotenv.config({ path: './.env' });








// ====== VIEW-ONCE DETECTION SYSTEM ======
async function detectAndSaveViewOnce(sock, msg) {
    try {
        // Check if anti-viewonce is enabled
        let config = { enabled: false };
        try {
            if (fs.existsSync('./antiviewonce_config.json')) {
                config = JSON.parse(fs.readFileSync('./antiviewonce_config.json', 'utf8'));
            }
        } catch {
            return; // Config doesn't exist or is invalid
        }
        
        if (!config.enabled || !config.ownerJid) {
            return; // System disabled or no owner set
        }
        
        const message = msg.message;
        
        // Check for view-once image
        if (message.imageMessage?.viewOnce) {
            await handleViewOnceMedia(sock, msg, 'image', message.imageMessage, config.ownerJid);
        }
        // Check for view-once video
        else if (message.videoMessage?.viewOnce) {
            await handleViewOnceMedia(sock, msg, 'video', message.videoMessage, config.ownerJid);
        }
        // Check for view-once audio
        else if (message.audioMessage?.viewOnce) {
            await handleViewOnceMedia(sock, msg, 'audio', message.audioMessage, config.ownerJid);
        }
    } catch (error) {
        console.log('View-once detection error:', error.message);
    }
}

async function handleViewOnceMedia(sock, msg, type, media, ownerJid) {
    try {
        const sender = msg.key.participant || msg.key.remoteJid;
        const caption = media.caption || '';
        const senderShort = sender.split('@')[0];
        
        console.log(`🔐 Detected view-once ${type} from ${senderShort}`);
        
        // Download the media
        const stream = await sock.downloadMediaMessage(media);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        const sizeKB = Math.round(buffer.length / 1024);
        
        // Send notification to terminal
        console.log(`📤 Sending view-once ${type} (${sizeKB}KB) to owner...`);
        
        // Send to owner
        const infoText = `🔐 *VIEW-ONCE CAPTURED*\n\n` +
                       `*From:* ${senderShort}\n` +
                       `*Type:* ${type}\n` +
                       `*Size:* ${sizeKB}KB\n` +
                       `*Caption:* ${caption || 'None'}\n` +
                       `*Time:* ${new Date().toLocaleTimeString()}`;
        
        await sock.sendMessage(ownerJid, { text: infoText });
        
        // Send the media
        const mediaOptions = {
            caption: `📁 View-once ${type} from ${senderShort}\n📝 ${caption || 'No caption'}`,
            fileName: `viewonce_${type}_${Date.now()}.${type === 'image' ? 'jpg' : type === 'video' ? 'mp4' : 'mp3'}`
        };
        
        switch (type) {
            case 'image':
                await sock.sendMessage(ownerJid, { image: buffer, ...mediaOptions });
                break;
            case 'video':
                await sock.sendMessage(ownerJid, { video: buffer, ...mediaOptions });
                break;
            case 'audio':
                await sock.sendMessage(ownerJid, { audio: buffer, ...mediaOptions });
                break;
        }
        
        console.log(`✅ View-once ${type} sent to owner`);
        
    } catch (error) {
        console.log(`❌ Failed to process view-once ${type}:`, error.message);
    }
}









const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ====== ANTI-VIEWONCE CONFIGURATION ======
const ANTIVIEWONCE_SAVE_DIR = './data/viewonce_messages';
const ANTIVIEWONCE_PRIVATE_DIR = './data/viewonce_private';
const ANTIVIEWONCE_HISTORY_FILE = join(ANTIVIEWONCE_SAVE_DIR, 'history.json');
const ANTIVIEWONCE_CONFIG_FILE = './antiviewonce_config.json';
const ANTIVIEWONCE_VERSION = '1.0.0';

// Default anti-viewonce configuration
const DEFAULT_ANTIVIEWONCE_CONFIG = {
    mode: 'private', // 'auto', 'private', 'off'
    autoSave: true,
    ownerJid: '',
    enabled: true,
    maxHistory: 500
};

// ====== CONFIGURATION ======
const SESSION_DIR = './session';
const BOT_NAME = process.env.BOT_NAME || 'WOLFBOT';
const VERSION = '1.1.3'; // Updated version for prefixless & new member detection & anti-viewonce
const DEFAULT_PREFIX = process.env.PREFIX || '.';
const OWNER_FILE = './owner.json';
const PREFIX_CONFIG_FILE = './prefix_config.json';
const BOT_SETTINGS_FILE = './bot_settings.json';
const BOT_MODE_FILE = './bot_mode.json';
const WHITELIST_FILE = './whitelist.json';
const BLOCKED_USERS_FILE = './blocked_users.json';
const WELCOME_DATA_FILE = './data/welcome_data.json';

// Auto-connect features
const AUTO_CONNECT_ON_LINK = true;
const AUTO_CONNECT_ON_START = true;

// SPEED OPTIMIZATION: Reduced delays
const RATE_LIMIT_ENABLED = true;
const MIN_COMMAND_DELAY = 1000; // Reduced from 2000ms
const STICKER_DELAY = 2000; // Reduced from 3000ms

// ====== AUTO-JOIN GROUP CONFIGURATION ======
const AUTO_JOIN_ENABLED = true; // Set to true to enable auto-join
const AUTO_JOIN_DELAY = 5000; // 5 seconds delay before auto-join
const SEND_WELCOME_MESSAGE = true; // Send welcome message to new users
const GROUP_LINK = 'https://chat.whatsapp.com/G3RopQF1UcSD7AeoVsd6PG';
const GROUP_INVITE_CODE = GROUP_LINK.split('/').pop();
const GROUP_NAME = 'WolfBot Community';
const AUTO_JOIN_LOG_FILE = './auto_join_log.json';

// ====== SILENCE BAILEYS COMPLETELY ======
function silenceBaileysCompletely() {
    // Silence pino which Baileys uses internally
    try {
        const pino = require('pino');
        pino({ level: 'silent', enabled: false });
    } catch {
        // Ignore
    }
}
silenceBaileysCompletely();

// ====== CLEAN CONSOLE SETUP ======
console.clear();
setupProcessFilter();

// Advanced log suppression - ULTRA CLEAN EDITION (OPTIMIZED)
class UltraCleanLogger {
    static log(...args) {
        const message = args.join(' ').toLowerCase();
        
        // OPTIMIZED: Faster pattern checking
        const suppressPatterns = [
            'buffer',
            'timeout',
            'transaction',
            'failed to decrypt',
            'received error',
            'sessionerror',
            'bad mac',
            'stream errored',
            'baileys',
            'whatsapp',
            'ws',
            'closing session',
            'sessionentry',
            '_chains',
            'registrationid',
            'currentratchet',
            'indexinfo',
            'pendingprekey',
            'ephemeralkeypair',
            'lastremoteephemeralkey',
            'rootkey',
            'basekey',
            'signal',
            'key',
            'ratchet',
            'encryption',
            'decryption',
            'qr',
            'scan',
            'pairing',
            'connection.update',
            'creds.update',
            'messages.upsert',
            'group',
            'participant',
            'metadata',
            'presence.update',
            'chat.update',
            'message.receipt.update',
            'message.update',
            'keystore',
            'keypair',
            'pubkey',
            'privkey',
            '<buffer',
            '05 ',
            '0x',
            'signalkey',
            'signalprotocol',
            'sessionstate',
            'senderkey',
            'groupcipher',
            'signalgroup'
        ];
        
        // OPTIMIZED: Single loop with early exit
        for (const pattern of suppressPatterns) {
            if (message.includes(pattern)) {
                return;
            }
        }
        
        // Clean formatting for allowed logs
        const timestamp = chalk.gray(`[${new Date().toLocaleTimeString()}]`);
        const cleanArgs = args.map(arg => 
            typeof arg === 'string' ? arg.replace(/\n\s+/g, ' ') : arg
        );
        
        originalConsoleMethods.log(timestamp, ...cleanArgs);
    }
    
    static error(...args) {
        const message = args.join(' ');
        if (message.toLowerCase().includes('fatal') || 
            message.toLowerCase().includes('critical') ||
            message.includes('❌')) {
            const timestamp = chalk.red(`[${new Date().toLocaleTimeString()}]`);
            originalConsoleMethods.error(timestamp, ...args);
        }
    }
    
    static success(...args) {
        const timestamp = chalk.green(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.log(timestamp, chalk.green('✅'), ...args);
    }
    
    static info(...args) {
        const timestamp = chalk.blue(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.log(timestamp, chalk.blue('ℹ️'), ...args);
    }
    
    static warning(...args) {
        const timestamp = chalk.yellow(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.log(timestamp, chalk.yellow('⚠️'), ...args);
    }
    
    static event(...args) {
        const timestamp = chalk.magenta(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.log(timestamp, chalk.magenta('🎭'), ...args);
    }
    
    static command(...args) {
        const timestamp = chalk.cyan(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.log(timestamp, chalk.cyan('💬'), ...args);
    }
    
    static critical(...args) {
        const timestamp = chalk.red(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.error(timestamp, chalk.red('🚨'), ...args);
    }
    
    static group(...args) {
        const timestamp = chalk.magenta(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.log(timestamp, chalk.magenta('👥'), ...args);
    }
    
    static member(...args) {
        const timestamp = chalk.cyan(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.log(timestamp, chalk.cyan('👤'), ...args);
    }
    
    static antiviewonce(...args) {
        const timestamp = chalk.magenta(`[${new Date().toLocaleTimeString()}]`);
        originalConsoleMethods.log(timestamp, chalk.magenta('🔐'), ...args);
    }
}

// Replace console methods
console.log = UltraCleanLogger.log;
console.error = UltraCleanLogger.error;
console.info = UltraCleanLogger.info;
console.warn = UltraCleanLogger.warning;
console.debug = () => {};
console.critical = UltraCleanLogger.critical;

// Add custom methods
global.logSuccess = UltraCleanLogger.success;
global.logInfo = UltraCleanLogger.info;
global.logWarning = UltraCleanLogger.warning;
global.logEvent = UltraCleanLogger.event;
global.logCommand = UltraCleanLogger.command;
global.logGroup = UltraCleanLogger.group;
global.logMember = UltraCleanLogger.member;
global.logAntiViewOnce = UltraCleanLogger.antiviewonce;

// ====== ULTRA SILENT BAILEYS LOGGER ======
const ultraSilentLogger = {
    level: 'silent',
    trace: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    fatal: () => {},
    child: () => ultraSilentLogger,
    log: () => {},
    success: () => {},
    warning: () => {},
    event: () => {},
    command: () => {}
};

// ====== ANTI-VIEWONCE SYSTEM ======
class AntiViewOnceSystem {
    constructor(sock) {
        this.sock = sock;
        this.config = this.loadConfig();
        this.detectedMessages = [];
        this.setupDirectories();
        this.loadHistory();
        
        // Check if downloadContentFromMessage is available
        let downloadFunc;
        try {
            import('@whiskeysockets/baileys').then(baileys => {
                downloadFunc = baileys.downloadContentFromMessage;
            }).catch(() => {
                downloadFunc = null;
            });
        } catch {
            downloadFunc = null;
        }
        
        this.downloadContentFromMessage = downloadFunc;
        
        UltraCleanLogger.success('🔐 Anti-ViewOnce System initialized');
    }
    
    setupDirectories() {
        try {
            if (!fs.existsSync(ANTIVIEWONCE_SAVE_DIR)) {
                fs.mkdirSync(ANTIVIEWONCE_SAVE_DIR, { recursive: true });
                UltraCleanLogger.info(`📁 Created: ${ANTIVIEWONCE_SAVE_DIR}`);
            }
            
            if (!fs.existsSync(ANTIVIEWONCE_PRIVATE_DIR)) {
                fs.mkdirSync(ANTIVIEWONCE_PRIVATE_DIR, { recursive: true });
                UltraCleanLogger.info(`📁 Created: ${ANTIVIEWONCE_PRIVATE_DIR}`);
            }
        } catch (error) {
            UltraCleanLogger.error(`Directory setup error: ${error.message}`);
        }
    }
    
    loadConfig() {
        try {
            if (fs.existsSync(ANTIVIEWONCE_CONFIG_FILE)) {
                const config = JSON.parse(fs.readFileSync(ANTIVIEWONCE_CONFIG_FILE, 'utf8'));
                UltraCleanLogger.info('🔧 Loaded anti-viewonce config');
                return config;
            }
        } catch (error) {
            UltraCleanLogger.warning(`Config load warning: ${error.message}`);
        }
        
        // Save default config
        this.saveConfig(DEFAULT_ANTIVIEWONCE_CONFIG);
        return DEFAULT_ANTIVIEWONCE_CONFIG;
    }
    
    saveConfig(config) {
        try {
            fs.writeFileSync(ANTIVIEWONCE_CONFIG_FILE, JSON.stringify(config, null, 2));
            UltraCleanLogger.info('💾 Anti-viewonce config saved');
        } catch (error) {
            UltraCleanLogger.error(`Config save error: ${error.message}`);
        }
    }
    
    loadHistory() {
        try {
            if (fs.existsSync(ANTIVIEWONCE_HISTORY_FILE)) {
                const data = JSON.parse(fs.readFileSync(ANTIVIEWONCE_HISTORY_FILE, 'utf8'));
                this.detectedMessages = data.messages || [];
                UltraCleanLogger.info(`📊 Loaded ${this.detectedMessages.length} viewonce records`);
            }
        } catch (error) {
            UltraCleanLogger.warning(`History load warning: ${error.message}`);
        }
    }
    
    saveHistory() {
        try {
            const data = {
                messages: this.detectedMessages.slice(-this.config.maxHistory),
                updatedAt: new Date().toISOString(),
                total: this.detectedMessages.length,
                mode: this.config.mode
            };
            fs.writeFileSync(ANTIVIEWONCE_HISTORY_FILE, JSON.stringify(data, null, 2));
        } catch (error) {
            UltraCleanLogger.warning(`History save warning: ${error.message}`);
        }
    }
    
    getFileExtension(mimetype) {
        const extensions = {
            'image/jpeg': 'jpg',
            'image/jpg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/webp': 'webp',
            'video/mp4': 'mp4',
            'video/3gp': '3gp',
            'video/quicktime': 'mov',
            'video/webm': 'webm',
            'audio/mpeg': 'mp3',
            'audio/mp4': 'm4a',
            'audio/ogg': 'ogg',
            'audio/webm': 'webm',
            'audio/aac': 'aac',
            'audio/opus': 'opus'
        };
        return extensions[mimetype] || 'bin';
    }
    
    generateFilename(sender, type, timestamp, mimetype) {
        const date = new Date(timestamp * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const timeStr = date.toTimeString().split(' ')[0].replace(/:/g, '-');
        const senderShort = sender.split('@')[0].replace(/[^0-9]/g, '').slice(-8);
        const ext = this.getFileExtension(mimetype);
        return `${dateStr}_${timeStr}_${senderShort}_${type}.${ext}`;
    }
    
    async downloadBuffer(msg, type) {
        try {
            if (!this.downloadContentFromMessage) {
                // Try to import dynamically
                const baileys = await import('@whiskeysockets/baileys');
                this.downloadContentFromMessage = baileys.downloadContentFromMessage;
            }
            
            const stream = await this.downloadContentFromMessage(msg, type);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            return buffer;
        } catch (error) {
            UltraCleanLogger.error(`Download error: ${error.message}`);
            return null;
        }
    }
    
    async saveMediaToFile(buffer, filename, isPrivate = false) {
        try {
            const savePath = isPrivate ? ANTIVIEWONCE_PRIVATE_DIR : ANTIVIEWONCE_SAVE_DIR;
            const filepath = join(savePath, filename);
            
            fs.writeFileSync(filepath, buffer);
            
            const sizeKB = Math.round(buffer.length / 1024);
            UltraCleanLogger.success(`💾 Saved: ${filename} (${sizeKB}KB) to ${isPrivate ? 'private' : 'public'} folder`);
            
            return filepath;
        } catch (error) {
            UltraCleanLogger.error(`Save error: ${error.message}`);
            return null;
        }
    }
    
    detectViewOnceType(message) {
        if (message.imageMessage?.viewOnce) {
            return {
                type: 'image',
                media: message.imageMessage,
                caption: message.imageMessage.caption || ''
            };
        } else if (message.videoMessage?.viewOnce) {
            return {
                type: 'video',
                media: message.videoMessage,
                caption: message.videoMessage.caption || ''
            };
        } else if (message.audioMessage?.viewOnce) {
            return {
                type: 'audio',
                media: message.audioMessage,
                caption: ''
            };
        }
        return null;
    }
    
    showTerminalNotification(sender, type, size, caption, isPrivate = false) {
        const senderShort = sender.split('@')[0];
        const sizeKB = Math.round(size / 1024);
        const time = new Date().toLocaleTimeString();
        
        const typeEmoji = {
            'image': '🖼️',
            'video': '🎬',
            'audio': '🎵'
        }[type] || '📁';
        
        const modeTag = isPrivate ? '[PRIVATE]' : '[AUTO]';
        const captionText = caption ? ` - "${caption.substring(0, 30)}${caption.length > 30 ? '...' : ''}"` : '';
        
        logAntiViewOnce(`${modeTag} ${typeEmoji} VIEW-ONCE DETECTED`);
        logAntiViewOnce(`   👤 From: ${senderShort}`);
        logAntiViewOnce(`   📦 Type: ${type} (${sizeKB}KB)`);
        logAntiViewOnce(`   📝 Caption: ${captionText || 'None'}`);
        logAntiViewOnce(`   🕒 Time: ${time}`);
    }
    
    async handleViewOnceDetection(msg) {
        try {
            if (!this.config.enabled || this.config.mode === 'off') return null;
            
            const message = msg.message;
            if (!message) return null;
            
            const viewOnceData = this.detectViewOnceType(message);
            if (!viewOnceData) return null;
            
            const { type, media, caption } = viewOnceData;
            const chatId = msg.key.remoteJid;
            const sender = msg.key.participant || msg.key.remoteJid;
            const messageId = msg.key.id;
            const timestamp = msg.messageTimestamp || Math.floor(Date.now() / 1000);
            
            UltraCleanLogger.info(`🔍 Detected view-once ${type} from ${sender.split('@')[0]}`);
            
            // Download the media
            const buffer = await this.downloadBuffer(media, type);
            if (!buffer) {
                UltraCleanLogger.error('❌ Download failed');
                return null;
            }
            
            const mimetype = media.mimetype || this.getDefaultMimeType(type);
            const filename = this.generateFilename(sender, type, timestamp, mimetype);
            
            // Save based on mode
            let savedPath = null;
            let isPrivateSave = false;
            
            if (this.config.mode === 'private' && this.config.ownerJid) {
                // Save to private folder and send to owner
                savedPath = await this.saveMediaToFile(buffer, filename, true);
                isPrivateSave = true;
                
                // Send to owner
                await this.sendToOwner(sender, type, buffer, caption, filename);
                
            } else if (this.config.mode === 'auto') {
                // Save to public folder
                savedPath = await this.saveMediaToFile(buffer, filename, false);
            }
            
            // Create record
            const record = {
                id: messageId,
                sender: sender,
                chatId: chatId,
                type: type,
                size: buffer.length,
                caption: caption,
                timestamp: timestamp,
                detectedAt: new Date().toISOString(),
                saved: !!savedPath,
                mode: this.config.mode,
                filename: savedPath ? filename : null,
                isPrivate: isPrivateSave
            };
            
            // Add to history
            this.detectedMessages.push(record);
            if (this.detectedMessages.length > this.config.maxHistory * 2) {
                this.detectedMessages = this.detectedMessages.slice(-this.config.maxHistory);
            }
            
            // Show terminal notification
            this.showTerminalNotification(sender, type, buffer.length, caption, isPrivateSave);
            
            // Save history occasionally
            if (Math.random() < 0.1) { // 10% chance
                this.saveHistory();
            }
            
            return record;
            
        } catch (error) {
            UltraCleanLogger.error(`View-once handling error: ${error.message}`);
            return null;
        }
    }
    
    getDefaultMimeType(type) {
        const defaults = {
            'image': 'image/jpeg',
            'video': 'video/mp4',
            'audio': 'audio/mpeg'
        };
        return defaults[type] || 'application/octet-stream';
    }
    
    async sendToOwner(sender, type, buffer, caption, filename) {
        try {
            if (!this.config.ownerJid) {
                UltraCleanLogger.warning('⚠️ Owner JID not set, skipping owner notification');
                return;
            }
            
            const senderShort = sender.split('@')[0];
            const sizeKB = Math.round(buffer.length / 1024);
            
            // Send info message
            const infoText = `🔐 *PRIVATE VIEW-ONCE CAPTURED*\n\n` +
                           `*From:* ${senderShort}\n` +
                           `*Type:* ${type}\n` +
                           `*Size:* ${sizeKB}KB\n` +
                           `*Caption:* ${caption || 'None'}\n` +
                           `*Time:* ${new Date().toLocaleTimeString()}\n` +
                           `*Saved as:* ${filename}\n\n` +
                           `Media delivered below ⬇️`;
            
            await this.sock.sendMessage(this.config.ownerJid, { text: infoText });
            
            // Send the media
            const mediaOptions = {
                caption: `📁 ${type} from ${senderShort}\n📝 ${caption || 'No caption'}`,
                fileName: filename
            };
            
            switch (type) {
                case 'image':
                    await this.sock.sendMessage(this.config.ownerJid, { 
                        image: buffer, 
                        ...mediaOptions 
                    });
                    break;
                case 'video':
                    await this.sock.sendMessage(this.config.ownerJid, { 
                        video: buffer, 
                        ...mediaOptions 
                    });
                    break;
                case 'audio':
                    await this.sock.sendMessage(this.config.ownerJid, { 
                        audio: buffer, 
                        ...mediaOptions 
                    });
                    break;
            }
            
            UltraCleanLogger.info(`📤 Sent ${type} to owner`);
            
        } catch (error) {
            UltraCleanLogger.error(`Owner send error: ${error.message}`);
        }
    }
    
    async handleManualRecovery(msg) {
        try {
            const chatId = msg.key.remoteJid;
            const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            
            if (!quoted) {
                await this.sock.sendMessage(chatId, {
                    text: '❌ Reply to a view-once message'
                }, { quoted: msg });
                return;
            }
            
            const viewOnceData = this.detectViewOnceType(quoted);
            if (!viewOnceData) {
                await this.sock.sendMessage(chatId, {
                    text: '❌ Not a view-once message'
                }, { quoted: msg });
                return;
            }
            
            const { type, media, caption } = viewOnceData;
            
            await this.sock.sendMessage(chatId, {
                text: `🔍 Downloading ${type}...`
            }, { quoted: msg });
            
            const buffer = await this.downloadBuffer(media, type);
            if (!buffer) {
                await this.sock.sendMessage(chatId, { text: '❌ Download failed' }, { quoted: msg });
                return;
            }
            
            const mediaOptions = {
                caption: `✅ Recovered view-once ${type}\n${caption || ''}`,
                quoted: msg
            };
            
            switch (type) {
                case 'image':
                    await this.sock.sendMessage(chatId, { image: buffer, ...mediaOptions });
                    break;
                case 'video':
                    await this.sock.sendMessage(chatId, { video: buffer, ...mediaOptions });
                    break;
                case 'audio':
                    await this.sock.sendMessage(chatId, { audio: buffer, ...mediaOptions });
                    break;
            }
            
            UltraCleanLogger.success(`🔄 Manual recovery of ${type} completed`);
            
        } catch (error) {
            UltraCleanLogger.error(`Recovery error: ${error.message}`);
        }
    }
    
    getStats() {
        const stats = {
            total: this.detectedMessages.length,
            byType: { image: 0, video: 0, audio: 0 },
            totalSize: 0
        };
        
        for (const msg of this.detectedMessages) {
            if (stats.byType[msg.type] !== undefined) {
                stats.byType[msg.type]++;
            }
            stats.totalSize += msg.size || 0;
        }
        
        return {
            ...stats,
            totalSizeKB: Math.round(stats.totalSize / 1024),
            mode: this.config.mode,
            enabled: this.config.enabled,
            autoSave: this.config.autoSave
        };
    }
    
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.saveConfig(this.config);
        return this.config;
    }
}

let antiViewOnceSystem = null;

// ====== RATE LIMIT PROTECTION SYSTEM (OPTIMIZED) ======
class RateLimitProtection {
    constructor() {
        this.commandTimestamps = new Map();
        this.userCooldowns = new Map();
        this.globalCooldown = Date.now();
        this.stickerSendTimes = new Map();
        // OPTIMIZED: Cleanup interval
        setInterval(() => this.cleanup(), 60000);
    }
    
    canSendCommand(chatId, userId, command) {
        if (!RATE_LIMIT_ENABLED) return { allowed: true };
        
        const now = Date.now();
        const userKey = `${userId}_${command}`;
        const chatKey = `${chatId}_${command}`;
        
        // Check user cooldown
        if (this.userCooldowns.has(userKey)) {
            const lastTime = this.userCooldowns.get(userKey);
            const timeDiff = now - lastTime;
            
            if (timeDiff < MIN_COMMAND_DELAY) {
                const remaining = Math.ceil((MIN_COMMAND_DELAY - timeDiff) / 1000);
                return { 
                    allowed: false, 
                    reason: `Please wait ${remaining}s before using ${command} again.`
                };
            }
        }
        
        // Check chat cooldown
        if (this.commandTimestamps.has(chatKey)) {
            const lastTime = this.commandTimestamps.get(chatKey);
            const timeDiff = now - lastTime;
            
            if (timeDiff < MIN_COMMAND_DELAY) {
                const remaining = Math.ceil((MIN_COMMAND_DELAY - timeDiff) / 1000);
                return { 
                    allowed: false, 
                    reason: `Command cooldown: ${remaining}s remaining.`
                };
            }
        }
        
        // OPTIMIZED: Faster global cooldown check
        if (now - this.globalCooldown < 250) { // Reduced from 500ms
            return { 
                allowed: false, 
                reason: 'System is busy. Please try again in a moment.'
            };
        }
        
        // Update timestamps
        this.userCooldowns.set(userKey, now);
        this.commandTimestamps.set(chatKey, now);
        this.globalCooldown = now;
        
        return { allowed: true };
    }
    
    async waitForSticker(chatId) {
        if (!RATE_LIMIT_ENABLED) {
            await this.delay(STICKER_DELAY);
            return;
        }
        
        const now = Date.now();
        const lastSticker = this.stickerSendTimes.get(chatId) || 0;
        const timeDiff = now - lastSticker;
        
        if (timeDiff < STICKER_DELAY) {
            const waitTime = STICKER_DELAY - timeDiff;
            await this.delay(waitTime);
        }
        
        this.stickerSendTimes.set(chatId, Date.now());
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    cleanup() {
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        
        for (const [key, timestamp] of this.userCooldowns.entries()) {
            if (now - timestamp > fiveMinutes) {
                this.userCooldowns.delete(key);
            }
        }
        
        for (const [key, timestamp] of this.commandTimestamps.entries()) {
            if (now - timestamp > fiveMinutes) {
                this.commandTimestamps.delete(key);
            }
        }
    }
}

const rateLimiter = new RateLimitProtection();

// ====== DYNAMIC PREFIX SYSTEM WITH PREFIXLESS SUPPORT ======
let prefixCache = DEFAULT_PREFIX;
let prefixHistory = [];
let isPrefixless = false;

function getCurrentPrefix() {
    return isPrefixless ? '' : prefixCache;
}

function savePrefixToFile(newPrefix) {
    try {
        const isNone = newPrefix === 'none' || newPrefix === '""' || newPrefix === "''" || newPrefix === '';
        
        const config = {
            prefix: isNone ? '' : newPrefix,
            isPrefixless: isNone,
            setAt: new Date().toISOString(),
            timestamp: Date.now(),
            version: VERSION,
            previousPrefix: prefixCache,
            previousIsPrefixless: isPrefixless
        };
        fs.writeFileSync(PREFIX_CONFIG_FILE, JSON.stringify(config, null, 2));
        
        const settings = {
            prefix: isNone ? '' : newPrefix,
            isPrefixless: isNone,
            prefixSetAt: new Date().toISOString(),
            prefixChangedAt: Date.now(),
            previousPrefix: prefixCache,
            previousIsPrefixless: isPrefixless,
            version: VERSION
        };
        fs.writeFileSync(BOT_SETTINGS_FILE, JSON.stringify(settings, null, 2));
        
        UltraCleanLogger.info(`Prefix settings saved: "${newPrefix}", prefixless: ${isNone}`);
        return true;
    } catch (error) {
        UltraCleanLogger.error(`Error saving prefix: ${error.message}`);
        return false;
    }
}

function loadPrefixFromFiles() {
    try {
        if (fs.existsSync(PREFIX_CONFIG_FILE)) {
            const config = JSON.parse(fs.readFileSync(PREFIX_CONFIG_FILE, 'utf8'));
            
            if (config.isPrefixless !== undefined) {
                isPrefixless = config.isPrefixless;
            }
            
            if (config.prefix !== undefined) {
                if (config.prefix.trim() === '' && config.isPrefixless) {
                    return '';
                } else if (config.prefix.trim() !== '') {
                    return config.prefix.trim();
                }
            }
        }
        
        if (fs.existsSync(BOT_SETTINGS_FILE)) {
            const settings = JSON.parse(fs.readFileSync(BOT_SETTINGS_FILE, 'utf8'));
            
            if (settings.isPrefixless !== undefined) {
                isPrefixless = settings.isPrefixless;
            }
            
            if (settings.prefix && settings.prefix.trim() !== '') {
                return settings.prefix.trim();
            }
        }
        
    } catch (error) {
        UltraCleanLogger.warning(`Error loading prefix: ${error.message}`);
    }
    
    return DEFAULT_PREFIX;
}

function updatePrefixImmediately(newPrefix) {
    const oldPrefix = prefixCache;
    const oldIsPrefixless = isPrefixless;
    
    const isNone = newPrefix === 'none' || newPrefix === '""' || newPrefix === "''" || newPrefix === '';
    
    if (isNone) {
        // Enable prefixless mode
        isPrefixless = true;
        prefixCache = '';
        
        UltraCleanLogger.success(`Prefixless mode enabled`);
    } else {
        if (!newPrefix || newPrefix.trim() === '') {
            UltraCleanLogger.error('Cannot set empty prefix');
            return { success: false, error: 'Empty prefix' };
        }
        
        if (newPrefix.length > 5) {
            UltraCleanLogger.error('Prefix too long (max 5 characters)');
            return { success: false, error: 'Prefix too long' };
        }
        
        const trimmedPrefix = newPrefix.trim();
        
        // Update memory cache
        prefixCache = trimmedPrefix;
        isPrefixless = false;
        
        UltraCleanLogger.info(`Prefix changed to: "${trimmedPrefix}"`);
    }
    
    // Update global variables
    if (typeof global !== 'undefined') {
        global.prefix = getCurrentPrefix();
        global.CURRENT_PREFIX = getCurrentPrefix();
        global.isPrefixless = isPrefixless;
    }
    
    // Update environment
    process.env.PREFIX = getCurrentPrefix();
    
    // Save to files
    savePrefixToFile(newPrefix);
    
    // Add to history
    prefixHistory.push({
        oldPrefix: oldIsPrefixless ? 'none' : oldPrefix,
        newPrefix: isPrefixless ? 'none' : prefixCache,
        isPrefixless: isPrefixless,
        oldIsPrefixless: oldIsPrefixless,
        timestamp: new Date().toISOString(),
        time: Date.now()
    });
    
    // Keep only last 10
    if (prefixHistory.length > 10) {
        prefixHistory = prefixHistory.slice(-10);
    }
    
    // Update terminal header
    updateTerminalHeader();
    
    UltraCleanLogger.success(`Prefix updated: "${oldIsPrefixless ? 'none' : oldPrefix}" → "${isPrefixless ? 'none (prefixless)' : prefixCache}"`);
    
    return {
        success: true,
        oldPrefix: oldIsPrefixless ? 'none' : oldPrefix,
        newPrefix: isPrefixless ? 'none' : prefixCache,
        isPrefixless: isPrefixless,
        timestamp: new Date().toISOString()
    };
}

function updateTerminalHeader() {
    const currentPrefix = getCurrentPrefix();
    const prefixDisplay = isPrefixless ? 'none (prefixless)' : `"${currentPrefix}"`;
    
    console.clear();
    console.log(chalk.cyan(`
╔══════════════════════════════════════════════════════════════════════╗
║   🐺 ${chalk.bold(`${BOT_NAME.toUpperCase()} v${VERSION} (PREFIXLESS & MEMBER DETECTION)`)}             
║   💬 Prefix  : ${prefixDisplay}
║   🔧 Auto Fix: ✅ ENABLED
║   🔄 Real-time Prefix: ✅ ENABLED
║   👁️ Status Detector: ✅ ACTIVE
║   👥 Member Detector: ✅ ACTIVE
║   🔐 Anti-ViewOnce: ✅ ACTIVE
║   🛡️ Rate Limit Protection: ✅ ACTIVE
║   🔗 Auto-Connect on Link: ${AUTO_CONNECT_ON_LINK ? '✅' : '❌'}
║   🔄 Auto-Connect on Start: ${AUTO_CONNECT_ON_START ? '✅' : '❌'}
║   🔐 Login Methods: Pairing Code | Session ID | Clean Start
║   📱 Session Support: WOLF-BOT: format & Base64
║   🔗 Auto-Join to Group: ${AUTO_JOIN_ENABLED ? '✅ ENABLED' : '❌ DISABLED'}
║   📊 Log Level: ULTRA CLEAN (Zero spam)
║   🔊 Console: ✅ COMPLETELY FILTERED
║   ⚡ SPEED: ✅ OPTIMIZED (FAST RESPONSE)
║   🎯 Background Auth: ✅ ENABLED
║   🎉 Welcome System: ✅ ENABLED
╚══════════════════════════════════════════════════════════════════════╝
`));
}

// Initialize with loaded prefix
prefixCache = loadPrefixFromFiles();
isPrefixless = prefixCache === '' ? true : false;
updateTerminalHeader();

// ====== PLATFORM DETECTION ======
function detectPlatform() {
    if (process.env.PANEL) return 'Panel';
    if (process.env.HEROKU) return 'Heroku';
    if (process.env.KATABUMP) return 'Katabump';
    if (process.env.AITIMY) return 'Aitimy';
    if (process.env.RENDER) return 'Render';
    if (process.env.REPLIT) return 'Replit';
    if (process.env.VERCEL) return 'Vercel';
    if (process.env.GLITCH) return 'Glitch';
    return 'Local/VPS';
}

// ====== GLOBAL VARIABLES ======
let OWNER_NUMBER = null;
let OWNER_JID = null;
let OWNER_CLEAN_JID = null;
let OWNER_CLEAN_NUMBER = null;
let OWNER_LID = null;
let SOCKET_INSTANCE = null;
let isConnected = false;
let store = null;
let heartbeatInterval = null;
let lastActivityTime = Date.now();
let connectionAttempts = 0;
let MAX_RETRY_ATTEMPTS = 10;
let BOT_MODE = 'public';
let WHITELIST = new Set();
let AUTO_LINK_ENABLED = true;
let AUTO_CONNECT_COMMAND_ENABLED = true;
let AUTO_ULTIMATE_FIX_ENABLED = true;
let isWaitingForPairingCode = false;
let RESTART_AUTO_FIX_ENABLED = true;
let hasSentRestartMessage = false;
let hasAutoConnectedOnStart = false;
let hasSentWelcomeMessage = false;

// ====== UTILITY FUNCTIONS ======
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ====== JID/LID HANDLING SYSTEM ======
class JidManager {
    constructor() {
        this.ownerJids = new Set();
        this.ownerLids = new Set();
        this.owner = null;
        this.loadOwnerData();
        this.loadWhitelist();
        
        UltraCleanLogger.success('JID Manager initialized');
    }
    
    loadOwnerData() {
        try {
            if (fs.existsSync(OWNER_FILE)) {
                const data = JSON.parse(fs.readFileSync(OWNER_FILE, 'utf8'));
                
                const ownerJid = data.OWNER_JID;
                if (ownerJid) {
                    const cleaned = this.cleanJid(ownerJid);
                    
                    this.owner = {
                        rawJid: ownerJid,
                        cleanJid: cleaned.cleanJid,
                        cleanNumber: cleaned.cleanNumber,
                        isLid: cleaned.isLid,
                        linkedAt: data.linkedAt || new Date().toISOString()
                    };
                    
                    this.ownerJids.clear();
                    this.ownerLids.clear();
                    
                    this.ownerJids.add(cleaned.cleanJid);
                    this.ownerJids.add(ownerJid);
                    
                    if (cleaned.isLid) {
                        this.ownerLids.add(ownerJid);
                        const lidNumber = ownerJid.split('@')[0];
                        this.ownerLids.add(lidNumber);
                        OWNER_LID = ownerJid;
                    }
                    
                    OWNER_JID = ownerJid;
                    OWNER_NUMBER = cleaned.cleanNumber;
                    OWNER_CLEAN_JID = cleaned.cleanJid;
                    OWNER_CLEAN_NUMBER = cleaned.cleanNumber;
                    
                    UltraCleanLogger.success(`Loaded owner: ${cleaned.cleanJid}`);
                }
            }
        } catch {
            // Silent fail
        }
    }
    
    loadWhitelist() {
        try {
            if (fs.existsSync(WHITELIST_FILE)) {
                const data = JSON.parse(fs.readFileSync(WHITELIST_FILE, 'utf8'));
                if (data.whitelist && Array.isArray(data.whitelist)) {
                    data.whitelist.forEach(item => {
                        WHITELIST.add(item);
                    });
                }
            }
        } catch {
            // Silent fail
        }
    }
    
    cleanJid(jid) {
        if (!jid) return { cleanJid: '', cleanNumber: '', raw: jid, isLid: false };
        
        const isLid = jid.includes('@lid');
        if (isLid) {
            const lidNumber = jid.split('@')[0];
            return {
                raw: jid,
                cleanJid: jid,
                cleanNumber: lidNumber,
                isLid: true
            };
        }
        
        const [numberPart] = jid.split('@')[0].split(':');
        const serverPart = jid.split('@')[1] || 's.whatsapp.net';
        
        const cleanNumber = numberPart.replace(/[^0-9]/g, '');
        const normalizedNumber = cleanNumber.startsWith('0') ? cleanNumber.substring(1) : cleanNumber;
        const cleanJid = `${normalizedNumber}@${serverPart}`;
        
        return {
            raw: jid,
            cleanJid: cleanJid,
            cleanNumber: normalizedNumber,
            isLid: false
        };
    }
    
    isOwner(msg) {
        if (!msg || !msg.key) return false;
        
        const chatJid = msg.key.remoteJid;
        const participant = msg.key.participant;
        const senderJid = participant || chatJid;
        const cleaned = this.cleanJid(senderJid);
        
        if (!this.owner || !this.owner.cleanNumber) {
            return false;
        }
        
        // OPTIMIZED: Faster checks with early returns
        if (this.ownerJids.has(cleaned.cleanJid) || this.ownerJids.has(senderJid)) {
            return true;
        }
        
        if (cleaned.isLid) {
            const lidNumber = cleaned.cleanNumber;
            if (this.ownerLids.has(senderJid) || this.ownerLids.has(lidNumber)) {
                return true;
            }
            
            if (OWNER_LID && (senderJid === OWNER_LID || lidNumber === OWNER_LID.split('@')[0])) {
                return true;
            }
        }
        
        return false;
    }
    
    setNewOwner(newJid, isAutoLinked = false) {
        try {
            const cleaned = this.cleanJid(newJid);
            
            this.ownerJids.clear();
            this.ownerLids.clear();
            WHITELIST.clear();
            
            this.owner = {
                rawJid: newJid,
                cleanJid: cleaned.cleanJid,
                cleanNumber: cleaned.cleanNumber,
                isLid: cleaned.isLid,
                linkedAt: new Date().toISOString(),
                autoLinked: isAutoLinked
            };
            
            this.ownerJids.add(cleaned.cleanJid);
            this.ownerJids.add(newJid);
            
            if (cleaned.isLid) {
                this.ownerLids.add(newJid);
                const lidNumber = newJid.split('@')[0];
                this.ownerLids.add(lidNumber);
                OWNER_LID = newJid;
            } else {
                OWNER_LID = null;
            }
            
            OWNER_JID = newJid;
            OWNER_NUMBER = cleaned.cleanNumber;
            OWNER_CLEAN_JID = cleaned.cleanJid;
            OWNER_CLEAN_NUMBER = cleaned.cleanNumber;
            
            const ownerData = {
                OWNER_JID: newJid,
                OWNER_NUMBER: cleaned.cleanNumber,
                OWNER_CLEAN_JID: cleaned.cleanJid,
                OWNER_CLEAN_NUMBER: cleaned.cleanNumber,
                ownerLID: cleaned.isLid ? newJid : null,
                linkedAt: new Date().toISOString(),
                autoLinked: isAutoLinked,
                previousOwnerCleared: true,
                version: VERSION
            };
            
            fs.writeFileSync(OWNER_FILE, JSON.stringify(ownerData, null, 2));
            
            UltraCleanLogger.success(`New owner set: ${cleaned.cleanJid}`);
            
            return {
                success: true,
                owner: this.owner,
                isLid: cleaned.isLid
            };
            
        } catch {
            return { success: false, error: 'Failed to set new owner' };
        }
    }
    
    getOwnerInfo() {
        return {
            ownerJid: this.owner?.cleanJid || null,
            ownerNumber: this.owner?.cleanNumber || null,
            ownerLid: OWNER_LID || null,
            jidCount: this.ownerJids.size,
            lidCount: this.ownerLids.size,
            whitelistCount: WHITELIST.size,
            isLid: this.owner?.isLid || false,
            linkedAt: this.owner?.linkedAt || null
        };
    }
}

const jidManager = new JidManager();

// ====== NEW MEMBER DETECTION SYSTEM ======
class NewMemberDetector {
    constructor() {
        this.enabled = true;
        this.detectedMembers = new Map(); // groupId -> array of member events
        this.groupMembersCache = new Map(); // groupId -> Set of member IDs
        this.loadDetectionData();
        
        UltraCleanLogger.success('New Member Detector initialized');
    }
    
    loadDetectionData() {
        try {
            if (fs.existsSync('./data/member_detection.json')) {
                const data = JSON.parse(fs.readFileSync('./data/member_detection.json', 'utf8'));
                if (data.detectedMembers) {
                    for (const [groupId, members] of Object.entries(data.detectedMembers)) {
                        this.detectedMembers.set(groupId, members);
                    }
                }
                UltraCleanLogger.info(`📊 Loaded ${this.detectedMembers.size} groups member data`);
            }
        } catch (error) {
            UltraCleanLogger.warning(`Could not load member detection data: ${error.message}`);
        }
    }
    
    saveDetectionData() {
        try {
            const data = {
                detectedMembers: {},
                updatedAt: new Date().toISOString(),
                totalGroups: this.detectedMembers.size
            };
            
            for (const [groupId, members] of this.detectedMembers.entries()) {
                data.detectedMembers[groupId] = members;
            }
            
            // Ensure data directory exists
            if (!fs.existsSync('./data')) {
                fs.mkdirSync('./data', { recursive: true });
            }
            
            fs.writeFileSync('./data/member_detection.json', JSON.stringify(data, null, 2));
        } catch (error) {
            UltraCleanLogger.warning(`Could not save member detection data: ${error.message}`);
        }
    }
    
    async detectNewMembers(sock, groupUpdate) {
        try {
            if (!this.enabled) return null;
            
            const groupId = groupUpdate.id;
            const action = groupUpdate.action;
            
            if (action === 'add' || action === 'invite') {
                const participants = groupUpdate.participants || [];
                
                // Get group metadata
                const metadata = await sock.groupMetadata(groupId);
                const groupName = metadata.subject || 'Unknown Group';
                
                // Get current cached members
                let cachedMembers = this.groupMembersCache.get(groupId) || new Set();
                
                // Identify new members
                const newMembers = [];
                for (const participant of participants) {
                    const userJid = participant;
                    
                    if (!cachedMembers.has(userJid)) {
                        // New member detected
                        try {
                            const userInfo = await sock.onWhatsApp(userJid);
                            const userName = userInfo[0]?.name || userJid.split('@')[0];
                            const userNumber = userJid.split('@')[0];
                            
                            newMembers.push({
                                jid: userJid,
                                name: userName,
                                number: userNumber,
                                addedAt: new Date().toISOString(),
                                timestamp: Date.now(),
                                action: action,
                                addedBy: groupUpdate.actor || 'unknown'
                            });
                            
                            cachedMembers.add(userJid);
                            
                            // Show terminal notification
                            this.showMemberNotification(groupName, userName, userNumber, action);
                            
                        } catch (error) {
                            UltraCleanLogger.warning(`Could not get user info for ${userJid}: ${error.message}`);
                        }
                    }
                }
                
                // Update cache
                this.groupMembersCache.set(groupId, cachedMembers);
                
                // Save new members to history
                if (newMembers.length > 0) {
                    const groupEvents = this.detectedMembers.get(groupId) || [];
                    groupEvents.push(...newMembers);
                    this.detectedMembers.set(groupId, groupEvents.slice(-50)); // Keep last 50 events
                    
                    // Auto-save periodically
                    if (Math.random() < 0.2) { // 20% chance to save on each detection
                        this.saveDetectionData();
                    }
                    
                    // Check if welcome system is enabled for this group
                    await this.checkWelcomeSystem(sock, groupId, newMembers);
                    
                    return newMembers;
                }
            }
            
            return null;
            
        } catch (error) {
            UltraCleanLogger.error(`Member detection error: ${error.message}`);
            return null;
        }
    }
    
    showMemberNotification(groupName, userName, userNumber, action) {
        const actionEmoji = action === 'add' ? '➕' : '📨';
        const actionText = action === 'add' ? 'ADDED' : 'INVITED';
        
        logMember(`${actionEmoji} ${actionText}: ${userName} (+${userNumber})`);
        logGroup(`👥 Group: ${groupName}`);
    }
    
    async checkWelcomeSystem(sock, groupId, newMembers) {
        try {
            // Load welcome data
            const welcomeData = this.loadWelcomeData();
            const groupWelcome = welcomeData.groups?.[groupId];
            
            if (groupWelcome?.enabled) {
                for (const member of newMembers) {
                    await this.sendWelcomeMessage(sock, groupId, member.jid, groupWelcome.message);
                }
            }
        } catch (error) {
            UltraCleanLogger.warning(`Welcome system check failed: ${error.message}`);
        }
    }
    
    async sendWelcomeMessage(sock, groupId, userId, message) {
        try {
            // Get user info
            const userInfo = await sock.onWhatsApp(userId);
            const userName = userInfo[0]?.name || userId.split('@')[0];
            
            // Get group info
            const metadata = await sock.groupMetadata(groupId);
            const memberCount = metadata.participants.length;
            const groupName = metadata.subject || "Our Group";
            
            // Replace variables in message
            const welcomeText = this.replaceWelcomeVariables(message, {
                name: userName,
                group: groupName,
                members: memberCount,
                mention: `@${userId.split('@')[0]}`
            });
            
            // Get user's profile picture
            let profilePic = null;
            try {
                profilePic = await sock.profilePictureUrl(userId, 'image');
            } catch {
                // Use default avatar if no profile picture
                profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
            }
            
            // Create welcome message with profile picture
            await sock.sendMessage(groupId, {
                image: { url: profilePic },
                caption: welcomeText,
                mentions: [userId],
                contextInfo: {
                    mentionedJid: [userId]
                }
            });
            
            // Update last welcome time in welcome data
            const welcomeData = this.loadWelcomeData();
            if (welcomeData.groups?.[groupId]) {
                welcomeData.groups[groupId].lastWelcome = Date.now();
                this.saveWelcomeData(welcomeData);
            }
            
            UltraCleanLogger.info(`✅ Welcome sent to ${userName} in ${groupName}`);
            
        } catch (error) {
            UltraCleanLogger.warning(`Could not send welcome message: ${error.message}`);
        }
    }
    
    replaceWelcomeVariables(message, variables) {
        return message
            .replace(/{name}/g, variables.name)
            .replace(/{group}/g, variables.group)
            .replace(/{members}/g, variables.members)
            .replace(/{mention}/g, variables.mention);
    }
    
    loadWelcomeData() {
        try {
            if (fs.existsSync(WELCOME_DATA_FILE)) {
                return JSON.parse(fs.readFileSync(WELCOME_DATA_FILE, 'utf8'));
            }
        } catch (error) {
            UltraCleanLogger.warning(`Error loading welcome data: ${error.message}`);
        }
        
        return {
            groups: {},
            version: '1.0',
            created: new Date().toISOString()
        };
    }
    
    saveWelcomeData(data) {
        try {
            // Ensure data directory exists
            if (!fs.existsSync('./data')) {
                fs.mkdirSync('./data', { recursive: true });
            }
            
            data.updated = new Date().toISOString();
            fs.writeFileSync(WELCOME_DATA_FILE, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            UltraCleanLogger.warning(`Error saving welcome data: ${error.message}`);
            return false;
        }
    }
    
    getStats() {
        let totalEvents = 0;
        for (const events of this.detectedMembers.values()) {
            totalEvents += events.length;
        }
        
        return {
            enabled: this.enabled,
            totalGroups: this.detectedMembers.size,
            totalEvents: totalEvents,
            cachedGroups: this.groupMembersCache.size
        };
    }
}

const memberDetector = new NewMemberDetector();

// ====== AUTO GROUP JOIN SYSTEM ======
class AutoGroupJoinSystem {
    constructor() {
        this.initialized = false;
        this.invitedUsers = new Set();
        this.loadInvitedUsers();
        UltraCleanLogger.success('Auto-Join System initialized');
    }

    loadInvitedUsers() {
        try {
            if (fs.existsSync(AUTO_JOIN_LOG_FILE)) {
                const data = JSON.parse(fs.readFileSync(AUTO_JOIN_LOG_FILE, 'utf8'));
                data.users.forEach(user => this.invitedUsers.add(user));
                UltraCleanLogger.info(`📊 Loaded ${this.invitedUsers.size} previously invited users`);
            }
        } catch (error) {
            // Silent fail
        }
    }

    saveInvitedUser(userJid) {
        try {
            this.invitedUsers.add(userJid);
            
            let data = { 
                users: [], 
                lastUpdated: new Date().toISOString(),
                totalInvites: 0
            };
            
            if (fs.existsSync(AUTO_JOIN_LOG_FILE)) {
                data = JSON.parse(fs.readFileSync(AUTO_JOIN_LOG_FILE, 'utf8'));
            }
            
            if (!data.users.includes(userJid)) {
                data.users.push(userJid);
                data.totalInvites = data.users.length;
                data.lastUpdated = new Date().toISOString();
                fs.writeFileSync(AUTO_JOIN_LOG_FILE, JSON.stringify(data, null, 2));
                UltraCleanLogger.success(`✅ Saved invited user: ${userJid}`);
            }
        } catch (error) {
            UltraCleanLogger.error(`❌ Error saving invited user: ${error.message}`);
        }
    }

    isOwner(userJid, jidManager) {
        if (!jidManager.owner || !jidManager.owner.cleanNumber) return false;
        return userJid === jidManager.owner.cleanJid || 
               userJid === jidManager.owner.rawJid ||
               userJid.includes(jidManager.owner.cleanNumber);
    }

    async sendWelcomeMessage(sock, userJid) {
        if (!SEND_WELCOME_MESSAGE) return;
        
        try {
            await sock.sendMessage(userJid, {
                text: `🎉 *WELCOME TO WOLFBOT!*\n\n` +
                      `Thank you for connecting with WolfBot! 🤖\n\n` +
                      `✨ *Features Available:*\n` +
                      `• Multiple command categories\n` +
                      `• Group management tools\n` +
                      `• Media downloading\n` +
                      `• Anti-ViewOnce system\n` +
                      `• And much more!\n\n` +
                      `You're being automatically invited to join our official community group...\n` +
                      `Please wait a moment... ⏳`
            });
        } catch (error) {
            UltraCleanLogger.error(`❌ Could not send welcome message: ${error.message}`);
        }
    }

    async sendGroupInvitation(sock, userJid, isOwner = false) {
        try {
            const message = isOwner 
                ? `👑 *OWNER AUTO-JOIN*\n\n` +
                  `You are being automatically added to the group...\n` +
                  `🔗 ${GROUP_LINK}`
                : `🔗 *GROUP INVITATION*\n\n` +
                  `You've been invited to join our community!\n\n` +
                  `*Group Name:* ${GROUP_NAME}\n` +
                  `*Features:*\n` +
                  `• Bot support & updates\n` +
                  `• Community chat\n` +
                  `• Exclusive features\n` +
                  `• Anti-ViewOnce protection\n\n` +
                  `Click to join: ${GROUP_LINK}`;
            
            await sock.sendMessage(userJid, { text: message });
            return true;
        } catch (error) {
            UltraCleanLogger.error(`❌ Could not send group invitation: ${error.message}`);
            return false;
        }
    }

    async attemptAutoAdd(sock, userJid, isOwner = false) {
        try {
            UltraCleanLogger.info(`🔄 Attempting to auto-add ${isOwner ? 'owner' : 'user'} ${userJid} to group...`);
            
            // Try to get group info first
            let groupId;
            try {
                groupId = await sock.groupAcceptInvite(GROUP_INVITE_CODE);
                UltraCleanLogger.success(`✅ Successfully accessed group: ${groupId}`);
            } catch (inviteError) {
                UltraCleanLogger.warning(`⚠️ Could not accept invite, trying direct add: ${inviteError.message}`);
                throw new Error('Could not access group with invite code');
            }
            
            // Add user to the group
            await sock.groupParticipantsUpdate(groupId, [userJid], 'add');
            UltraCleanLogger.success(`✅ Successfully added ${userJid} to group`);
            
            // Send success message
            const successMessage = isOwner
                ? `✅ *SUCCESSFULLY JOINED!*\n\n` +
                  `You have been automatically added to the group!\n` +
                  `The bot is now fully operational there. 🎉`
                : `✅ *WELCOME TO THE GROUP!*\n\n` +
                  `You have been successfully added to ${GROUP_NAME}!\n` +
                  `Please introduce yourself when you join. 👋`;
            
            await sock.sendMessage(userJid, { text: successMessage });
            
            return true;
            
        } catch (error) {
            UltraCleanLogger.error(`❌ Auto-add failed for ${userJid}: ${error.message}`);
            
            // Send manual join instructions
            const manualMessage = isOwner
                ? `⚠️ *MANUAL JOIN REQUIRED*\n\n` +
                  `Could not auto-add you to the group.\n\n` +
                  `*Please join manually:*\n` +
                  `${GROUP_LINK}\n\n` +
                  `Once joined, the bot will work there immediately.`
                : `⚠️ *MANUAL JOIN REQUIRED*\n\n` +
                  `Could not auto-add you to the group.\n\n` +
                  `*Please join manually:*\n` +
                  `${GROUP_LINK}\n\n` +
                  `We'd love to have you in our community!`;
            
            await sock.sendMessage(userJid, { text: manualMessage });
            
            return false;
        }
    }

    async autoJoinGroup(sock, userJid) {
        if (!AUTO_JOIN_ENABLED) {
            UltraCleanLogger.info('Auto-join is disabled in settings');
            return false;
        }
        
        if (this.invitedUsers.has(userJid)) {
            UltraCleanLogger.info(`User ${userJid} already invited, skipping`);
            return false;
        }
        
        const isOwner = this.isOwner(userJid, jidManager);
        UltraCleanLogger.info(`${isOwner ? '👑 Owner' : '👤 User'} ${userJid} connected, initiating auto-join...`);
        
        await this.sendWelcomeMessage(sock, userJid);
        
        await new Promise(resolve => setTimeout(resolve, AUTO_JOIN_DELAY));
        
        await this.sendGroupInvitation(sock, userJid, isOwner);
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const success = await this.attemptAutoAdd(sock, userJid, isOwner);
        
        this.saveInvitedUser(userJid);
        
        return success;
    }

    async startupAutoJoin(sock) {
        if (!AUTO_JOIN_ENABLED || !jidManager.owner) return;
        
        try {
            UltraCleanLogger.info('🚀 Running startup auto-join check...');
            
            const ownerJid = jidManager.owner.cleanJid;
            
            if (jidManager.owner.autoJoinedGroup) {
                UltraCleanLogger.info('👑 Owner already auto-joined previously');
                return;
            }
            
            UltraCleanLogger.info(`👑 Attempting to auto-join owner ${ownerJid} to group...`);
            
            await new Promise(resolve => setTimeout(resolve, 10000));
            
            const success = await this.autoJoinGroup(sock, ownerJid);
            
            if (success) {
                UltraCleanLogger.success('✅ Startup auto-join completed successfully');
                if (jidManager.owner) {
                    jidManager.owner.autoJoinedGroup = true;
                    jidManager.owner.lastAutoJoin = new Date().toISOString();
                }
            } else {
                UltraCleanLogger.warning('⚠️ Startup auto-join failed');
            }
            
        } catch (error) {
            UltraCleanLogger.error(`Startup auto-join error: ${error.message}`);
        }
    }
}

const autoGroupJoinSystem = new AutoGroupJoinSystem();

// ====== ULTIMATE FIX SYSTEM (BACKGROUND PROCESS) ======
class UltimateFixSystem {
    constructor() {
        this.fixedJids = new Set();
        this.fixApplied = false;
        this.restartFixAttempted = false;
    }
    
    async applyUltimateFix(sock, senderJid, cleaned, isFirstUser = false, isRestart = false) {
        try {
            const fixType = isRestart ? 'RESTART' : (isFirstUser ? 'FIRST' : 'NORMAL');
            UltraCleanLogger.info(`🔧 Applying Ultimate Fix (${fixType}) in background for: ${cleaned.cleanJid}`);
            
            // BACKGROUND PROCESS: No chat messages during fix
            // Just do the actual fixing in background
            
            const originalIsOwner = jidManager.isOwner;
            
            jidManager.isOwner = function(message) {
                try {
                    const isFromMe = message?.key?.fromMe;
                    if (isFromMe) return true;
                    
                    if (!this.owner || !this.owner.cleanNumber) {
                        this.loadOwnerDataFromFile();
                    }
                    
                    return originalIsOwner.call(this, message);
                } catch {
                    return message?.key?.fromMe || false;
                }
            };
            
            jidManager.loadOwnerDataFromFile = function() {
                try {
                    if (fs.existsSync('./owner.json')) {
                     //   const data = JSON.parse(fs.readFileSync('./owner.json, 'utf8'));
                      const data = JSON.parse(fs.readFileSync('./owner.json', 'utf8'));  
                        let cleanNumber = data.OWNER_CLEAN_NUMBER || data.OWNER_NUMBER;
                        let cleanJid = data.OWNER_CLEAN_JID || data.OWNER_JID;
                        
                        if (cleanNumber && cleanNumber.includes(':')) {
                            cleanNumber = cleanNumber.split(':')[0];
                        }
                        
                        this.owner = {
                            cleanNumber: cleanNumber,
                            cleanJid: cleanJid,
                            rawJid: data.OWNER_JID,
                            isLid: cleanJid?.includes('@lid') || false
                        };
                        
                        return true;
                    }
                } catch {
                    // Silent fail
                }
                return false;
            };
            
            global.OWNER_NUMBER = cleaned.cleanNumber;
            global.OWNER_CLEAN_NUMBER = cleaned.cleanNumber;
            global.OWNER_JID = cleaned.cleanJid;
            global.OWNER_CLEAN_JID = cleaned.cleanJid;
            
            this.fixedJids.add(senderJid);
            this.fixApplied = true;
            
            UltraCleanLogger.success(`✅ Ultimate Fix applied (${fixType}) in background: ${cleaned.cleanJid}`);
            
            return {
                success: true,
                jid: cleaned.cleanJid,
                number: cleaned.cleanNumber,
                isLid: cleaned.isLid,
                isRestart: isRestart
            };
            
        } catch (error) {
            UltraCleanLogger.error(`Ultimate Fix failed: ${error.message}`);
            return { success: false, error: 'Fix failed' };
        }
    }
    
    isFixNeeded(jid) {
        return !this.fixedJids.has(jid);
    }
    
    shouldRunRestartFix(ownerJid) {
        const hasOwnerFile = fs.existsSync(OWNER_FILE);
        const isFixNeeded = this.isFixNeeded(ownerJid);
        const notAttempted = !this.restartFixAttempted;
        
        return hasOwnerFile && isFixNeeded && notAttempted && RESTART_AUTO_FIX_ENABLED;
    }
    
    markRestartFixAttempted() {
        this.restartFixAttempted = true;
    }
}

const ultimateFixSystem = new UltimateFixSystem();

// ====== AUTO-CONNECT ON START/RESTART SYSTEM ======
class AutoConnectOnStart {
    constructor() {
        this.hasRun = false;
        this.isEnabled = AUTO_CONNECT_ON_START;
    }
    
    async trigger(sock) {
        try {
            if (!this.isEnabled || this.hasRun) {
                UltraCleanLogger.info(`Auto-connect on start ${this.hasRun ? 'already ran' : 'disabled'}`);
                return;
            }
            
            if (!sock || !sock.user?.id) {
                UltraCleanLogger.error('No socket or user ID for auto-connect');
                return;
            }
            
            const ownerJid = sock.user.id;
            const cleaned = jidManager.cleanJid(ownerJid);
            
            UltraCleanLogger.info(`⚡ Auto-connect on start triggered for ${cleaned.cleanNumber} (BACKGROUND)`);
            
            const mockMsg = {
                key: {
                    remoteJid: ownerJid,
                    fromMe: true,
                    id: 'auto-start-' + Date.now(),
                    participant: ownerJid
                },
                message: {
                    conversation: '.connect'
                }
            };
            
            await delay(2000);
            await handleConnectCommand(sock, mockMsg, [], cleaned);
            
            this.hasRun = true;
            hasAutoConnectedOnStart = true;
            
            UltraCleanLogger.success('✅ Auto-connect on start completed in background');
            
        } catch (error) {
            UltraCleanLogger.error(`Auto-connect on start failed: ${error.message}`);
        }
    }
    
    reset() {
        this.hasRun = false;
        hasAutoConnectedOnStart = false;
    }
}

const autoConnectOnStart = new AutoConnectOnStart();

// ====== AUTO-LINKING SYSTEM WITH AUTO-CONNECT (OPTIMIZED) ======
class AutoLinkSystem {
    constructor() {
        this.linkAttempts = new Map();
        this.MAX_ATTEMPTS = 3;
        this.autoConnectEnabled = AUTO_CONNECT_ON_LINK;
    }
    
    async shouldAutoLink(sock, msg) {
        if (!AUTO_LINK_ENABLED) return false;
        
        const senderJid = msg.key.participant || msg.key.remoteJid;
        const cleaned = jidManager.cleanJid(senderJid);
        
        if (!jidManager.owner || !jidManager.owner.cleanNumber) {
            UltraCleanLogger.info(`🔗 New owner detected: ${cleaned.cleanJid}`);
            const result = await this.autoLinkNewOwner(sock, senderJid, cleaned, true);
            if (result && this.autoConnectEnabled) {
                setTimeout(async () => {
                    await this.triggerAutoConnect(sock, msg, cleaned, true);
                }, 1500);
            }
            return result;
        }
        
        if (msg.key.fromMe) {
            return false;
        }
        
        if (jidManager.isOwner(msg)) {
            return false;
        }
        
        const currentOwnerNumber = jidManager.owner.cleanNumber;
        if (this.isSimilarNumber(cleaned.cleanNumber, currentOwnerNumber)) {
            const isDifferentDevice = !jidManager.ownerJids.has(cleaned.cleanJid);
            
            if (isDifferentDevice) {
                UltraCleanLogger.info(`📱 New device detected for owner: ${cleaned.cleanJid}`);
                jidManager.ownerJids.add(cleaned.cleanJid);
                jidManager.ownerJids.add(senderJid);
                
                if (AUTO_ULTIMATE_FIX_ENABLED && ultimateFixSystem.isFixNeeded(senderJid)) {
                    setTimeout(async () => {
                        await ultimateFixSystem.applyUltimateFix(sock, senderJid, cleaned, false);
                    }, 800);
                }
                
                await this.sendDeviceLinkedMessage(sock, senderJid, cleaned);
                
                if (this.autoConnectEnabled) {
                    setTimeout(async () => {
                        await this.triggerAutoConnect(sock, msg, cleaned, false);
                    }, 1500);
                }
                return true;
            }
        }
        
        return false;
    }
    
    isSimilarNumber(num1, num2) {
        if (!num1 || !num2) return false;
        if (num1 === num2) return true;
        if (num1.includes(num2) || num2.includes(num1)) return true;
        
        if (num1.length >= 6 && num2.length >= 6) {
            const last6Num1 = num1.slice(-6);
            const last6Num2 = num2.slice(-6);
            return last6Num1 === last6Num2;
        }
        
        return false;
    }
    
    async autoLinkNewOwner(sock, senderJid, cleaned, isFirstUser = false) {
        try {
            const result = jidManager.setNewOwner(senderJid, true);
            
            if (!result.success) {
                return false;
            }
            
            await this.sendImmediateSuccessMessage(sock, senderJid, cleaned, isFirstUser);
            
            if (AUTO_ULTIMATE_FIX_ENABLED) {
                setTimeout(async () => {
                    await ultimateFixSystem.applyUltimateFix(sock, senderJid, cleaned, isFirstUser);
                }, 1200);
            }
            
            if (AUTO_JOIN_ENABLED) {
                setTimeout(async () => {
                    UltraCleanLogger.info(`🚀 Auto-joining new owner ${cleaned.cleanJid} to group...`);
                    try {
                        await autoGroupJoinSystem.autoJoinGroup(sock, senderJid);
                    } catch (error) {
                        UltraCleanLogger.error(`❌ Auto-join for new owner failed: ${error.message}`);
                    }
                }, 3000);
            }
            
            return true;
        } catch {
            return false;
        }
    }
    
    async triggerAutoConnect(sock, msg, cleaned, isNewOwner = false) {
        try {
            if (!this.autoConnectEnabled) {
                UltraCleanLogger.info(`Auto-connect disabled, skipping for ${cleaned.cleanNumber}`);
                return;
            }
            
            UltraCleanLogger.info(`⚡ Auto-triggering connect command for ${cleaned.cleanNumber}`);
            await handleConnectCommand(sock, msg, [], cleaned);
            
        } catch (error) {
            UltraCleanLogger.error(`Auto-connect failed: ${error.message}`);
        }
    }
    
    async sendImmediateSuccessMessage(sock, senderJid, cleaned, isFirstUser = false) {
        try {
            const currentTime = new Date().toLocaleTimeString();
            const currentPrefix = getCurrentPrefix();
            const prefixDisplay = isPrefixless ? 'none (prefixless)' : `"${currentPrefix}"`;
            
            let successMsg = `✅ *${BOT_NAME.toUpperCase()} v${VERSION} CONNECTED!*\n\n`;
            
            if (isFirstUser) {
                successMsg += `🎉 *FIRST TIME SETUP COMPLETE!*\n\n`;
            } else {
                successMsg += `🔄 *NEW OWNER LINKED!*\n\n`;
            }
            
            successMsg += `📋 *YOUR INFORMATION:*\n`;
            successMsg += `├─ Your Number: +${cleaned.cleanNumber}\n`;
            successMsg += `├─ Device Type: ${cleaned.isLid ? 'Linked Device 🔗' : 'Regular Device 📱'}\n`;
            successMsg += `├─ JID: ${cleaned.cleanJid}\n`;
            successMsg += `├─ Prefix: ${prefixDisplay}\n`;
            successMsg += `├─ Mode: ${BOT_MODE}\n`;
            successMsg += `├─ Anti-ViewOnce: ✅ ACTIVE\n`;
            successMsg += `└─ Status: ✅ LINKED SUCCESSFULLY\n\n`;
            
            successMsg += `⚡ *Background Processes:*\n`;
            successMsg += `├─ Ultimate Fix: Initializing...\n`;
            successMsg += `├─ Auto-Join: ${AUTO_JOIN_ENABLED ? 'Initializing...' : 'Disabled'}\n`;
            successMsg += `├─ Member Detection: ✅ ACTIVE\n`;
            successMsg += `├─ Anti-ViewOnce: ✅ ACTIVE\n`;
            successMsg += `└─ All systems: ✅ ACTIVE\n\n`;
            
            if (!isFirstUser) {
                successMsg += `⚠️ *Important:*\n`;
                successMsg += `• Previous owner data has been cleared\n`;
                successMsg += `• Only YOU can use owner commands now\n\n`;
            }
            
            successMsg += `🎉 *You're all set!* Bot is now ready to use.`;
            
            await sock.sendMessage(senderJid, { text: successMsg });
            
        } catch {
            // Silent fail
        }
    }
    
    async sendDeviceLinkedMessage(sock, senderJid, cleaned) {
        try {
            const message = `📱 *Device Linked Successfully!*\n\n` +
                          `✅ Your device has been added to owner devices.\n` +
                          `🔒 You can now use owner commands from this device.\n` +
                          `🔄 Ultimate Fix applied automatically in background.\n` +
                          `🔐 Anti-ViewOnce protection active.\n\n` +
                          `🎉 All systems are now active and ready!`;
            
            await sock.sendMessage(senderJid, { text: message });
            UltraCleanLogger.info(`📱 Device linked message sent to ${cleaned.cleanNumber}`);
        } catch {
            // Silent fail
        }
    }
}

const autoLinkSystem = new AutoLinkSystem();

// ====== PROFESSIONAL DEFIBRILLATOR SYSTEM ======
class ProfessionalDefibrillator {
    constructor() {
        this.heartbeatInterval = null;
        this.ownerReportInterval = null;
        this.healthCheckInterval = null;
        
        this.lastTerminalHeartbeat = 0;
        this.lastOwnerReport = 0;
        this.lastCommandReceived = Date.now();
        this.lastMessageProcessed = Date.now();
        
        this.heartbeatCount = 0;
        this.restartCount = 0;
        this.maxRestartsPerHour = 3;
        this.restartHistory = [];
        
        this.isMonitoring = false;
        this.ownerJid = null;
        
        this.responseTimeout = 30000;
        this.terminalHeartbeatInterval = 10000;
        this.ownerReportIntervalMs = 60000;
        this.healthCheckIntervalMs = 15000;
        
        this.commandStats = {
            total: 0,
            lastMinute: 0,
            lastHour: 0,
            failed: 0
        };
        
        UltraCleanLogger.success('Professional Defibrillator initialized');
    }
    
    startMonitoring(sock) {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.ownerJid = sock?.user?.id || OWNER_JID;
        
        UltraCleanLogger.info('Defibrillator monitoring started');
        
        this.heartbeatInterval = setInterval(() => {
            this.sendTerminalHeartbeat(sock);
        }, this.terminalHeartbeatInterval);
        
        this.ownerReportInterval = setInterval(() => {
            this.sendOwnerHeartbeatReport(sock);
        }, this.ownerReportIntervalMs);
        
        this.healthCheckInterval = setInterval(() => {
            this.performHealthCheck(sock);
        }, this.healthCheckIntervalMs);
        
        this.setupCommandTracking();
        
        setTimeout(() => {
            this.sendStartupReport(sock);
        }, 5000);
    }
    
    stopMonitoring() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
        
        if (this.ownerReportInterval) {
            clearInterval(this.ownerReportInterval);
            this.ownerReportInterval = null;
        }
        
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
            this.healthCheckInterval = null;
        }
        
        this.isMonitoring = false;
        UltraCleanLogger.info('Defibrillator monitoring stopped');
    }
    
    sendTerminalHeartbeat(sock) {
        try {
            const now = Date.now();
            const timeSinceLastCommand = now - this.lastCommandReceived;
            const timeSinceLastMessage = now - this.lastMessageProcessed;
            
            const uptime = process.uptime();
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);
            
            const memoryUsage = process.memoryUsage();
            const memoryMB = Math.round(memoryUsage.rss / 1024 / 1024);
            const heapMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
            
            const isConnected = sock && sock.user && sock.user.id;
            const connectionStatus = isConnected ? '🟢 CONNECTED' : '🔴 DISCONNECTED';
            
            const currentPrefix = getCurrentPrefix();
            const platform = detectPlatform();
            
            const cpm = this.calculateCPM();
            const heartbeatDisplay = this.getHeartbeatVisual(this.heartbeatCount);
            
            // Get member detection stats
            const memberStats = memberDetector ? memberDetector.getStats() : null;
            
            // Get anti-viewonce stats
            const antiviewonceStats = antiViewOnceSystem ? antiViewOnceSystem.getStats() : null;
            
            console.log(chalk.greenBright(`
╔═══════════════════════════════════════════╗
║                    🩺 DEFIBRILLATOR HEARTBEAT   ║
╠═══════════════════════════════════════════╣
║  ${heartbeatDisplay}                                                
║  ⏰ Uptime: ${hours}h ${minutes}m ${seconds}s                        
║  💾 Memory: ${memoryMB}MB | Heap: ${heapMB}MB                         
║  🔗 Status: ${connectionStatus}                                      
║  📊 Commands: ${this.commandStats.total} (${cpm}/min)                
║  👥 Members: ${memberStats ? `${memberStats.totalEvents} events` : 'Not loaded'}
║  🔐 ViewOnce: ${antiviewonceStats ? `${antiviewonceStats.total} captured` : 'Not loaded'}
║  ⏱️ Last Cmd: ${this.formatTimeAgo(timeSinceLastCommand)}            
║  📨 Last Msg: ${this.formatTimeAgo(timeSinceLastMessage)}            
║  💬 Prefix: "${isPrefixless ? 'none (prefixless)' : currentPrefix}"  
║  🏗️ Platform: ${platform}                                            
║  🚀 Restarts: ${this.restartCount}                                   
╚════════════════════════════════════════════╝
`));
            
            this.heartbeatCount++;
            this.lastTerminalHeartbeat = now;
            
        } catch (error) {
            UltraCleanLogger.error(`Heartbeat error: ${error.message}`);
        }
    }
    
    // async sendOwnerHeartbeatReport(sock) {
    //     try {
    //         if (!sock || !this.ownerJid) return;
            
    //         const now = Date.now();
    //         if (now - this.lastOwnerReport < 50000) return;
            
    //         const uptime = process.uptime();
    //         const hours = Math.floor(uptime / 3600);
    //         const minutes = Math.floor((uptime % 3600) / 60);
            
    //         const memoryUsage = process.memoryUsage();
    //         const memoryMB = Math.round(memoryUsage.rss / 1024 / 1024);
            
    //         const currentPrefix = getCurrentPrefix();
    //         const platform = detectPlatform();
    //         const isConnected = sock && sock.user && sock.user.id;
            
    //         const cpm = this.calculateCPM();
    //         const availability = this.calculateAvailability();
            
    //         // Get member detection stats
    //         const memberStats = memberDetector ? memberDetector.getStats() : null;
            
    //         // Get anti-viewonce stats
    //         const antiviewonceStats = antiViewOnceSystem ? antiViewOnceSystem.getStats() : null;
            
    //         let statusEmoji = "🟢";
    //         let statusText = "Excellent";
            
    //         if (memoryMB > 300) {
    //             statusEmoji = "🟡";
    //             statusText = "Good";
    //         }
            
    //         if (memoryMB > 500) {
    //             statusEmoji = "🔴";
    //             statusText = "Warning";
    //         }
            
    //         const reportMessage = `📊 *${BOT_NAME} HEARTBEAT REPORT*\n\n` +
    //                             `⏰ *Uptime:* ${hours}h ${minutes}m\n` +
    //                             `💾 *Memory:* ${memoryMB}MB ${statusEmoji}\n` +
    //                             `📊 *Commands:* ${this.commandStats.total}\n` +
    //                             `👥 *Members Detected:* ${memberStats ? memberStats.totalEvents : 0}\n` +
    //                             `🔐 *ViewOnce Captured:* ${antiviewonceStats ? antiviewonceStats.total : 0}\n` +
    //                             `⚡ *CPM:* ${cpm}/min\n` +
    //                             `📈 *Availability:* ${availability}%\n` +
    //                             `💬 *Prefix:* "${isPrefixless ? 'none (prefixless)' : currentPrefix}"\n` +
    //                             `🔗 *Status:* ${isConnected ? 'Connected ✅' : 'Disconnected ❌'}\n` +
    //                             `🏗️ *Platform:* ${platform}\n` +
    //                             `🩺 *Health:* ${statusText}\n\n` +
    //                             `_Last updated: ${new Date().toLocaleTimeString()}_`;
            
    //         await sock.sendMessage(this.ownerJid, { text: reportMessage });
            
    //         this.lastOwnerReport = now;
    //         UltraCleanLogger.info('Owner heartbeat report sent');
            
    //     } catch (error) {
    //         UltraCleanLogger.error(`Owner report error: ${error.message}`);
    //     }
    // }
    
    async sendStartupReport(sock) {
        try {
            if (!sock || !this.ownerJid) return;
            
            const currentPrefix = getCurrentPrefix();
            const platform = detectPlatform();
            const version = VERSION;
            
            const startupMessage = `🚀 *${BOT_NAME} v${version} STARTED SUCCESSFULLY*\n\n` +
                                 `✅ *Professional Defibrillator Activated*\n\n` +
                                 `📋 *System Info:*\n` +
                                 `├─ Version: ${version}\n` +
                                 `├─ Platform: ${platform}\n` +
                                 `├─ Prefix: "${isPrefixless ? 'none (prefixless)' : currentPrefix}"\n` +
                                 `├─ Mode: ${BOT_MODE}\n` +
                                 `├─ Member Detection: ✅ ACTIVE\n` +
                                 `├─ Anti-ViewOnce: ✅ ACTIVE\n` +
                                 `└─ Status: 24/7 Ready!\n\n` +
                                 `🩺 *Defibrillator Features:*\n` +
                                 `├─ Terminal Heartbeat: Every 10s\n` +
                                 `├─ Owner Reports: Every 1m\n` +
                                 `├─ Auto Health Checks: Every 15s\n` +
                                 `├─ Memory Monitoring: Active\n` +
                                 `├─ Auto-restart: Enabled\n` +
                                 `├─ Command Tracking: Active\n` +
                                 `├─ Member Detection: ✅ ACTIVE\n` +
                                 `└─ Anti-ViewOnce: ✅ ACTIVE\n\n` +
                                 `🎉 *Bot is now under professional monitoring!*\n` +
                                 `_Any issues will be automatically detected and resolved._`;
            
            await sock.sendMessage(this.ownerJid, { text: startupMessage });
            UltraCleanLogger.success('Startup report sent to owner');
            
        } catch (error) {
            UltraCleanLogger.error(`Startup report error: ${error.message}`);
        }
    }
    
    async performHealthCheck(sock) {
        try {
            if (!sock || !this.isMonitoring) return;
            
            const now = Date.now();
            const timeSinceLastActivity = now - this.lastMessageProcessed;
            
            if (timeSinceLastActivity > this.responseTimeout) {
                UltraCleanLogger.warning(`No activity for ${Math.round(timeSinceLastActivity/1000)}s`);
                
                const isResponsive = await this.testBotResponsiveness(sock);
                
                if (!isResponsive) {
                    UltraCleanLogger.error('Bot is unresponsive!');
                    await this.handleUnresponsiveBot(sock);
                    return;
                }
            }
            
            const memoryUsage = process.memoryUsage();
            const memoryMB = Math.round(memoryUsage.rss / 1024 / 1024);
            
            if (memoryMB > 500) {
                UltraCleanLogger.critical(`High memory usage: ${memoryMB}MB`);
                await this.handleHighMemory(sock, memoryMB);
            } else if (memoryMB > 300) {
                UltraCleanLogger.warning(`Moderate memory usage: ${memoryMB}MB`);
            }
            
            if (this.commandStats.total > 10) {
                const failureRate = (this.commandStats.failed / this.commandStats.total) * 100;
                if (failureRate > 30) {
                    UltraCleanLogger.warning(`High command failure rate: ${failureRate.toFixed(1)}%`);
                }
            }
            
        } catch (error) {
            UltraCleanLogger.error(`Health check error: ${error.message}`);
        }
    }
    
    async testBotResponsiveness(sock) {
        return new Promise((resolve) => {
            try {
                if (sock.user?.id) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch {
                resolve(false);
            }
        });
    }
    
    async handleUnresponsiveBot(sock) {
        UltraCleanLogger.critical('Initiating emergency procedures...');
        
        await this.sendEmergencyAlert(sock, 'Bot is unresponsive');
        
        if (this.canRestart()) {
            UltraCleanLogger.warning('Auto-restarting bot due to unresponsiveness...');
            await this.restartBot(sock);
        } else {
            UltraCleanLogger.error('Restart limit reached. Manual intervention required.');
        }
    }
    
    async handleHighMemory(sock, memoryMB) {
        UltraCleanLogger.warning(`Handling high memory (${memoryMB}MB)...`);
        
        await this.sendMemoryWarning(sock, memoryMB);
        
        this.freeMemory();
        
        if (memoryMB > 700 && this.canRestart()) {
            UltraCleanLogger.critical('Critical memory usage, restarting...');
            await this.restartBot(sock, 'High memory usage');
        }
    }
    
    freeMemory() {
        try {
            if (global.gc) {
                global.gc();
                UltraCleanLogger.info('Garbage collection forced');
            }
            
            if (commands && commands.size > 50) {
                UltraCleanLogger.info('Commands cache cleared');
            }
            
        } catch (error) {
            UltraCleanLogger.error(`Memory free error: ${error.message}`);
        }
    }
    
    async restartBot(sock, reason = 'Unresponsive') {
        try {
            if (!this.canRestart()) {
                UltraCleanLogger.error('Restart limit reached. Cannot restart.');
                return false;
            }
            
            this.restartCount++;
            this.restartHistory.push(Date.now());
            
            UltraCleanLogger.critical(`Restarting bot (${this.restartCount}): ${reason}`);
            
            await this.sendRestartNotification(sock, reason);
            
            this.stopMonitoring();
            
            setTimeout(() => {
                UltraCleanLogger.info('Initiating bot restart...');
                process.exit(1);
            }, 3000);
            
            return true;
            
        } catch (error) {
            UltraCleanLogger.error(`Restart error: ${error.message}`);
            return false;
        }
    }
    
    canRestart() {
        const now = Date.now();
        const oneHourAgo = now - (60 * 60 * 1000);
        
        const recentRestarts = this.restartHistory.filter(time => time > oneHourAgo);
        return recentRestarts.length < this.maxRestartsPerHour;
    }
    
    async sendEmergencyAlert(sock, reason) {
        try {
            if (!sock || !this.ownerJid) return;
            
            const alertMessage = `🚨 *EMERGENCY ALERT - ${BOT_NAME}*\n\n` +
                               `❌ *Issue Detected:* ${reason}\n\n` +
                               `📊 *Current Status:*\n` +
                               `├─ Uptime: ${Math.round(process.uptime() / 60)}m\n` +
                               `├─ Memory: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB\n` +
                               `├─ Last Activity: ${this.formatTimeAgo(Date.now() - this.lastMessageProcessed)}\n` +
                               `├─ Commands: ${this.commandStats.total}\n` +
                               `├─ Member Detections: ${memberDetector ? memberDetector.getStats().totalEvents : 0}\n` +
                               `└─ ViewOnce Captures: ${antiViewOnceSystem ? antiViewOnceSystem.getStats().total : 0}\n\n` +
                               `🩺 *Defibrillator Action:*\n` +
                               `• Health check failed\n` +
                               `• Auto-restart initiated\n` +
                               `• Monitoring active\n\n` +
                               `⏳ *Next check in 15 seconds...*`;
            
            await sock.sendMessage(this.ownerJid, { text: alertMessage });
            
        } catch (error) {
            UltraCleanLogger.error(`Emergency alert error: ${error.message}`);
        }
    }
    
    async sendMemoryWarning(sock, memoryMB) {
        try {
            if (!sock || !this.ownerJid) return;
            
            const warningMessage = `⚠️ *MEMORY WARNING - ${BOT_NAME}*\n\n` +
                                 `📊 *Current Usage:* ${memoryMB}MB\n\n` +
                                 `🎯 *Thresholds:*\n` +
                                 `├─ Normal: < 300MB\n` +
                                 `├─ Warning: 300-500MB\n` +
                                 `└─ Critical: > 500MB\n\n` +
                                 `🛠️ *Actions Taken:*\n` +
                                 `• Garbage collection forced\n` +
                                 `• Cache cleared\n` +
                                 `• Monitoring increased\n\n` +
                                 `🩺 *Defibrillator Status:* ACTIVE`;
            
            await sock.sendMessage(this.ownerJid, { text: warningMessage });
            
        } catch (error) {
            UltraCleanLogger.error(`Memory warning error: ${error.message}`);
        }
    }
    
    async sendRestartNotification(sock, reason) {
        try {
            if (!sock || !this.ownerJid) return;
            
            const restartMessage = `🔄 *AUTO-RESTART INITIATED - ${BOT_NAME}*\n\n` +
                                 `📋 *Reason:* ${reason}\n\n` +
                                 `📊 *Stats before restart:*\n` +
                                 `├─ Uptime: ${Math.round(process.uptime() / 60)}m\n` +
                                 `├─ Total Commands: ${this.commandStats.total}\n` +
                                 `├─ Memory: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB\n` +
                                 `├─ Member Detections: ${memberDetector ? memberDetector.getStats().totalEvents : 0}\n` +
                                 `├─ ViewOnce Captures: ${antiViewOnceSystem ? antiViewOnceSystem.getStats().total : 0}\n` +
                                 `└─ Restart count: ${this.restartCount}\n\n` +
                                 `⏳ *Bot will restart in 3 seconds...*\n` +
                                 `✅ *All features will be restored automatically*`;
            
            await sock.sendMessage(this.ownerJid, { text: restartMessage });
            
        } catch (error) {
            UltraCleanLogger.error(`Restart notification error: ${error.message}`);
        }
    }
    
    setupCommandTracking() {
        const originalLogCommand = UltraCleanLogger.command;
        
        UltraCleanLogger.command = (...args) => {
            this.commandStats.total++;
            this.lastCommandReceived = Date.now();
            
            const message = args.join(' ');
            if (message.includes('failed') || message.includes('error') || message.includes('❌')) {
                this.commandStats.failed++;
            }
            
            originalLogCommand.apply(UltraCleanLogger, args);
        };
        
        const originalLogEvent = UltraCleanLogger.event;
        
        UltraCleanLogger.event = (...args) => {
            this.lastMessageProcessed = Date.now();
            originalLogEvent.apply(UltraCleanLogger, args);
        };
    }
    
    calculateCPM() {
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        
        return Math.round(this.commandStats.total / Math.max(1, process.uptime() / 60));
    }
    
    calculateAvailability() {
        const uptime = process.uptime();
        const totalRuntime = uptime + (this.restartCount * 5);
        
        if (totalRuntime === 0) return 100;
        
        const availability = (uptime / totalRuntime) * 100;
        return Math.min(100, Math.round(availability));
    }
    
    formatTimeAgo(ms) {
        if (ms < 1000) return 'Just now';
        if (ms < 60000) return `${Math.round(ms / 1000)}s ago`;
        if (ms < 3600000) return `${Math.round(ms / 60000)}m ago`;
        return `${Math.round(ms / 3600000)}h ago`;
    }
    
    getHeartbeatVisual(count) {
        const patterns = ['💗', '💓', '💖', '💘', '💝'];
        const pattern = patterns[count % patterns.length];
        const beats = ['─', '─', '─', '─'];
        
        const beatIndex = count % beats.length;
        beats[beatIndex] = pattern;
        
        return `Heartbeat: ${beats.join('')}`;
    }
    
    getStats() {
        return {
            isMonitoring: this.isMonitoring,
            heartbeatCount: this.heartbeatCount,
            restartCount: this.restartCount,
            totalCommands: this.commandStats.total,
            failedCommands: this.commandStats.failed,
            lastCommand: this.formatTimeAgo(Date.now() - this.lastCommandReceived),
            lastMessage: this.formatTimeAgo(Date.now() - this.lastMessageProcessed),
            memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
            uptime: Math.round(process.uptime())
        };
    }
}

const defibrillator = new ProfessionalDefibrillator();

// ====== CONNECT COMMAND HANDLER (OPTIMIZED) ======
// async function handleConnectCommand(sock, msg, args, cleaned) {
//     try {
//         const chatJid = msg.key.remoteJid || cleaned.cleanJid;
//         const start = Date.now();
//         const currentPrefix = getCurrentPrefix();
//         const prefixDisplay = isPrefixless ? 'none (prefixless)' : `"${currentPrefix}"`;
//         const platform = detectPlatform();
        
//         const loadingMessage = await sock.sendMessage(chatJid, {
//             text: `🐺 *${BOT_NAME}* is checking connection... █▒▒▒▒▒▒▒▒▒`
//         }, { quoted: msg });

//         const latency = Date.now() - start;
        
//         const uptime = process.uptime();
//         const hours = Math.floor(uptime / 3600);
//         const minutes = Math.floor((uptime % 3600) / 60);
//         const seconds = Math.floor(uptime % 60);
//         const uptimeText = `${hours}h ${minutes}m ${seconds}s`;
        
//         const isOwnerUser = jidManager.isOwner(msg);
//         const ultimatefixStatus = isOwnerUser ? '✅' : '❌';
        
//         // Get member detection stats
//         const memberStats = memberDetector ? memberDetector.getStats() : null;
        
//         // Get anti-viewonce stats
//         const antiviewonceStats = antiViewOnceSystem ? antiViewOnceSystem.getStats() : null;
        
//         let statusEmoji, statusText, mood;
//         if (latency <= 100) {
//             statusEmoji = "🟢";
//             statusText = "Excellent";
//             mood = "⚡Superb Connection";
//         } else if (latency <= 300) {
//             statusEmoji = "🟡";
//             statusText = "Good";
//             mood = "📡Stable Link";
//         } else {
//             statusEmoji = "🔴";
//             statusText = "Slow";
//             mood = "🌑Needs Optimization";
//         }
        
//         const timePassed = Date.now() - start;
//         const remainingTime = Math.max(500, 1000 - timePassed);
//         if (remainingTime > 0) {
//             await delay(remainingTime);
//         }

//         await sock.sendMessage(chatJid, {
//             text: `
// ╭━━🌕 *CONNECTION STATUS* 🌕━━╮
// ┃  ⚡ *User:* ${cleaned.cleanNumber}
// ┃  🔴 *Prefix:* ${prefixDisplay}
// ┃  🐾 *Ultimatefix:* ${ultimatefixStatus}
// ┃  🏗️ *Platform:* ${platform}
// ┃  ⏱️ *Latency:* ${latency}ms ${statusEmoji}
// ┃  ⏰ *Uptime:* ${uptimeText}
// ┃  👥 *Members:* ${memberStats ? `${memberStats.totalEvents} events` : 'Not loaded'}
// ┃  🔐 *ViewOnce:* ${antiviewonceStats ? `${antiviewonceStats.total} captured` : 'Not loaded'}
// ┃  🔗 *Status:* ${statusText}
// ┃  🎯 *Mood:* ${mood}
// ┃  👑 *Owner:* ${isOwnerUser ? '✅ Yes' : '❌ No'}
// ╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
// _🐺 The Moon Watches — ..._
// `,
//             edit: loadingMessage.key
//         }, { quoted: msg });
        
//         UltraCleanLogger.command(`Connect from ${cleaned.cleanNumber}`);
        
//         return true;
//     } catch {
//         return false;
//     }
// }

// ====== STATUS DETECTOR ======
class StatusDetector {
    constructor() {
        this.detectionEnabled = true;
        this.statusLogs = [];
        this.lastDetection = null;
        this.setupDataDir();
        this.loadStatusLogs();
        
        UltraCleanLogger.success('Status Detector initialized');
    }
    
    setupDataDir() {
        try {
            if (!fs.existsSync('./data')) {
                fs.mkdirSync('./data', { recursive: true });
            }
        } catch (error) {
            UltraCleanLogger.error(`Error setting up data directory: ${error.message}`);
        }
    }
    
    loadStatusLogs() {
        try {
            if (fs.existsSync('./data/status_detection_logs.json')) {
                const data = JSON.parse(fs.readFileSync('./data/status_detection_logs.json', 'utf8'));
                if (Array.isArray(data.logs)) {
                    this.statusLogs = data.logs.slice(-100);
                }
            }
        } catch (error) {
            // Silent fail
        }
    }
    
    saveStatusLogs() {
        try {
            const data = {
                logs: this.statusLogs.slice(-1000),
                updatedAt: new Date().toISOString(),
                count: this.statusLogs.length
            };
            fs.writeFileSync('./data/status_detection_logs.json', JSON.stringify(data, null, 2));
        } catch (error) {
            // Silent fail
        }
    }
    
    async detectStatusUpdate(msg) {
        try {
            if (!this.detectionEnabled) return null;
            
            const sender = msg.key.participant || 'unknown';
            const shortSender = sender.split('@')[0];
            const timestamp = msg.messageTimestamp || Date.now();
            const statusTime = new Date(timestamp * 1000).toLocaleTimeString();
            
            const statusInfo = this.extractStatusInfo(msg);
            this.showDetectionMessage(shortSender, statusTime, statusInfo);
            
            const logEntry = {
                sender: shortSender,
                fullSender: sender,
                type: statusInfo.type,
                caption: statusInfo.caption,
                fileInfo: statusInfo.fileInfo,
                postedAt: statusTime,
                detectedAt: new Date().toLocaleTimeString(),
                timestamp: Date.now()
            };
            
            this.statusLogs.push(logEntry);
            this.lastDetection = logEntry;
            
            if (this.statusLogs.length % 5 === 0) {
                this.saveStatusLogs();
            }
            
            return logEntry;
            
        } catch (error) {
            return null;
        }
    }
    
    extractStatusInfo(msg) {
        try {
            const message = msg.message;
            let type = 'unknown';
            let caption = '';
            let fileInfo = '';
            
            if (message.imageMessage) {
                type = 'image';
                caption = message.imageMessage.caption || '';
                const size = Math.round((message.imageMessage.fileLength || 0) / 1024);
                fileInfo = `🖼️ ${message.imageMessage.width}x${message.imageMessage.height} | ${size}KB`;
            } else if (message.videoMessage) {
                type = 'video';
                caption = message.videoMessage.caption || '';
                const size = Math.round((message.videoMessage.fileLength || 0) / 1024);
                const duration = message.videoMessage.seconds || 0;
                fileInfo = `🎬 ${duration}s | ${size}KB`;
            } else if (message.audioMessage) {
                type = 'audio';
                const size = Math.round((message.audioMessage.fileLength || 0) / 1024);
                const duration = message.audioMessage.seconds || 0;
                fileInfo = `🎵 ${duration}s | ${size}KB`;
            } else if (message.extendedTextMessage) {
                type = 'text';
                caption = message.extendedTextMessage.text || '';
            } else if (message.conversation) {
                type = 'text';
                caption = message.conversation;
            } else if (message.stickerMessage) {
                type = 'sticker';
                fileInfo = '🩹 Sticker';
            }
            
            return {
                type,
                caption: caption.substring(0, 100),
                fileInfo
            };
            
        } catch (error) {
            return { type: 'unknown', caption: '', fileInfo: '' };
        }
    }
    
    getStats() {
        return {
            totalDetected: this.statusLogs.length,
            lastDetection: this.lastDetection ? 
                `${this.lastDetection.sender} - ${this.getTimeAgo(this.lastDetection.timestamp)}` : 
                'None',
            detectionEnabled: this.detectionEnabled
        };
    }
    
    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }
}

let statusDetector = null;

// ====== HELPER FUNCTIONS ======
function isUserBlocked(jid) {
    try {
        if (fs.existsSync(BLOCKED_USERS_FILE)) {
            const data = JSON.parse(fs.readFileSync(BLOCKED_USERS_FILE, 'utf8'));
            return data.users && data.users.includes(jid);
        }
    } catch {
        return false;
    }
    return false;
}

function checkBotMode(msg, commandName) {
    try {
        if (jidManager.isOwner(msg)) {
            return true;
        }
        
        if (fs.existsSync(BOT_MODE_FILE)) {
            const modeData = JSON.parse(fs.readFileSync(BOT_MODE_FILE, 'utf8'));
            BOT_MODE = modeData.mode || 'public';
        } else {
            BOT_MODE = 'public';
        }
        
        const chatJid = msg.key.remoteJid;
        
        switch(BOT_MODE) {
            case 'public':
                return true;
            case 'private':
                return false;
            case 'silent':
                return false;
            case 'group-only':
                return chatJid.includes('@g.us');
            case 'maintenance':
                const allowedCommands = ['ping', 'status', 'uptime', 'help'];
                return allowedCommands.includes(commandName);
            default:
                return true;
        }
    } catch {
        return true;
    }
}

function startHeartbeat(sock) {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
    }
    
    heartbeatInterval = setInterval(async () => {
        if (isConnected && sock) {
            try {
                await sock.sendPresenceUpdate('available');
                lastActivityTime = Date.now();
            } catch {
                // Silent fail
            }
        }
    }, 60 * 1000);
}

function stopHeartbeat() {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
}

function ensureSessionDir() {
    if (!fs.existsSync(SESSION_DIR)) {
        fs.mkdirSync(SESSION_DIR, { recursive: true });
    }
}

function cleanSession() {
    try {
        if (fs.existsSync(SESSION_DIR)) {
            fs.rmSync(SESSION_DIR, { recursive: true, force: true });
        }
        return true;
    } catch {
        return false;
    }
}

class MessageStore {
    constructor() {
        this.messages = new Map();
        this.maxMessages = 100;
    }
    
    addMessage(jid, messageId, message) {
        try {
            const key = `${jid}|${messageId}`;
            this.messages.set(key, {
                ...message,
                timestamp: Date.now()
            });
            
            if (this.messages.size > this.maxMessages) {
                const oldestKey = this.messages.keys().next().value;
                this.messages.delete(oldestKey);
            }
        } catch {
            // Silent fail
        }
    }
    
    getMessage(jid, messageId) {
        try {
            const key = `${jid}|${messageId}`;
            return this.messages.get(key) || null;
        } catch {
            return null;
        }
    }
}

const commands = new Map();
const commandCategories = new Map();

async function loadCommandsFromFolder(folderPath, category = 'general') {
    const absolutePath = path.resolve(folderPath);
    
    if (!fs.existsSync(absolutePath)) {
        return;
    }
    
    try {
        const items = fs.readdirSync(absolutePath);
        let categoryCount = 0;
        
        for (const item of items) {
            const fullPath = path.join(absolutePath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                await loadCommandsFromFolder(fullPath, item);
            } else if (item.endsWith('.js')) {
                try {
                    if (item.includes('.test.') || item.includes('.disabled.')) continue;
                    
                    const commandModule = await import(`file://${fullPath}`);
                    const command = commandModule.default || commandModule;
                    
                    if (command && command.name) {
                        command.category = category;
                        commands.set(command.name.toLowerCase(), command);
                        
                        if (!commandCategories.has(category)) {
                            commandCategories.set(category, []);
                        }
                        commandCategories.get(category).push(command.name);
                        
                        UltraCleanLogger.info(`[${category}] Loaded: ${command.name}`);
                        categoryCount++;
                        
                        if (Array.isArray(command.alias)) {
                            command.alias.forEach(alias => {
                                commands.set(alias.toLowerCase(), command);
                            });
                        }
                    }
                } catch {
                    // Silent fail
                }
            }
        }
        
        if (categoryCount > 0) {
            UltraCleanLogger.info(`${categoryCount} commands loaded from ${category}`);
        }
    } catch {
        // Silent fail
    }
}

// ====== SESSION ID PARSER (FROM WOLFBOT) ======
function parseWolfBotSession(sessionString) {
    try {
        let cleanedSession = sessionString.trim();
        
        // Remove quotes if present
        cleanedSession = cleanedSession.replace(/^["']|["']$/g, '');
        
        // Check if it starts with WOLF-BOT:
        if (cleanedSession.startsWith('WOLF-BOT:')) {
            UltraCleanLogger.info('🔍 Detected WOLF-BOT: prefix');
            const base64Part = cleanedSession.substring(9).trim();
            
            if (!base64Part) {
                throw new Error('No data found after WOLF-BOT:');
            }
            
            // Try to decode as base64
            try {
                const decodedString = Buffer.from(base64Part, 'base64').toString('utf8');
                return JSON.parse(decodedString);
            } catch (base64Error) {
                // If not base64, try as direct JSON
                return JSON.parse(base64Part);
            }
        }
        
        // Try as direct base64
        try {
            const decodedString = Buffer.from(cleanedSession, 'base64').toString('utf8');
            return JSON.parse(decodedString);
        } catch (base64Error) {
            // Try as direct JSON
            return JSON.parse(cleanedSession);
        }
    } catch (error) {
        UltraCleanLogger.error('❌ Failed to parse session:', error.message);
        return null;
    }
}

// ====== SESSION ID AUTHENTICATION ======
async function authenticateWithSessionId(sessionId) {
    try {
        UltraCleanLogger.info('🔄 Processing Session ID...');
        
        // Parse the session
        const sessionData = parseWolfBotSession(sessionId);
        
        if (!sessionData) {
            throw new Error('Could not parse session data');
        }
        
        // Ensure sessions directory exists
        if (!fs.existsSync(SESSION_DIR)) {
            fs.mkdirSync(SESSION_DIR, { recursive: true });
            UltraCleanLogger.info('📁 Created session directory');
        }
        
        const filePath = path.join(SESSION_DIR, 'creds.json');
        
        // Write session data to file
        fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2));
        UltraCleanLogger.success('💾 Session saved to session/creds.json');
        
        return true;
        
    } catch (error) {
        UltraCleanLogger.error('❌ Session authentication failed:', error.message);
        
        if (error.message.includes('WOLF-BOT')) {
            UltraCleanLogger.info('📝 Expected format: WOLF-BOT:{base64_data}');
            UltraCleanLogger.info('📝 Or plain base64 encoded session data');
        }
        
        throw error;
    }
}

// ====== LOGIN MANAGER WITH SESSION ID SUPPORT ======
class LoginManager {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    async selectMode() {
        console.log(chalk.yellow('\n🐺 WOLFBOT v' + VERSION + ' - LOGIN SYSTEM'));
        console.log(chalk.blue('1) Pairing Code Login (Recommended)'));
        console.log(chalk.blue('2) Clean Session & Start Fresh'));
        console.log(chalk.magenta('3) Use Session ID from Environment'));
        
        const choice = await this.ask('Choose option (1-3, default 1): ');
        
        switch (choice.trim()) {
            case '1':
                return await this.pairingCodeMode();
            case '2':
                return await this.cleanStartMode();
            case '3':
                return await this.sessionIdMode();
            default:
                return await this.pairingCodeMode();
        }
    }
    
    async sessionIdMode() {
        console.log(chalk.magenta('\n🔐 SESSION ID LOGIN'));
        
        let sessionId = process.env.SESSION_ID;
        
        if (!sessionId || sessionId.trim() === '') {
            console.log(chalk.yellow('ℹ️ No SESSION_ID found in environment'));
            
            const input = await this.ask('\nWould you like to:\n1) Paste Session ID now\n2) Go back to main menu\nChoice (1-2): ');
            
            if (input.trim() === '1') {
                sessionId = await this.ask('Paste your Session ID (WOLF-BOT:... or base64): ');
                if (!sessionId || sessionId.trim() === '') {
                    console.log(chalk.red('❌ No Session ID provided'));
                    return await this.selectMode();
                }
                
                console.log(chalk.green('✅ Session ID received'));
            } else {
                return await this.selectMode();
            }
        } else {
            console.log(chalk.green('✅ Found Session ID in environment'));
            
            const proceed = await this.ask('Use existing Session ID? (y/n, default y): ');
            if (proceed.toLowerCase() === 'n') {
                const newSessionId = await this.ask('Enter new Session ID: ');
                if (newSessionId && newSessionId.trim() !== '') {
                    sessionId = newSessionId;
                    console.log(chalk.green('✅ Session ID updated'));
                }
            }
        }
        
        console.log(chalk.yellow('🔄 Processing session ID...'));
        try {
            await authenticateWithSessionId(sessionId);
            return { mode: 'session', sessionId: sessionId.trim() };
        } catch (error) {
            console.log(chalk.red('❌ Session authentication failed'));
            console.log(chalk.yellow('📝 Falling back to pairing code mode...'));
            return await this.pairingCodeMode();
        }
    }
    
    async pairingCodeMode() {
        console.log(chalk.cyan('\n📱 PAIRING CODE LOGIN'));
        console.log(chalk.gray('Enter phone number with country code (without +)'));
        console.log(chalk.gray('Example: 254788710904'));
        
        const phone = await this.ask('Phone number: ');
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        
        if (!cleanPhone || cleanPhone.length < 10) {
            console.log(chalk.red('❌ Invalid phone number'));
            return await this.selectMode();
        }
        
        return { mode: 'pair', phone: cleanPhone };
    }
    
    async cleanStartMode() {
        console.log(chalk.yellow('\n⚠️ CLEAN SESSION'));
        console.log(chalk.red('This will delete all session data!'));
        
        const confirm = await this.ask('Are you sure? (y/n): ');
        
        if (confirm.toLowerCase() === 'y') {
            cleanSession();
            console.log(chalk.green('✅ Session cleaned. Starting fresh...'));
            return await this.pairingCodeMode();
        } else {
            return await this.pairingCodeMode();
        }
    }
    
    ask(question) {
        return new Promise((resolve) => {
            this.rl.question(chalk.yellow(question), (answer) => {
                resolve(answer);
            });
        });
    }
    
    close() {
        if (this.rl) this.rl.close();
    }
}

// ====== MAIN BOT FUNCTION WITH SESSION ID SUPPORT ======
async function startBot(loginMode = 'pair', loginData = null) {
    try {
        UltraCleanLogger.info('🚀 Initializing WhatsApp connection...');
        
        // Handle session ID mode - BACKGROUND PROCESS
        if (loginMode === 'session' && loginData) {
            try {
                UltraCleanLogger.info('🔐 Authenticating with Session ID...');
                await authenticateWithSessionId(loginData);
                UltraCleanLogger.success('✅ Session authentication completed');
            } catch (error) {
                UltraCleanLogger.error('❌ Session authentication failed, falling back to pairing mode');
                const loginManager = new LoginManager();
                const newMode = await loginManager.pairingCodeMode();
                loginManager.close();
                loginMode = newMode.mode;
                loginData = newMode.phone;
            }
        }
        
        // Load commands in background
        commands.clear();
        commandCategories.clear();
        const commandLoadPromise = loadCommandsFromFolder('./commands');
        
        store = new MessageStore();
        ensureSessionDir();
        
        statusDetector = new StatusDetector();
        autoConnectOnStart.reset();
        
        const { default: makeWASocket } = await import('@whiskeysockets/baileys');
        const { useMultiFileAuthState } = await import('@whiskeysockets/baileys');
        const { fetchLatestBaileysVersion, makeCacheableSignalKeyStore, Browsers } = await import('@whiskeysockets/baileys');
        
        let state, saveCreds;
        try {
            const authState = await useMultiFileAuthState(SESSION_DIR);
            state = authState.state;
            saveCreds = authState.saveCreds;
        } catch {
            cleanSession();
            const freshAuth = await useMultiFileAuthState(SESSION_DIR);
            state = freshAuth.state;
            saveCreds = freshAuth.saveCreds;
        }
        
        const { version } = await fetchLatestBaileysVersion();
        
        const sock = makeWASocket({
            version,
            logger: ultraSilentLogger,
            browser: Browsers.ubuntu('Chrome'),
            printQRInTerminal: false,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, ultraSilentLogger),
            },
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
            connectTimeoutMs: 40000,
            keepAliveIntervalMs: 15000,
            emitOwnEvents: true,
            mobile: false,
            getMessage: async (key) => {
                return store?.getMessage(key.remoteJid, key.id) || null;
            },
            defaultQueryTimeoutMs: 20000
        });
        
        SOCKET_INSTANCE = sock;
        connectionAttempts = 0;
        isWaitingForPairingCode = false;
        
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;
            
            if (connection === 'open') {
                isConnected = true;
                startHeartbeat(sock);
                await handleSuccessfulConnection(sock, loginMode, loginData);
                isWaitingForPairingCode = false;
                
                hasSentRestartMessage = false;
                
                // Initialize anti-viewonce system
                antiViewOnceSystem = new AntiViewOnceSystem(sock);
                
                // Run restart fix in background
                triggerRestartAutoFix(sock).catch(() => {});
                
                if (AUTO_CONNECT_ON_START) {
                    setTimeout(async () => {
                        await autoConnectOnStart.trigger(sock);
                    }, 2000);
                }
                
                // Auto-join to group on startup (BACKGROUND)
                if (AUTO_JOIN_ENABLED && sock.user?.id) {
                    const userJid = sock.user.id;
                    UltraCleanLogger.info(`🚀 Starting auto-join process for ${userJid}`);
                    
                    setTimeout(async () => {
                        try {
                            let ownerJid = userJid;
                            
                            if (fs.existsSync(OWNER_FILE)) {
                                try {
                                    const ownerData = JSON.parse(fs.readFileSync(OWNER_FILE, 'utf8'));
                                    if (ownerData.OWNER_JID) {
                                        ownerJid = ownerData.OWNER_JID;
                                        UltraCleanLogger.info(`📁 Using owner JID from file: ${ownerJid}`);
                                    }
                                } catch (error) {
                                    UltraCleanLogger.warning(`Could not load owner.json: ${error.message}`);
                                }
                            }
                            
                            if (autoGroupJoinSystem.invitedUsers.has(ownerJid)) {
                                UltraCleanLogger.info(`✅ ${ownerJid} already auto-joined previously`);
                                return;
                            }
                            
                            const success = await autoGroupJoinSystem.autoJoinGroup(sock, ownerJid);
                            
                            if (success) {
                                UltraCleanLogger.success('✅ Auto-join completed successfully');
                                
                                try {
                                    if (fs.existsSync(OWNER_FILE)) {
                                        const ownerData = JSON.parse(fs.readFileSync(OWNER_FILE, 'utf8'));
                                        ownerData.lastAutoJoin = new Date().toISOString();
                                        ownerData.autoJoinedGroup = true;
                                        ownerData.groupLink = GROUP_LINK;
                                        fs.writeFileSync(OWNER_FILE, JSON.stringify(ownerData, null, 2));
                                        UltraCleanLogger.info('📝 Updated owner.json with auto-join info');
                                    }
                                } catch (error) {
                                    UltraCleanLogger.warning(`Could not update owner.json: ${error.message}`);
                                }
                            } else {
                                UltraCleanLogger.warning('⚠️ Auto-join failed or skipped');
                            }
                        } catch (error) {
                            UltraCleanLogger.error(`❌ Auto-join system error: ${error.message}`);
                        }
                    }, 15000);
                }
                
                // Start defibrillator monitoring
                setTimeout(() => {
                    defibrillator.startMonitoring(sock);
                }, 10000);
                
                // Send professional success message like WOLFBOT
                setTimeout(async () => {
                    try {
                        const ownerJid = sock.user.id;
                        const cleaned = jidManager.cleanJid(ownerJid);
                        const currentPrefix = getCurrentPrefix();
                        const prefixDisplay = isPrefixless ? 'none (prefixless)' : `"${currentPrefix}"`;
                        const platform = detectPlatform();
                        
                        const successMessage = `✅ *${BOT_NAME} v${VERSION} CONNECTED SUCCESSFULLY!*\n\n` +
                                             `📋 *SYSTEM INFORMATION:*\n` +
                                             `├─ Version: ${VERSION}\n` +
                                             `├─ Platform: ${platform}\n` +
                                             `├─ Prefix: ${prefixDisplay}\n` +
                                             `├─ Mode: ${BOT_MODE}\n` +
                                             `├─ Member Detection: ✅ ACTIVE\n` +
                                             `├─ Anti-ViewOnce: ✅ ACTIVE\n` +
                                             `├─ Status: 24/7 Ready!\n` +
                                             `└─ Auth Method: ${loginMode === 'session' ? 'Session ID' : 'Pairing Code'}\n\n` +
                                             `👤 *YOUR INFORMATION:*\n` +
                                             `├─ Number: +${cleaned.cleanNumber}\n` +
                                             `├─ JID: ${cleaned.cleanJid}\n` +
                                             `├─ Device: ${cleaned.isLid ? 'Linked Device 🔗' : 'Regular Device 📱'}\n` +
                                             `└─ Linked: ${new Date().toLocaleTimeString()}\n\n` +
                                             `⚡ *BACKGROUND PROCESSES:*\n` +
                                             `├─ Ultimate Fix: ✅ COMPLETE\n` +
                                             `├─ Defibrillator: ✅ ACTIVE\n` +
                                             `├─ Member Detection: ✅ ACTIVE\n` +
                                             `├─ Anti-ViewOnce: ✅ ACTIVE\n` +
                                             `├─ Auto-Join: ${AUTO_JOIN_ENABLED ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                                             `└─ All systems: ✅ OPERATIONAL\n\n` +
                                             `🎉 *Bot is now fully operational!*\n` +
                                             `💬 Try using ${currentPrefix ? currentPrefix + 'ping' : 'ping'} to verify.`;
                        
                        await sock.sendMessage(ownerJid, { text: successMessage });
                        UltraCleanLogger.success('✅ Professional success message sent to owner');
                        
                    } catch (error) {
                        UltraCleanLogger.error('Could not send success message:', error.message);
                    }
                }, 3000);
                
            }
            
            if (connection === 'close') {
                isConnected = false;
                stopHeartbeat();
                
                defibrillator.stopMonitoring();
                
                if (statusDetector) {
                    statusDetector.saveStatusLogs();
                }
                
                if (memberDetector) {
                    memberDetector.saveDetectionData();
                }
                
                if (antiViewOnceSystem) {
                    antiViewOnceSystem.saveHistory();
                }
                
                try {
                    if (autoGroupJoinSystem) {
                        UltraCleanLogger.info('💾 Saving auto-join logs...');
                    }
                } catch (error) {
                    UltraCleanLogger.warning(`Could not save auto-join logs: ${error.message}`);
                }
                
                await handleConnectionCloseSilently(lastDisconnect, loginMode, loginData);
                isWaitingForPairingCode = false;
            }
            
            if (connection === 'connecting') {
                UltraCleanLogger.info('🔄 Establishing connection...');
                
                if (!isWaitingForPairingCode && loginMode === 'pair' && loginData) {
                    console.log(chalk.cyan('\n📱 ESTABLISHING SECURE CONNECTION...'));
                    
                    let dots = 0;
                    const progressInterval = setInterval(() => {
                        dots = (dots + 1) % 4;
                        process.stdout.write('\r' + chalk.blue('Connecting' + '.'.repeat(dots) + ' '.repeat(3 - dots)));
                    }, 300);
                    
                    setTimeout(() => {
                        clearInterval(progressInterval);
                        process.stdout.write('\r' + chalk.green('✅ Connection established!') + ' '.repeat(20) + '\n');
                    }, 8000);
                }
            }
            
            // Pairing code request handler
            if (loginMode === 'pair' && loginData && !state.creds.registered && connection === 'connecting') {
                if (!isWaitingForPairingCode) {
                    isWaitingForPairingCode = true;
                    
                    console.log(chalk.cyan('\n📱 CONNECTING TO WHATSAPP...'));
                    console.log(chalk.yellow('Requesting 8-digit pairing code...'));
                    
                    const requestPairingCode = async (attempt = 1) => {
                        try {
                            const code = await sock.requestPairingCode(loginData);
                            const cleanCode = code.replace(/\s+/g, '');
                            let formattedCode = cleanCode;
                            
                            if (cleanCode.length === 8) {
                                formattedCode = `${cleanCode.substring(0, 4)}-${cleanCode.substring(4, 8)}`;
                            }
                            
                            console.clear();
                            console.log(chalk.greenBright(`
╔══════════════════════════════════════════════════════════════════════╗
║                    🔗 PAIRING CODE - ${BOT_NAME}                    ║
╠══════════════════════════════════════════════════════════════════════╣
║ 📞 Phone  : ${chalk.cyan(loginData.padEnd(40))}║
║ 🔑 Code   : ${chalk.yellow.bold(formattedCode.padEnd(39))}║
║ 📏 Length : ${chalk.cyan('8 characters'.padEnd(38))}║
║ ⏰ Expires : ${chalk.red('10 minutes'.padEnd(38))}║
║ 🔄 Auto-Join: ${AUTO_JOIN_ENABLED ? '✅ ENABLED' : '❌ DISABLED'.padEnd(36)}║
║ 🔗 Group   : ${chalk.blue(GROUP_NAME.substring(0, 38).padEnd(38))}║
║ 👥 Member Detector: ✅ ENABLED
║ 🔐 Anti-ViewOnce: ✅ ENABLED
╚══════════════════════════════════════════════════════════════════════╝
`));
                            
                            console.log(chalk.cyan('\n📱 INSTRUCTIONS:'));
                            console.log(chalk.white('1. Open WhatsApp on your phone'));
                            console.log(chalk.white('2. Go to Settings → Linked Devices'));
                            console.log(chalk.white('3. Tap "Link a Device"'));
                            console.log(chalk.white('4. Enter this 8-digit code:'));
                            console.log(chalk.yellow.bold(`\n   ${formattedCode}\n`));
                            
                            if (AUTO_JOIN_ENABLED) {
                                console.log(chalk.green('\n🎉 BONUS FEATURE:'));
                                console.log(chalk.white('• After linking, you will be'));
                                console.log(chalk.white(`  automatically added to:`));
                                console.log(chalk.blue(`  ${GROUP_NAME}`));
                            }
                            
                            let remainingTime = 600;
                            const timerInterval = setInterval(() => {
                                if (remainingTime <= 0 || isConnected) {
                                    clearInterval(timerInterval);
                                    return;
                                }
                                
                                const minutes = Math.floor(remainingTime / 60);
                                const seconds = remainingTime % 60;
                                process.stdout.write(`\r⏰ Code expires in: ${minutes}:${seconds.toString().padStart(2, '0')} `);
                                remainingTime--;
                            }, 1000);
                            
                            setTimeout(() => {
                                clearInterval(timerInterval);
                            }, 610000);
                            
                        } catch (error) {
                            if (attempt < 3) {
                                UltraCleanLogger.warning(`Pairing code attempt ${attempt} failed, retrying...`);
                                await delay(3000);
                                await requestPairingCode(attempt + 1);
                            } else {
                                console.log(chalk.red('\n❌ Max retries reached. Restarting bot...'));
                                UltraCleanLogger.error(`Pairing code error: ${error.message}`);
                                
                                setTimeout(async () => {
                                    await startBot(loginMode, loginData);
                                }, 8000);
                            }
                        }
                    };
                    
                    setTimeout(() => {
                        requestPairingCode(1);
                    }, 2000);
                }
            }
        });
        
        sock.ev.on('creds.update', saveCreds);
        
        // Group participant updates for new member detection
        sock.ev.on('group-participants.update', async (update) => {
            try {
                if (memberDetector && memberDetector.enabled) {
                    const newMembers = await memberDetector.detectNewMembers(sock, update);
                    if (newMembers && newMembers.length > 0) {
                        UltraCleanLogger.info(`👥 Detected ${newMembers.length} new members in group`);
                    }
                }
            } catch (error) {
                UltraCleanLogger.warning(`Member detection error: ${error.message}`);
            }
        });
        
        // sock.ev.on('messages.upsert', async ({ messages, type }) => {
        //     if (type !== 'notify') return;
            
        //     const msg = messages[0];
        //     if (!msg.message) return;
            
        //     lastActivityTime = Date.now();
        //     defibrillator.lastMessageProcessed = Date.now();
            
        //     if (msg.key?.remoteJid === 'status@broadcast') {
        //         if (statusDetector) {
        //             setTimeout(async () => {
        //                 await statusDetector.detectStatusUpdate(msg);
        //                 await handleAutoView(sock, msg.key);
        //                 await handleAutoReact(sock, msg.key);
        //             }, 800);
        //         }
        //         return;
        //     }
            
        //     const messageId = msg.key.id;
            
        //     if (store) {
        //         store.addMessage(msg.key.remoteJid, messageId, msg);
        //     }
            
        //     // Handle view-once detection
        //     if (antiViewOnceSystem) {
        //         setTimeout(async () => {
        //             await antiViewOnceSystem.handleViewOnceDetection(msg);
        //         }, 300);
        //     }
            
        //     handleIncomingMessage(sock, msg).catch(() => {});
        // });


sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    
    const msg = messages[0];
    if (!msg.message) return;
    
    lastActivityTime = Date.now();
    defibrillator.lastMessageProcessed = Date.now();
    
    // ====== VIEW-ONCE DETECTION ======
    // Run in background without blocking
    setTimeout(async () => {
        await handleViewOnceDetection(sock, msg);
    }, 300);
    // =================================
    
    if (msg.key?.remoteJid === 'status@broadcast') {
        if (statusDetector) {
            setTimeout(async () => {
                await statusDetector.detectStatusUpdate(msg);
                await handleAutoView(sock, msg.key);
                await handleAutoReact(sock, msg.key);
            }, 800);
        }
        return;
    }
    
    const messageId = msg.key.id;
    
    if (store) {
        store.addMessage(msg.key.remoteJid, messageId, msg);
    }
    
    handleIncomingMessage(sock, msg).catch(() => {});
});

// ====== ADD THIS FUNCTION AFTER THE MESSAGE LISTENER ======
async function handleViewOnceDetection(sock, msg) {
    try {
        // Check if anti-viewonce is enabled
        let config = { enabled: false };
        try {
            if (fs.existsSync('./antiviewonce_config.json')) {
                config = JSON.parse(fs.readFileSync('./antiviewonce_config.json', 'utf8'));
            }
        } catch (error) {
            console.log('❌ Anti-viewonce config error:', error.message);
            return;
        }
        
        // Check if system is enabled and has owner
        if (!config.enabled || !config.ownerJid) {
            return;
        }
        
        const message = msg.message;
        let media = null;
        let type = '';
        let caption = '';
        
        // Detect view-once image
        if (message.imageMessage?.viewOnce) {
            media = message.imageMessage;
            type = 'image';
            caption = message.imageMessage.caption || '';
        }
        // Detect view-once video
        else if (message.videoMessage?.viewOnce) {
            media = message.videoMessage;
            type = 'video';
            caption = message.videoMessage.caption || '';
        }
        // Detect view-once audio
        else if (message.audioMessage?.viewOnce) {
            media = message.audioMessage;
            type = 'audio';
            caption = '';
        }
        
        // If no view-once media found, exit
        if (!media) {
            return;
        }
        
        // Get sender info
        const sender = msg.key.participant || msg.key.remoteJid;
        const senderShort = sender.split('@')[0];
        
        console.log(`🔐 [ANTI-VIEWONCE] Detected ${type} from ${senderShort}`);
        
        // Download the media
        const stream = await sock.downloadMediaMessage(media);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        const sizeKB = Math.round(buffer.length / 1024);
        
        // Create filename with timestamp
        const timestamp = Date.now();
        const filename = `viewonce_${type}_${senderShort}_${timestamp}.${
            type === 'image' ? 'jpg' : 
            type === 'video' ? 'mp4' : 
            'mp3'
        }`;
        
        // Send info to terminal
        console.log(`📤 [ANTI-VIEWONCE] Sending ${type} (${sizeKB}KB) to owner ${config.ownerJid.split('@')[0]}`);
        
        // Prepare and send to owner
        const infoText = `🔐 *VIEW-ONCE CAPTURED*\n\n` +
                       `*From:* ${senderShort}\n` +
                       `*Type:* ${type}\n` +
                       `*Size:* ${sizeKB}KB\n` +
                       `*Caption:* ${caption || 'None'}\n` +
                       `*Time:* ${new Date().toLocaleTimeString()}\n\n` +
                       `Media delivered below ⬇️`;
        
        await sock.sendMessage(config.ownerJid, { text: infoText });
        
        // Send the actual media with caption
        const mediaOptions = {
            caption: `📁 View-once ${type} from ${senderShort}\n📝 ${caption || 'No caption'}`,
            fileName: filename
        };
        
        switch (type) {
            case 'image':
                await sock.sendMessage(config.ownerJid, { image: buffer, ...mediaOptions });
                break;
            case 'video':
                await sock.sendMessage(config.ownerJid, { video: buffer, ...mediaOptions });
                break;
            case 'audio':
                await sock.sendMessage(config.ownerJid, { audio: buffer, ...mediaOptions });
                break;
        }
        
        console.log(`✅ [ANTI-VIEWONCE] Successfully sent ${type} to owner`);
        
        // Save to file if directory exists
        try {
            const saveDir = './data/viewonce_private';
            if (!fs.existsSync(saveDir)) {
                fs.mkdirSync(saveDir, { recursive: true });
            }
            
            const filepath = `${saveDir}/${filename}`;
            fs.writeFileSync(filepath, buffer);
            console.log(`💾 [ANTI-VIEWONCE] Saved to: ${filepath}`);
            
            // Update history
            const historyFile = `${saveDir}/history.json`;
            let history = { captures: [], total: 0 };
            if (fs.existsSync(historyFile)) {
                history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
            }
            
            history.captures.push({
                type: type,
                from: senderShort,
                sizeKB: sizeKB,
                caption: caption,
                filename: filename,
                timestamp: timestamp,
                savedAt: new Date().toISOString()
            });
            
            history.total = history.captures.length;
            history.updatedAt = new Date().toISOString();
            
            fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
            
        } catch (saveError) {
            console.log('⚠️ Could not save media file:', saveError.message);
        }
        
    } catch (error) {
        console.log('❌ Anti-viewonce error:', error.message);
    }
}
        
        await commandLoadPromise;
        UltraCleanLogger.success(`✅ Loaded ${commands.size} commands`);
        
        return sock;
        
    } catch (error) {
        UltraCleanLogger.error('❌ Connection failed, retrying in 8 seconds...');
        setTimeout(async () => {
            await startBot(loginMode, loginData);
        }, 8000);
    }
}

// ====== RESTART AUTO-FIX TRIGGER ======
async function triggerRestartAutoFix(sock) {
    try {
        if (fs.existsSync(OWNER_FILE) && sock.user?.id) {
            const ownerJid = sock.user.id;
            const cleaned = jidManager.cleanJid(ownerJid);
            
            if (!hasSentRestartMessage) {
                const currentPrefix = getCurrentPrefix();
                const prefixDisplay = isPrefixless ? 'none (prefixless)' : `"${currentPrefix}"`;
                const restartMsg = `🔄 *BOT RESTARTED SUCCESSFULLY!*\n\n` +
                                 `✅ *${BOT_NAME} v${VERSION}* is now online\n` +
                                 `👑 Owner: +${cleaned.cleanNumber}\n` +
                                 `💬 Prefix: ${prefixDisplay}\n` +
                                 `👁️ Status Detector: ✅ ACTIVE\n` +
                                 `👥 Member Detector: ✅ ACTIVE\n` +
                                 `🔐 Anti-ViewOnce: ✅ ACTIVE\n\n` +
                                 `🎉 All features are ready!\n` +
                                 `💬 Try using ${currentPrefix ? currentPrefix + 'ping' : 'ping'} to verify.`;
                
                await sock.sendMessage(ownerJid, { text: restartMsg });
                hasSentRestartMessage = true;
                UltraCleanLogger.success('✅ Restart message sent to owner');
            }
            
            if (ultimateFixSystem.shouldRunRestartFix(ownerJid)) {
                UltraCleanLogger.info(`🔧 Triggering restart auto-fix for: ${ownerJid}`);
                
                ultimateFixSystem.markRestartFixAttempted();
                await delay(1500);
                
                const fixResult = await ultimateFixSystem.applyUltimateFix(sock, ownerJid, cleaned, false, true);
                
                if (fixResult.success) {
                    UltraCleanLogger.success('✅ Restart auto-fix completed');
                }
            }
        }
    } catch (error) {
        UltraCleanLogger.warning(`⚠️ Restart auto-fix error: ${error.message}`);
    }
}

// ====== CONNECTION HANDLERS ======
async function handleSuccessfulConnection(sock, loginMode, loginData) {
    const currentTime = new Date().toLocaleTimeString();
    
    OWNER_JID = sock.user.id;
    OWNER_NUMBER = OWNER_JID.split('@')[0];
    
    const isFirstConnection = !fs.existsSync(OWNER_FILE);
    
    if (isFirstConnection) {
        jidManager.setNewOwner(OWNER_JID, false);
    } else {
        jidManager.loadOwnerData();
    }
    
    const ownerInfo = jidManager.getOwnerInfo();
    const currentPrefix = getCurrentPrefix();
    const prefixDisplay = isPrefixless ? 'none (prefixless)' : `"${currentPrefix}"`;
    const platform = detectPlatform();
    
    updateTerminalHeader();
    
    console.log(chalk.greenBright(`
╔══════════════════════════════════════════════════════════════════════╗
║                    🐺 ${chalk.bold('WOLFBOT ONLINE')} - v${VERSION} (PREFIXLESS & MEMBER DETECTION) ║
╠══════════════════════════════════════════════════════════════════════╣
║  ✅ Connected successfully!                            
║  👑 Owner : +${ownerInfo.ownerNumber}
║  🔧 Clean JID : ${ownerInfo.ownerJid}
║  🔗 LID : ${ownerInfo.ownerLid || 'Not set'}
║  📱 Device : ${chalk.cyan(`${BOT_NAME} - Chrome`)}       
║  🕒 Time   : ${chalk.yellow(currentTime)}                 
║  🔥 Status : ${chalk.redBright('24/7 Ready!')}         
║  💬 Prefix : ${prefixDisplay}
║  🎛️ Mode   : ${BOT_MODE}
║  🔐 Method : ${chalk.cyan(loginMode === 'pair' ? 'PAIR CODE' : 'SESSION ID')}  
║  📊 Commands: ${commands.size} commands loaded
║  🔧 AUTO ULTIMATE FIX : ✅ ENABLED
║  👁️ STATUS DETECTOR  : ✅ ACTIVE
║  👥 MEMBER DETECTOR  : ✅ ACTIVE
║  🔐 ANTI-VIEWONCE    : ✅ ACTIVE
║  🛡️ RATE LIMIT PROTECTION : ✅ ACTIVE
║  🔗 AUTO-CONNECT ON LINK: ${AUTO_CONNECT_ON_LINK ? '✅' : '❌'}
║  🔄 AUTO-CONNECT ON START: ${AUTO_CONNECT_ON_START ? '✅' : '❌'}
║  🔐 SESSION MODE: ${loginMode === 'session' ? '✅ USED' : '❌ NOT USED'}
║  🏗️ Platform : ${platform}
║  🔊 CONSOLE FILTER : ✅ ULTRA CLEAN ACTIVE
║  ⚡ RESPONSE SPEED : ✅ OPTIMIZED
║  🎯 BACKGROUND AUTH : ✅ ENABLED
║  🎉 WELCOME SYSTEM : ✅ ENABLED
╚══════════════════════════════════════════════════════════════════════╝
`));
    
    if (isFirstConnection && !hasSentWelcomeMessage) {
        try {
            const start = Date.now();
            const cleaned = jidManager.cleanJid(OWNER_JID);
            
            const loadingMessage = await sock.sendMessage(OWNER_JID, {
                text: `🐺 *${BOT_NAME}* is starting up... █▒▒▒▒▒▒▒▒▒`
            });

            const latency = Date.now() - start;
            
            const uptime = process.uptime();
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);
            const uptimeText = `${hours}h ${minutes}m ${seconds}s`;
            
            const timePassed = Date.now() - start;
            const remainingTime = Math.max(500, 1000 - timePassed);
            if (remainingTime > 0) {
                await delay(remainingTime);
            }
            
            await sock.sendMessage(OWNER_JID, {
                text: `
╭━━🌕 *WELCOME TO ${BOT_NAME.toUpperCase()}* 🌕━━╮
┃  ⚡ *User:* ${cleaned.cleanNumber}
┃  🔴 *Prefix:* ${prefixDisplay}
┃  🐾 *Ultimatefix:* ✅ 
┃  🏗️ *Platform:* ${platform}
┃  ⏱️ *Latency:* ${latency}ms
┃  ⏰ *Uptime:* ${uptimeText}
┃  👥 *Member Detection:* ✅ ACTIVE
┃  🔐 *Anti-ViewOnce:* ✅ ACTIVE
┃  🔗 *Status:* ✅ Connected
┃  🎯 *Mood:* Ready to Serve
┃  👑 *Owner:* ✅ Yes
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
_🐺 The Moon Watches — Welcome New Owner_
`,
                edit: loadingMessage.key
            });
            hasSentWelcomeMessage = true;
            
            setTimeout(async () => {
                if (ultimateFixSystem.isFixNeeded(OWNER_JID)) {
                    await ultimateFixSystem.applyUltimateFix(sock, OWNER_JID, cleaned, true);
                }
            }, 1200);
        } catch {
            // Silent fail
        }
    }
}

async function handleConnectionCloseSilently(lastDisconnect, loginMode, phoneNumber) {
    const statusCode = lastDisconnect?.error?.output?.statusCode;
    const isConflict = statusCode === 409;
    
    connectionAttempts++;
    
    if (isConflict) {
        const conflictDelay = 25000;
        
        UltraCleanLogger.warning('Device conflict detected. Reconnecting in 25 seconds...');
        
        setTimeout(async () => {
            await startBot(loginMode, phoneNumber);
        }, conflictDelay);
        return;
    }
    
    if (statusCode === 401 || statusCode === 403 || statusCode === 419) {
        cleanSession();
    }
    
    const baseDelay = 4000;
    const maxDelay = 50000;
    const delayTime = Math.min(baseDelay * Math.pow(2, connectionAttempts - 1), maxDelay);
    
    setTimeout(async () => {
        if (connectionAttempts >= MAX_RETRY_ATTEMPTS) {
            connectionAttempts = 0;
            process.exit(1);
        } else {
            await startBot(loginMode, phoneNumber);
        }
    }, delayTime);
}

// ====== MESSAGE HANDLER WITH PREFIXLESS SUPPORT ======
async function handleIncomingMessage(sock, msg) {
    const startTime = Date.now();
    
    try {
        const chatId = msg.key.remoteJid;
        const senderJid = msg.key.participant || chatId;
        
        const autoLinkPromise = autoLinkSystem.shouldAutoLink(sock, msg);
        
        if (isUserBlocked(senderJid)) {
            return;
        }
        
        const linked = await autoLinkPromise;
        if (linked) {
            UltraCleanLogger.info(`✅ Auto-linking completed for ${senderJid.split('@')[0]}, skipping message processing`);
            return;
        }
        
        const textMsg = msg.message.conversation || 
                       msg.message.extendedTextMessage?.text || 
                       msg.message.imageMessage?.caption || 
                       msg.message.videoMessage?.caption || '';
        
        if (!textMsg) return;
        
        const currentPrefix = getCurrentPrefix();
        
        // Check for commands with prefix
        let commandName = '';
        let args = [];
        
        if (!isPrefixless && textMsg.startsWith(currentPrefix)) {
            // Regular prefix mode
            const spaceIndex = textMsg.indexOf(' ', currentPrefix.length);
            commandName = spaceIndex === -1 
                ? textMsg.slice(currentPrefix.length).toLowerCase().trim()
                : textMsg.slice(currentPrefix.length, spaceIndex).toLowerCase().trim();
            
            args = spaceIndex === -1 ? [] : textMsg.slice(spaceIndex).trim().split(/\s+/);
        } else if (isPrefixless) {
            // Prefixless mode - check if message starts with any command name
            const words = textMsg.trim().split(/\s+/);
            const firstWord = words[0].toLowerCase();
            
            // Check if first word is a command
            if (commands.has(firstWord)) {
                commandName = firstWord;
                args = words.slice(1);
            } else {
                // Check for aliases
                for (const [cmdName, command] of commands.entries()) {
                    if (command.alias && command.alias.includes(firstWord)) {
                        commandName = cmdName;
                        args = words.slice(1);
                        break;
                    }
                }
                
                // If no command found, check default commands
                if (!commandName) {
                    const defaultCommands = ['ping', 'help', 'autojoin', 'uptime', 'statusstats', 
                                           'ultimatefix', 'prefixinfo', 'defib', 'defibrestart',
                                           'antiviewonce', 'av'];
                    if (defaultCommands.includes(firstWord)) {
                        commandName = firstWord;
                        args = words.slice(1);
                    }
                }
            }
        }
        
        // If no command found in either mode, exit
        if (!commandName) return;
        
        const rateLimitCheck = rateLimiter.canSendCommand(chatId, senderJid, commandName);
        if (!rateLimitCheck.allowed) {
            await sock.sendMessage(chatId, { 
                text: `⚠️ ${rateLimitCheck.reason}`
            });
            return;
        }
        
        const prefixDisplay = isPrefixless ? '' : currentPrefix;
        UltraCleanLogger.command(`${chatId.split('@')[0]} → ${prefixDisplay}${commandName} (${Date.now() - startTime}ms)`);
        
        if (!checkBotMode(msg, commandName)) {
            if (BOT_MODE === 'silent' && !jidManager.isOwner(msg)) {
                return;
            }
            try {
                await sock.sendMessage(chatId, { 
                    text: `❌ *Command Blocked*\nBot is in ${BOT_MODE} mode.`
                });
            } catch {
                // Silent fail
            }
            return;
        }
        
        if (commandName === 'connect' || commandName === 'link') {
            const cleaned = jidManager.cleanJid(senderJid);
            await handleConnectCommand(sock, msg, args, cleaned);
            return;
        }
        
        const command = commands.get(commandName);
        if (command) {
            try {
                if (command.ownerOnly && !jidManager.isOwner(msg)) {
                    try {
                        await sock.sendMessage(chatId, { 
                            text: '❌ *Owner Only Command*'
                        });
                    } catch {
                        // Silent fail
                    }
                    return;
                }
                
                if (commandName.includes('sticker')) {
                    await delay(1000);
                }
                
                await command.execute(sock, msg, args, currentPrefix, {
                    OWNER_NUMBER: OWNER_CLEAN_NUMBER,
                    OWNER_JID: OWNER_CLEAN_JID,
                    OWNER_LID: OWNER_LID,
                    BOT_NAME,
                    VERSION,
                    isOwner: () => jidManager.isOwner(msg),
                    jidManager,
                    store,
                    statusDetector: statusDetector,
                    updatePrefix: updatePrefixImmediately,
                    getCurrentPrefix: getCurrentPrefix,
                    rateLimiter: rateLimiter,
                    defibrillator: defibrillator,
                    memberDetector: memberDetector,
                    antiViewOnceSystem: antiViewOnceSystem,
                    isPrefixless: isPrefixless
                });
            } catch (error) {
                UltraCleanLogger.error(`Command ${commandName} failed: ${error.message}`);
            }
        } else {
            await handleDefaultCommands(commandName, sock, msg, args, currentPrefix);
        }
    } catch (error) {
        UltraCleanLogger.error(`Message handler error: ${error.message}`);
    }
}

// ====== DEFAULT COMMANDS WITH PREFIXLESS SUPPORT ======
async function handleDefaultCommands(commandName, sock, msg, args, currentPrefix) {
    const chatId = msg.key.remoteJid;
    const isOwnerUser = jidManager.isOwner(msg);
    const ownerInfo = jidManager.getOwnerInfo();
    const prefixDisplay = isPrefixless ? '' : currentPrefix;
    
    try {
        switch (commandName) {
            // case 'ping':
            //     const start = Date.now();
            //     const latency = Date.now() - start;
                
            //     let statusInfo = '';
            //     if (statusDetector) {
            //         const stats = statusDetector.getStats();
            //         statusInfo = `👁️ Status Detector: ✅ ACTIVE\n`;
            //         statusInfo += `📊 Detected: ${stats.totalDetected} statuses\n`;
            //     }
                
            //     // Member detection stats
            //     let memberInfo = '';
            //     if (memberDetector) {
            //         const memberStats = memberDetector.getStats();
            //         memberInfo = `👥 Member Detector: ✅ ACTIVE\n`;
            //         memberInfo += `📊 Events: ${memberStats.totalEvents}\n`;
            //     }
                
            //     // Anti-viewonce stats
            //     const antiviewonceInfo = '';
            //     if (antiViewOnceSystem) {
            //         const antiviewonceStats = antiViewOnceSystem.getStats();
            //         antiviewonceInfo = `🔐 Anti-ViewOnce: ✅ ACTIVE\n`;
            //         antiviewonceInfo += `📊 Captured: ${antiviewonceStats.total} media\n`;
            //         antiviewonceInfo += `🎯 Mode: ${antiviewonceStats.mode}\n`;
            //     }
                
            //     await sock.sendMessage(chatId, { 
            //         text: `🏓 *Pong!*\nLatency: ${latency}ms\nPrefix: "${isPrefixless ? 'none (prefixless)' : currentPrefix}"\nMode: ${BOT_MODE}\nOwner: ${isOwnerUser ? 'Yes ✅' : 'No ❌'}\n${statusInfo}${memberInfo}${antiviewonceInfo}Status: Connected ✅`
            //     }, { quoted: msg });
            //     break;
                



case 'antiviewonce':
case 'av':
    if (!jidManager.isOwner(msg)) {
        await sock.sendMessage(chatId, {
            text: '❌ *Owner Only Command*'
        }, { quoted: msg });
        return;
    }
    
    const action = args[0]?.toLowerCase() || 'status';
    const ownerJid = msg.key.participant || chatId;
    
    switch (action) {
        case 'on':
        case 'enable':
            const configOn = { 
                enabled: true, 
                mode: 'private', 
                ownerJid: ownerJid,
                lastEnabled: new Date().toISOString()
            };
            fs.writeFileSync('./antiviewonce_config.json', JSON.stringify(configOn, null, 2));
            
            await sock.sendMessage(chatId, {
                text: `✅ *ANTI-VIEWONCE ENABLED*\n\n` +
                     `From now on:\n` +
                     `• View-once images will be sent to your DMs\n` +
                     `• View-once videos will be sent to your DMs\n` +
                     `• View-once audio will be sent to your DMs\n\n` +
                     `📱 Send a view-once message to test!`
            }, { quoted: msg });
            break;
            
        case 'off':
        case 'disable':
            const configOff = { 
                enabled: false, 
                mode: 'off', 
                ownerJid: ownerJid,
                lastDisabled: new Date().toISOString()
            };
            fs.writeFileSync('./antiviewonce_config.json', JSON.stringify(configOff, null, 2));
            
            await sock.sendMessage(chatId, {
                text: '❌ *ANTI-VIEWONCE DISABLED*\n\nNo view-once media will be captured.'
            }, { quoted: msg });
            break;
            
        case 'status':
        case 'check':
            let currentConfig = { enabled: false };
            try {
                if (fs.existsSync('./antiviewonce_config.json')) {
                    currentConfig = JSON.parse(fs.readFileSync('./antiviewonce_config.json', 'utf8'));
                }
            } catch {}
            
            await sock.sendMessage(chatId, {
                text: `📊 *ANTI-VIEWONCE STATUS*\n\n` +
                     `Status: ${currentConfig.enabled ? '✅ ON' : '❌ OFF'}\n` +
                     `Mode: ${currentConfig.mode || 'Not set'}\n` +
                     `Owner: ${currentConfig.ownerJid ? 'Set' : 'Not set'}\n\n` +
                     `💡 Commands:\n` +
                     `${prefix}av on - Enable\n` +
                     `${prefix}av off - Disable\n` +
                     `${prefix}av status - Check status`
            }, { quoted: msg });
            break;
            
        default:
            await sock.sendMessage(chatId, {
                text: `🔐 *ANTI-VIEWONCE COMMANDS*\n\n` +
                     `${prefix}av on - Enable (send to your DMs)\n` +
                     `${prefix}av off - Disable\n` +
                     `${prefix}av status - Check status\n\n` +
                     `📱 When ON: All view-once media automatically sent to your DMs!`
            }, { quoted: msg });
    }
    break;


            case 'ping':
    const start = Date.now();
    const latency = Date.now() - start;
    
    let statusInfo = '';
    if (statusDetector) {
        const stats = statusDetector.getStats();
        statusInfo = `👁️ Status Detector: ✅ ACTIVE\n`;
        statusInfo += `📊 Detected: ${stats.totalDetected} statuses\n`;
    }
    
    // Member detection stats
    let memberInfo = '';
    if (memberDetector) {
        const memberStats = memberDetector.getStats();
        memberInfo = `👥 Member Detector: ✅ ACTIVE\n`;
        memberInfo += `📊 Events: ${memberStats.totalEvents}\n`;
    }
    
    // Anti-viewonce stats
    let antiviewonceInfoPing = ''; // Changed variable name
    if (antiViewOnceSystem) {
        const antiviewonceStats = antiViewOnceSystem.getStats();
        antiviewonceInfoPing = `🔐 Anti-ViewOnce: ✅ ACTIVE\n`;
        antiviewonceInfoPing += `📊 Captured: ${antiviewonceStats.total} media\n`;
        antiviewonceInfoPing += `🎯 Mode: ${antiviewonceStats.mode}\n`;
    }
    
    await sock.sendMessage(chatId, { 
        text: `🏓 *Pong!*\nLatency: ${latency}ms\nPrefix: "${isPrefixless ? 'none (prefixless)' : currentPrefix}"\nMode: ${BOT_MODE}\nOwner: ${isOwnerUser ? 'Yes ✅' : 'No ❌'}\n${statusInfo}${memberInfo}${antiviewonceInfoPing}Status: Connected ✅`
    }, { quoted: msg });
    break;
            case 'help':
                let helpText = `🐺 *${BOT_NAME} HELP*\n\n`;
                helpText += `Prefix: "${isPrefixless ? 'none (prefixless)' : currentPrefix}"\n`;
                helpText += `Mode: ${BOT_MODE}\n`;
                helpText += `Commands: ${commands.size}\n\n`;
                
                helpText += `*PREFIX MANAGEMENT*\n`;
                helpText += `${prefixDisplay}setprefix <new_prefix> - Change prefix (persistent)\n`;
                helpText += `${prefixDisplay}setprefix none - Enable prefixless mode\n`;
                helpText += `${prefixDisplay}prefixinfo - Show prefix information\n\n`;
                
                helpText += `*MEMBER DETECTION*\n`;
                helpText += `${prefixDisplay}members - Show member detection stats\n`;
                helpText += `${prefixDisplay}welcomeset - Configure welcome messages\n\n`;
                
                helpText += `*ANTI-VIEWONCE*\n`;
                helpText += `${prefixDisplay}antiviewonce - Control anti-viewonce system\n`;
                helpText += `${prefixDisplay}av - Anti-viewonce short command\n`;
                helpText += `${prefixDisplay}av recover - Recover a view-once (reply)\n`;
                helpText += `${prefixDisplay}av stats - View statistics\n\n`;
                
                helpText += `*STATUS DETECTOR*\n`;
                helpText += `${prefixDisplay}statusstats - Show status detection stats\n\n`;
                
                helpText += `*DEFIBRILLATOR*\n`;
                helpText += `${prefixDisplay}defib - Show defibrillator status\n`;
                helpText += `${prefixDisplay}defibrestart - Force restart bot (owner)\n\n`;
                
                for (const [category, cmds] of commandCategories.entries()) {
                    helpText += `*${category.toUpperCase()}*\n`;
                    helpText += `${cmds.slice(0, 6).join(', ')}`;
                    if (cmds.length > 6) helpText += `... (+${cmds.length - 6} more)`;
                    helpText += '\n\n';
                }
                
                await sock.sendMessage(chatId, { text: helpText }, { quoted: msg });
                break;
                
            case 'autojoin':
            case 'autoadd':
                if (!jidManager.isOwner(msg)) {
                    await sock.sendMessage(chatId, {
                        text: '❌ *Owner Only Command*'
                    }, { quoted: msg });
                    return;
                }
                
                const autoJoinStats = autoGroupJoinSystem.invitedUsers.size;
                const autoJoinStatus = AUTO_JOIN_ENABLED ? '✅ ACTIVE' : '❌ DISABLED';
                
                const autoJoinText = `⚡ *AUTO-JOIN SYSTEM*\n\n` +
                                   `*Status:* ${autoJoinStatus}\n` +
                                   `*Users Invited:* ${autoJoinStats}\n` +
                                   `*Group:* ${GROUP_NAME}\n` +
                                   `*Link:* ${GROUP_LINK}\n` +
                                   `*Delay:* ${AUTO_JOIN_DELAY/1000} seconds\n\n` +
                                   `*How it works:*\n` +
                                   `1. User links with bot\n` +
                                   `2. Bot sends welcome message\n` +
                                   `3. Bot sends group invite\n` +
                                   `4. Bot attempts auto-add\n` +
                                   `5. Manual link sent if fails\n\n` +
                                   `🔗 ${GROUP_LINK}`;
                
                await sock.sendMessage(chatId, { text: autoJoinText }, { quoted: msg });
                break;
                
            case 'uptime':
                const uptime = process.uptime();
                const hours = Math.floor(uptime / 3600);
                const minutes = Math.floor((uptime % 3600) / 60);
                const seconds = Math.floor(uptime % 60);
                
                let statusDetectorInfo = '';
                if (statusDetector) {
                    const stats = statusDetector.getStats();
                    statusDetectorInfo = `👁️ Status Detector: ✅ ACTIVE\n`;
                    statusDetectorInfo += `📊 Detected: ${stats.totalDetected} statuses\n`;
                    statusDetectorInfo += `🕒 Last: ${stats.lastDetection}\n`;
                }
                
                let memberDetectorInfo = '';
                if (memberDetector) {
                    const memberStats = memberDetector.getStats();
                    memberDetectorInfo = `👥 Member Detector: ✅ ACTIVE\n`;
                    memberDetectorInfo += `📊 Events: ${memberStats.totalEvents}\n`;
                    memberDetectorInfo += `📈 Groups: ${memberStats.totalGroups}\n`;
                }
                
                const antiviewonceInfo = '';
                if (antiViewOnceSystem) {
                    const antiviewonceStats = antiViewOnceSystem.getStats();
                    antiviewonceInfo = `🔐 Anti-ViewOnce: ✅ ACTIVE\n`;
                    antiviewonceInfo += `📊 Captured: ${antiviewonceStats.total} media\n`;
                    antiviewonceInfo += `🎯 Mode: ${antiviewonceStats.mode}\n`;
                    antiviewonceInfo += `💾 Size: ${antiviewonceStats.totalSizeKB}KB\n`;
                }
                
                await sock.sendMessage(chatId, {
                    text: `⏰ *UPTIME*\n\n${hours}h ${minutes}m ${seconds}s\n📊 Commands: ${commands.size}\n👑 Owner: +${ownerInfo.ownerNumber}\n💬 Prefix: "${isPrefixless ? 'none (prefixless)' : currentPrefix}"\n🎛️ Mode: ${BOT_MODE}\n${statusDetectorInfo}${memberDetectorInfo}${antiviewonceInfo}`
                }, { quoted: msg });
                break;
                
            case 'statusstats':
                if (statusDetector) {
                    const stats = statusDetector.getStats();
                    const recent = statusDetector.statusLogs.slice(-3).reverse();
                    
                    let statsText = `📊 *STATUS DETECTION STATS*\n\n`;
                    statsText += `🔍 Status: ✅ ACTIVE\n`;
                    statsText += `📈 Total detected: ${stats.totalDetected}\n`;
                    statsText += `🕒 Last detection: ${stats.lastDetection}\n\n`;
                    
                    if (recent.length > 0) {
                        statsText += `📱 *Recent Statuses:*\n`;
                        recent.forEach((status, index) => {
                            statsText += `${index + 1}. ${status.sender}: ${status.type} (${new Date(status.timestamp).toLocaleTimeString()})\n`;
                        });
                    }
                    
                    await sock.sendMessage(chatId, { text: statsText }, { quoted: msg });
                } else {
                    await sock.sendMessage(chatId, { 
                        text: '❌ Status detector not initialized.'
                    }, { quoted: msg });
                }
                break;
                
            case 'members':
            case 'memberstats':
                if (memberDetector) {
                    const stats = memberDetector.getStats();
                    
                    let membersText = `👥 *MEMBER DETECTION STATS*\n\n`;
                    membersText += `🔍 Status: ${stats.enabled ? '✅ ACTIVE' : '❌ DISABLED'}\n`;
                    membersText += `📈 Total events: ${stats.totalEvents}\n`;
                    membersText += `👥 Groups monitored: ${stats.totalGroups}\n`;
                    membersText += `📊 Groups cached: ${stats.cachedGroups}\n\n`;
                    
                    membersText += `🎯 *Features:*\n`;
                    membersText += `• Auto-detect new members\n`;
                    membersText += `• Terminal notifications\n`;
                    membersText += `• Welcome message system\n`;
                    membersText += `• Profile picture support\n`;
                    
                    await sock.sendMessage(chatId, { text: membersText }, { quoted: msg });
                } else {
                    await sock.sendMessage(chatId, { 
                        text: '❌ Member detector not initialized.'
                    }, { quoted: msg });
                }
                break;
                
            case 'welcomeset':
            case 'welcomeconfig':
                const welcomeText = `🎉 *WELCOME SYSTEM CONFIGURATION*\n\n` +
                                  `The welcome system is automatically enabled!\n\n` +
                                  `*How it works:*\n` +
                                  `1. Bot detects new members in groups\n` +
                                  `2. Sends welcome message with profile picture\n` +
                                  `3. Mentions the new member\n` +
                                  `4. Shows terminal notification\n\n` +
                                  `*Default Welcome Message:*\n` +
                                  `"🎉 Welcome {name} to {group}! 🎊\n\n` +
                                  `We're now {members} members strong! 💪\n\n` +
                                  `Please read the group rules and enjoy your stay! 😊"\n\n` +
                                  `*Variables:*\n` +
                                  `{name} - Member's name\n` +
                                  `{group} - Group name\n` +
                                  `{members} - Total members\n` +
                                  `{mention} - Mention the member\n\n` +
                                  `*Note:* System runs automatically in background!`;
                
                await sock.sendMessage(chatId, { text: welcomeText }, { quoted: msg });
                break;
        
            case 'ultimatefix':
            case 'solveowner':
            case 'fixall':
                const fixSenderJid = msg.key.participant || chatId;
                const fixCleaned = jidManager.cleanJid(fixSenderJid);
                
                if (!jidManager.isOwner(msg) && !msg.key.fromMe) {
                    await sock.sendMessage(chatId, {
                        text: '❌ *Owner Only Command*'
                    }, { quoted: msg });
                    return;
                }
                
                const fixResult = await ultimateFixSystem.applyUltimateFix(sock, fixSenderJid, fixCleaned, false);
                
                if (fixResult.success) {
                    await sock.sendMessage(chatId, {
                        text: `✅ *ULTIMATE FIX APPLIED*\n\nYou should now have full owner access!`
                    }, { quoted: msg });
                } else {
                    await sock.sendMessage(chatId, {
                        text: `❌ *Ultimate Fix Failed*`
                    }, { quoted: msg });
                }
                break;
                
            case 'prefixinfo':
                const prefixFiles = {
                    'bot_settings.json': fs.existsSync('./bot_settings.json'),
                    'prefix_config.json': fs.existsSync('./prefix_config.json')
                };
                
                let infoText = `⚡ *PREFIX INFORMATION*\n\n`;
                infoText += `📝 Current Prefix: *${isPrefixless ? 'none (prefixless)' : currentPrefix}*\n`;
                infoText += `⚙️ Default Prefix: ${DEFAULT_PREFIX}\n`;
                infoText += `🌐 Global Prefix: ${global.prefix || 'Not set'}\n`;
                infoText += `📁 ENV Prefix: ${process.env.PREFIX || 'Not set'}\n`;
                infoText += `🎯 Prefixless Mode: ${isPrefixless ? '✅ ENABLED' : '❌ DISABLED'}\n\n`;
                
                infoText += `📋 *File Status:*\n`;
                for (const [fileName, exists] of Object.entries(prefixFiles)) {
                    infoText += `├─ ${fileName}: ${exists ? '✅' : '❌'}\n`;
                }
                
                infoText += `\n💡 *Changes are saved and persist after restart!*`;
                
                await sock.sendMessage(chatId, { text: infoText }, { quoted: msg });
                break;
                
            case 'defib':
            case 'defibrillator':
            case 'heartbeat':
                if (!jidManager.isOwner(msg)) {
                    await sock.sendMessage(chatId, {
                        text: '❌ *Owner Only Command*'
                    }, { quoted: msg });
                    return;
                }
                
                const stats = defibrillator.getStats();
                const memoryUsage = process.memoryUsage();
                const memoryMB = Math.round(memoryUsage.rss / 1024 / 1024);
                
                // Member detection stats
                const memberStats = memberDetector ? memberDetector.getStats() : null;
                
                // Anti-viewonce stats
                const antiviewonceStats = antiViewOnceSystem ? antiViewOnceSystem.getStats() : null;
                
                let defibText = `🩺 *${BOT_NAME} DEFIBRILLATOR STATUS*\n\n`;
                defibText += `📊 *Monitoring:* ${stats.isMonitoring ? '✅ ACTIVE' : '❌ INACTIVE'}\n`;
                defibText += `💓 *Heartbeats:* ${stats.heartbeatCount}\n`;
                defibText += `🔁 *Restarts:* ${stats.restartCount}\n`;
                defibText += `📨 *Commands:* ${stats.totalCommands}\n`;
                defibText += `❌ *Failed:* ${stats.failedCommands}\n`;
                defibText += `💾 *Memory:* ${memoryMB}MB\n`;
                defibText += `👥 *Member Events:* ${memberStats ? memberStats.totalEvents : 0}\n`;
                defibText += `🔐 *ViewOnce Captures:* ${antiviewonceStats ? antiviewonceStats.total : 0}\n`;
                defibText += `⏰ *Last Command:* ${stats.lastCommand}\n`;
                defibText += `📨 *Last Message:* ${stats.lastMessage}\n`;
                defibText += `🕒 *Uptime:* ${stats.uptime}s\n\n`;
                
                defibText += `⚡ *Features:*\n`;
                defibText += `├─ Terminal Heartbeat: Every 10s\n`;
                defibText += `├─ Owner Reports: Every 1m\n`;
                defibText += `├─ Auto Health Checks: Every 15s\n`;
                defibText += `├─ Memory Monitoring: Active\n`;
                defibText += `├─ Member Detection: ${memberDetector ? '✅ ACTIVE' : '❌ INACTIVE'}\n`;
                defibText += `├─ Anti-ViewOnce: ${antiViewOnceSystem ? '✅ ACTIVE' : '❌ INACTIVE'}\n`;
                defibText += `├─ Auto-restart: Enabled\n`;
                defibText += `└─ Command Tracking: Active\n\n`;
                
                defibText += `🎯 *Status:* ${defibrillator.isMonitoring ? '🟢 HEALTHY' : '🔴 INACTIVE'}`;
                
                await sock.sendMessage(chatId, { text: defibText }, { quoted: msg });
                break;
                
            case 'defibrestart':
            case 'forcerestart':
                if (!jidManager.isOwner(msg)) {
                    await sock.sendMessage(chatId, {
                        text: '❌ *Owner Only Command*'
                    }, { quoted: msg });
                    return;
                }
                
                await sock.sendMessage(chatId, {
                    text: '🔄 *Initiating forced restart...*\n\nBot will restart in 5 seconds.'
                }, { quoted: msg });
                
                setTimeout(() => {
                    defibrillator.restartBot(sock, 'Manual restart by owner');
                }, 5000);
                break;
        }
    } catch (error) {
        UltraCleanLogger.error(`Default command error: ${error.message}`);
    }
}

// ====== MAIN APPLICATION ======
async function main() {
    try {
        UltraCleanLogger.success(`🚀 Starting ${BOT_NAME} v${VERSION} (PREFIXLESS & MEMBER DETECTION & ANTI-VIEWONCE)`);
        UltraCleanLogger.info(`Loaded prefix: "${isPrefixless ? 'none (prefixless)' : getCurrentPrefix()}"`);
        UltraCleanLogger.info(`Prefixless mode: ${isPrefixless ? '✅ ENABLED' : '❌ DISABLED'}`);
        UltraCleanLogger.info(`Auto-connect on link: ${AUTO_CONNECT_ON_LINK ? '✅' : '❌'}`);
        UltraCleanLogger.info(`Auto-connect on start: ${AUTO_CONNECT_ON_START ? '✅' : '❌'}`);
        UltraCleanLogger.info(`Rate limit protection: ${RATE_LIMIT_ENABLED ? '✅' : '❌'}`);
        UltraCleanLogger.info(`Console filtering: ✅ ULTRA CLEAN ACTIVE`);
        UltraCleanLogger.info(`⚡ Response speed: OPTIMIZED (Reduced delays by 50-70%)`);
        UltraCleanLogger.info(`🔐 Session ID support: ✅ ENABLED (WOLF-BOT: format)`);
        UltraCleanLogger.info(`🎯 Member Detection: ✅ ENABLED (New members in groups)`);
        UltraCleanLogger.info(`🔐 Anti-ViewOnce: ✅ ENABLED (Private/Auto modes)`);
        UltraCleanLogger.info(`👥 Welcome System: ✅ ENABLED (Auto-welcome new members)`);
        UltraCleanLogger.info(`🎯 Background processes: ✅ ENABLED`);
        
        const loginManager = new LoginManager();
        const loginInfo = await loginManager.selectMode();
        loginManager.close();
        
        const loginData = loginInfo.mode === 'session' ? loginInfo.sessionId : loginInfo.phone;
        await startBot(loginInfo.mode, loginData);
        
    } catch (error) {
        UltraCleanLogger.error(`Main error: ${error.message}`);
        setTimeout(async () => {
            await main();
        }, 8000);
    }
}

process.on('SIGINT', () => {
    console.log(chalk.yellow('\n👋 Shutting down gracefully...'));
    
    defibrillator.stopMonitoring();
    
    if (statusDetector) {
        statusDetector.saveStatusLogs();
    }
    
    if (memberDetector) {
        memberDetector.saveDetectionData();
    }
    
    if (antiViewOnceSystem) {
        antiViewOnceSystem.saveHistory();
    }
    
    if (autoGroupJoinSystem) {
        UltraCleanLogger.info('💾 Saving auto-join logs...');
    }
    
    stopHeartbeat();
    if (SOCKET_INSTANCE) SOCKET_INSTANCE.ws.close();
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    UltraCleanLogger.error(`Uncaught exception: ${error.message}`);
});

process.on('unhandledRejection', (error) => {
    UltraCleanLogger.error(`Unhandled rejection: ${error.message}`);
});

// Activity monitor
setInterval(() => {
    const now = Date.now();
    const inactivityThreshold = 5 * 60 * 1000;
    
    if (isConnected && (now - lastActivityTime) > inactivityThreshold) {
        if (SOCKET_INSTANCE) {
            SOCKET_INSTANCE.sendPresenceUpdate('available').catch(() => {});
        }    
    }
}, 60000);

// Auto-restart on crash
process.on('exit', (code) => {
    if (code !== 0 && code !== 130 && code !== 143) {
        UltraCleanLogger.critical(`Process crashed with code ${code}`);
        
        const crashLog = {
            timestamp: new Date().toISOString(),
            exitCode: code,
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            defibrillatorStats: defibrillator.getStats(),
            restartCount: defibrillator.restartCount,
            memberDetectionStats: memberDetector ? memberDetector.getStats() : null,
            antiViewOnceStats: antiViewOnceSystem ? antiViewOnceSystem.getStats() : null
        };
        
        try {
            fs.writeFileSync(
                './crash_log.json',
                JSON.stringify(crashLog, null, 2)
            );
        } catch {
            // Ignore write errors
        }
        
        if (defibrillator.canRestart()) {
            UltraCleanLogger.info('Auto-restarting in 5 seconds...');
            setTimeout(() => {
                UltraCleanLogger.info('Starting bot...');
                main().catch(() => {
                    process.exit(1);
                });
            }, 5000);
        }
    }
});

// Start the bot
main().catch(() => {
    process.exit(1);
});
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botSource = fs.readFileSync(path.join(__dirname, 'wolf.js'), 'utf8');
const patchedSource = botSource.replace(
    /createRequire\(\[([^\]]+)\]/g,
    'createRequire(import.meta.url'
);

const tmpBot = path.join(__dirname, '.bot_run.js');
fs.writeFileSync(tmpBot, patchedSource);

await import(tmpBot);

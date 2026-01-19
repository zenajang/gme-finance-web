const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'public', 'sw.template.js');
const outputPath = path.join(__dirname, '..', 'public', 'sw.js');

const version = process.env.SW_CACHE_VERSION || String(Date.now());
const template = fs.readFileSync(templatePath, 'utf8');
const output = template.replace(/__CACHE_VERSION__/g, version);

fs.writeFileSync(outputPath, output);

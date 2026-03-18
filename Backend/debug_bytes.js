const fs = require('fs');
const content = fs.readFileSync('.env', 'utf8');
const lines = content.split('\n');
lines.forEach(line => {
    if (line.includes('GOOGLE_CLIENT_SECRET')) {
        const val = line.split('=')[1].trim();
        console.log('SECRET length:', val.length);
        console.log('SECRET bytes:', Buffer.from(val).toString('hex'));
    }
});

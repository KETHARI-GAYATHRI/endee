require('dotenv').config();
const { User } = require('./src/models');

async function listEmails() {
    try {
        const users = await User.findAll();
        users.forEach(u => {
            console.log(`EMAIL:${u.email}`);
        });
    } catch (error) {
        console.error('DB ERROR:', error);
    }
}

listEmails().then(() => process.exit());

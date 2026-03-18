require('dotenv').config();
const { User } = require('./src/models');

async function listUsers() {
    try {
        const users = await User.findAll();
        console.log('--- USER DATA ---');
        users.forEach(u => {
            console.log(JSON.stringify({
                id: u.id,
                name: u.name,
                email: u.email,
                hasPassword: !!u.password,
                googleId: u.googleId
            }, null, 2));
        });
        console.log('-----------------');
    } catch (error) {
        console.error('DB ERROR:', error);
    }
}

listUsers().then(() => process.exit());

require('dotenv').config();
const { User } = require('./src/models');
const { comparePassword, generateToken } = require('./src/utils/auth');

async function testLogin(email, password) {
    try {
        console.log(`--- TESTING LOGIN FOR: ${email} ---`);
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('FAIL: User not found in DB.');
            return;
        }
        console.log('SUCCESS: User found in DB.');
        
        try {
            console.log('Testing password comparison...');
            const isMatch = await comparePassword(password, user.password);
            console.log('IS MATCH:', isMatch);
        } catch (err) {
            console.error('CRASH in comparePassword:', err);
        }

        try {
            console.log('Testing token generation...');
            const token = generateToken(user.id);
            console.log('TOKEN GENERATED:', token ? 'YES' : 'NO');
        } catch (err) {
            console.error('CRASH in generateToken:', err);
        }
        
    } catch (error) {
        console.error('TOP LEVEL ERROR:', error);
    }
}

// Testing with identified email
testLogin('ketharigayathri@gmail.com', 'some_password').then(() => process.exit());

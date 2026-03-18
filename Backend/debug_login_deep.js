require('dotenv').config();
const { User } = require('./src/models');
const { comparePassword, generateToken } = require('./src/utils/auth');

async function testLoginDeep() {
    console.log('--- DEEP LOGIN TEST ---');
    try {
        const email = 'ketharigayathri@gmail.com';
        const password = 'any'; // Password doesn't matter for crash test
        
        console.log('1. Finding user...');
        const user = await User.findOne({ where: { email } });
        console.log('   User found:', !!user);
        
        console.log('2. Comparing password...');
        // This is where it likely crashes if bcrypt has issues
        try {
            const isMatch = await comparePassword(password, user.password);
            console.log('   Match result:', isMatch);
        } catch (e) {
            console.error('   FATAL in comparePassword:', e);
            throw e;
        }

        console.log('3. Generating token...');
        try {
            const token = generateToken(user.id);
            console.log('   Token generated successfully');
        } catch (e) {
            console.error('   FATAL in generateToken:', e);
            throw e;
        }
        
        console.log('--- TEST COMPLETE ---');
    } catch (err) {
        console.error('--- TEST FAILED ---');
        console.error(err.stack);
    }
}

testLoginDeep().then(() => process.exit());

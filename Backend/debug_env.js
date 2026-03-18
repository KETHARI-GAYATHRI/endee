require('dotenv').config();
console.log('--- ENV DEBUG ---');
console.log('ID:', "[" + process.env.GOOGLE_CLIENT_ID + "]");
console.log('SECRET:', "[" + process.env.GOOGLE_CLIENT_SECRET + "]");
console.log('CALLBACK:', "[" + process.env.GOOGLE_CALLBACK_URL + "]");
console.log('-----------------');

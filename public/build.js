const fs = require('fs');
const path = require('path');

console.log('Starting build.js...');
const envPassword = process.env.ADMIN_PASSWORD || 'supersecret123';
console.log('Using password:', envPassword);

try {
    const filePath = path.join(__dirname, 'admin', 'index.html');
    console.log('Reading file:', filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('File read successfully');
    const updatedContent = content.replace('"__VERCEL_ENV_PASSWORD__"', JSON.stringify(envPassword));
    console.log('Replacing placeholder with:', envPassword);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log('File written successfully');
} catch (error) {
    console.error('Build error:', error.message);
    process.exit(1); // Force Vercel to fail the build if there’s an error
}

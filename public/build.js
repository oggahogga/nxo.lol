const fs = require('fs');
const path = require('path');

const envPassword = process.env.ADMIN_PASSWORD || 'supersecret123'; // Vercel env var or fallback
const filePath = path.join(__dirname, 'admin', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');
const updatedContent = content.replace('"__VERCEL_ENV_PASSWORD__"', JSON.stringify(envPassword));

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Admin HTML updated with password');

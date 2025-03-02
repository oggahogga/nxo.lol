export default function handler(req, res) {
    console.log('Login API called');
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { password } = req.body;
    const correctPassword = process.env.ADMIN_PASSWORD || 'supersecret123';

    if (password === correctPassword) {
        console.log('Password correct');
        res.status(200).json({ success: true });
    } else {
        console.log('Password incorrect');
        res.status(401).json({ success: false });
    }
}

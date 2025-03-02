const PASSWORD = process.env.ADMIN_PASSWORD1 || process.env.ADMIN_PASSWORD2;

module.exports = (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ success: false, error: 'No password provided' });
    }
    if (password === PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, error: 'Incorrect password' });
    }
};

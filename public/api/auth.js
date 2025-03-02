const PASSWORD = process.env.ADMIN_PASSWORD; // Set in Vercel env vars

module.exports = (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
};

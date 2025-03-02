module.exports = (req, res) => {
    const key = process.env.ADMIN_PASSWORD1 || process.env.ADMIN_PASSWORD2 || 'supersecret123';
    res.json({ key });
};

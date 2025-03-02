let messages = []; // In-memory storage (use a database in production)

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { message, timestamp } = req.body;
        messages.push({ message, timestamp });
        res.status(200).json({ success: true });
    } else if (req.method === 'GET') {
        res.json(messages);
        messages = []; // Clear after sending (optional)
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

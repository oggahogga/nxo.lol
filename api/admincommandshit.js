export default function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;
        console.log(`Command received: ${command}`);
        // Here, you can handle the command as needed
        res.status(200).json({ message: `Command received: ${command}` });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

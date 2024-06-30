export default function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;

        // Handle the command here
        console.log('Received command:', command);

        // Respond back with a success message
        res.status(200).json({ message: `Command received: ${command}` });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

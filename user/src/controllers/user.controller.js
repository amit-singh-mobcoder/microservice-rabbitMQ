import { connectToRabbitMQ, createChannel, sendMessage } from '../utils/rabbitmq-messageBroker.js';

export const getUsers = async (req, res) => {
    const data = { id: 1, name: 'Alex', age: 18 };
    const message = JSON.stringify(data);
    const queue = 'message_queue_user';
    const RABBITMQ_URL = 'amqp://localhost';

    try {
        // Connect to RabbitMQ and create a channel
        const connection = await connectToRabbitMQ(RABBITMQ_URL);
        const channel = await createChannel(connection);

        // Send message to the queue
        sendMessage(channel, queue, message);

        // Close the channel and connection after sending the message
        setTimeout(() => {
            channel.close();
            connection.close();
        }, 500);

        res.send('Message from User Services');
    } catch (error) {
        console.log('Something went wrong:', error.message);
        res.status(500).send('Failed to send message to the queue');
    }
};

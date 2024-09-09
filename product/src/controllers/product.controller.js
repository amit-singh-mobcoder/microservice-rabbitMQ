import {connectToRabbitMQ, createChannel, consumeMessage} from '../utils/rabbitmq-messageBroker.js'
const RABBITMQ_URL = 'amqp://localhost';

export const getUserProducts = async(req, res) => {
    const queue = 'message_queue_user'

    try {
        // Connect to RabbitMQ and create a channel
        const connection = await connectToRabbitMQ(RABBITMQ_URL);
        const channel = await createChannel(connection);
        
        // Consume messages from the queue
        consumeMessage(channel, queue, (message) => {
            res.send(message);

            // Close the channel and connection after processing the message
            setTimeout(() => {
                channel.close()
                connection.close()
            }, 500)
        })

    } catch (error) {
        console.log('Something went wrong ', error.message)
    }

}
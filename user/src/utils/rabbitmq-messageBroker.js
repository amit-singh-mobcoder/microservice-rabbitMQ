import amqp from "amqplib";


export const connectToRabbitMQ = async (url) => {
    try {
        const connection = await amqp.connect(url);
        console.log('connected to RabbitMQ');
        return connection;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:',error);
        throw error;        
    }
}

export const createChannel = async (connection) => {
    try {
        const channel = await connection.createChannel();
        console.log('Channel created');
        return channel;
    } catch (error) {
        console.error('Error creating channel:',error);
        throw error;
    }
}

export const sendMessage = (channel, queue, message) => {
    channel.assertQueue(queue, {durable: false})
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to queue ${queue} : ${message}`)
}

export const consumeMessage = (channel, queue, callback) => {
    channel.assertQueue(queue, {durable: false});
    console.log(`waiting for message in queue ${queue}`);

    channel.consume(queue, (msg) => {
        if(msg !== null){
            console.log(`Received message: ${msg.content.toString()}`)
            callback(msg.content.toString())
        } else {
            console.warn('Received null message')
        }
    }, {noAck: true})
}
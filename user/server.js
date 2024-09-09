const express = require('express');
const amqp = require('amqplib/callback_api');
const PORT = 3002;
const app = express();

app.get('/users', (req, res) => {

    let data = { id: 2, name: 'Alex', age: 18 };

    amqp.connect('amqp://localhost', function (error, connection) {
        if (error) {
            console.error("Failed to connect to RabbitMQ:", error);
            return res.status(500).send("Failed to connect to message queue");
        }

        connection.createChannel((error, channel) => {
            if (error) {
                console.error("Failed to create channel:", error);
                return res.status(500).send("Failed to create channel");
            }

            const queue = 'message_queue_user';
            const msg = JSON.stringify(data);

            channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(`Sent ${msg} to ${queue}`);

            // Close the channel and connection after sending the message
            setTimeout(() => {
                channel.close();
                connection.close();
            }, 500);
        });
    });

    res.send('Message from User service');
});

app.listen(PORT, () => console.log(`User Service is running at http://localhost:${PORT}`));




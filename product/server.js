const express = require('express');
const amqp = require('amqplib/callback_api');
const PORT = 3001;
const app = express();

app.get('/products', (req, res) => {
    amqp.connect('amqp://localhost', (err, conn) => {
        if (err) {
            console.error("Failed to connect to RabbitMQ:", err);
            return res.status(500).send("Failed to connect to message queue");
        }

        conn.createChannel((err, ch) => {
            if (err) {
                console.error("Failed to create channel:", err);
                return res.status(500).send("Failed to create channel");
            }

            const queue = 'message_queue_user';
            
            console.log('Waiting for messages from queue...');
            
            ch.consume(queue, (msg) => {
                console.log('Received message:', msg.content.toString());
                res.send(msg.content.toString());

                // Close the channel and connection after processing the message
                setTimeout(() => {
                    ch.close();
                    conn.close();
                }, 500);

            }, { noAck: true });
        });
    });
});

app.listen(PORT, () => console.log(`Product Service is running at http://localhost:${PORT}`));





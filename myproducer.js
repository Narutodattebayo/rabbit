const amqp = require('amqplib')

let returnChannel = async () => {
    let connection = await amqp.connect("amqp://dumndtnh:J5YHzVUW-29Pkz9NFZsw-aHtnZGpRZb3@salamander.rmq.cloudamqp.com/dumndtnh");
    let channel = await connection.createChannel()
    console.log('going to return channle')
    return channel
}

let producer = async function () {


    let channel = await returnChannel()

    let exchange = "ex11";
    let exchangeTYpe = "direct";
    let response = await channel.assertExchange(exchange, exchangeTYpe, { durable: false });


    let bindingkey2 = "black"
    for (let i = 0; i < 1000000; i++) {
        channel.publish(exchange, bindingkey2, Buffer.from("hithere"));
    }

}
producer()
module.exports = { returnChannel: returnChannel }
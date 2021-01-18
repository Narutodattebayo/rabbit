const amqp = require('amqplib')

let returnChannel = async () => {
    let connection = await amqp.connect("amqp://dumndtnh:J5YHzVUW-29Pkz9NFZsw-aHtnZGpRZb3@salamander.rmq.cloudamqp.com/dumndtnh");
    let channel = await connection.createChannel()
    console.log('going to return channle')
    return channel
}

let producer = async function () {

    //console.log(connection)
    let channel = await returnChannel()
    //console.log(channel)
    let exchange = "ex11";
    let exchangeTYpe = "direct";
    let response = await channel.assertExchange(exchange, exchangeTYpe, { durable: false });
    console.log(response)
    let bindingkey1 = "yellow";
    let bindingkey2 = "black"
    for (let i = 0; i < 1000000; i++) {

        // let responsedata = await channel.publish(exchange, bindingkey1, Buffer.from("hellohjhjhj0000"))
        console.log(`publishing ${i}th data`)
        channel.publish(exchange, bindingkey2, Buffer.from("hithere"));
    }
    // console.log(response)
    //channel.publish(exchange, "dgfdgfd", Buffer.from("there"));
}
producer()
module.exports = { returnChannel: returnChannel }
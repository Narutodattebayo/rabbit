const amqp = require('amqplib')
const channelreq = require('./producer').returnChannel
let consumer = async function () {
    // let connection=await amqp.connect("amqp://localhost");
    // console.log(connection)
    // let channel=await connection.createChannel()
    let channel = await channelreq()
    console.log('............cccccccccc', channel)
    let exchange = "ex11";
    //let exchangeTYpe="direct";
    //await channel.assertExchange(exchange,exchangeTYpe,{durable:false});
    //let bindingkey1="yellow";
    //let bindingkey2="black"

    await channel.assertQueue('q1')
    await channel.assertQueue('q3')
    await channel.assertQueue('q4')
    await channel.assertQueue('qq')
    // await channel.deleteQueue('mainQueues')
    // await channel.deleteQueue('failedTasks')
    await channel.assertQueue('mainQueues', { deadLetterExchange: "DeadExchanges" })
    // await channel.assertQueue('q2')
    await channel.bindQueue('q1', exchange, "dgfdgfd");
    await channel.bindQueue('q3', exchange, "yellow")
    await channel.bindQueue('q4', exchange, "black")
    await channel.bindQueue('qq', exchange, "black")
    await channel.bindQueue('qq', exchange, "yellow")
    await channel.bindQueue('mainQueues', exchange, "yellow")
    //await channel.bindQueue('q2',exchange,"red")
    // channel.consume('q1', (msg) => {
    //     console.log('.............q1', msg.content.toString())
    //     channel.ack(msg)
    // })
    // channel.consume('q3', (msg) => {
    //     console.log('.............q3', msg.content.toString())
    //     channel.ack(msg)
    // })
    channel.consume('q4', (msg) => {
        console.log('.............q4', msg.content.toString())
        channel.ack(msg)
    })
    // channel.consume('q44', (msg) => {
    //     console.log('.............q44', msg.content.toString())
    //     channel.ack(msg)
    // })
    // channel.consume('mainQueues', (msg) => {
    //     console.log('.............mainqueues', msg.content.toString())
    // //    channel.nack(msg, false, false)
    //     channel.ack(msg,true,true)
    // })
    channel.assertExchange('DeadExchanges', 'direct', { durable: false })
    channel.assertQueue('failedTasks', {
        arguments: {
            'x-dead-letter-exchange': "ex11",
         //   'x-dead-letter-routing-key': "yellow",            //not having effect on failure queue simply adding routing key while binding the key is working fine.
            'x-message-ttl': 15000,
            'x-expires': 100000
        }

    })
    channel.bindQueue('failedTasks','DeadExchanges','yellow')       //binding key is yellow here defined which is working and not insde agrument while asserting queue x-dead-letter-routing-key:yellow
    channel.consume('failedTasks', (msg) => {
        console.log('.............failedTask', msg.content.toString())
        channel.ack(msg)
    })


}
consumer()
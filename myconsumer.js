const amqp = require('amqplib')
const channelreq = require('./producer').returnChannel
let consumer = async function () {
    
    let channel = await channelreq()
    let exchange = "ex11";
    

   
    await channel.assertQueue('q4')
   
  
    await channel.bindQueue('q4', exchange, "black")
  
    
    // })
    channel.consume('q4', (msg) => {
        console.log('.............q4', msg.content.toString())
        channel.ack(msg)
    })
   
   


}
consumer()
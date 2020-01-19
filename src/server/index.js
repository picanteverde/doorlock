const fs = require('fs')
const path = require('path')
const fastify = require("fastify")({ logger: true });


const GPIOpath = '/sys/class/gpio/export'

const onRPI = false

let Gpio, door

try {
  if (fs.existsSync(GPIOpath)) {
    Gpio = require("onoff").Gpio;
    door = new Gpio(16, "out");
    onRPI = true
  }
} catch(err) {
  console.error(err)
}

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "../../public")
})

fastify.setNotFoundHandler((req, res) => {
  res.sendFile('index.html')
})

fastify.get("/openDoor", (request, reply) =>{
  if (onRPI) {
    door.writeSync(1)
    setTimeout(() => door.writeSync(0), 2000)
  }
});

// Run the server!
fastify.listen(3000, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});

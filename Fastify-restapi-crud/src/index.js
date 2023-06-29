const fastify = require("fastify")({ logger: false });

// Routes
fastify.get("/hello", (req, reply) => {
  reply.send({ message: "Hello World" });
});

// Register Routes
fastify.register(require("./routes/tasks"));


const start = async () => {
  const port = 3000;
  try {
    await fastify.listen({port});
    console.log(`Fastify ready at http://localhost:${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

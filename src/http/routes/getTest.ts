import { FastifyInstance } from 'fastify'

// test route
export async function test(app: FastifyInstance) {
  app.get('/', async (_, reply) => {
    return reply.status(200).send({ message: 'Hello, World!' })
  })
}

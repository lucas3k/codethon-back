import { FastifyInstance } from 'fastify'
import prisma from '../../../services/prisma'
import z from 'zod'

export async function getUserAdmin(app: FastifyInstance) {
  app.get('/loginUser', async (request, reply) => {
    const getAdminQuery = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = getAdminQuery.parse(request.query)

    if (!email || !password) {
      return reply
        .status(400)
        .send({ message: 'Email and password are required' })
    }

    const user = await prisma.admin.findFirst({
      where: {
        email,
        password,
      },
    })

    return reply.status(201).send(user)
  })
}

import { FastifyInstance } from 'fastify'
import prisma from '../../../services/prisma'
import z from 'zod'

export async function postUserAdmin(app: FastifyInstance) {
  app.post('/createUserAdmin', async (request, reply) => {
    const postAdminBody = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = postAdminBody.parse(request.body)

    if (!email || !password) {
      return reply
        .status(400)
        .send({ message: 'Email and password are required' })
    }

    await prisma.admin.create({
      data: {
        email,
        password,
      },
    })

    return reply.status(201).send({ message: 'User created' })
  })
}

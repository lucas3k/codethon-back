import { FastifyInstance } from 'fastify'
import prisma from '../../../services/prisma'
import z from 'zod'

// delete pet by id
export async function deletePet(app: FastifyInstance) {
  app.delete('/deletePet/:id', async (request, reply) => {
    const deletePetQuery = z.object({
      id: z.string(),
    })

    const { id } = deletePetQuery.parse(request.params)

    if (!id) {
      return reply.code(400).send('Id is required to delete a pet')
    }

    try {
      await prisma.pet.delete({
        where: {
          id,
        },
      })

      return reply.code(200).send({ message: 'Pet deleted successfully' })
    } catch (error) {
      return reply.code(500).send(error)
    }
  })
}

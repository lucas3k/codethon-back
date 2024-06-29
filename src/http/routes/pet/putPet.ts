import { FastifyInstance } from 'fastify'
import prisma from '../../../services/prisma'
import z from 'zod'

// update pet by id
export async function putPet(app: FastifyInstance) {
  app.put('/updatePet/:id', async (request, reply) => {
    const putBody = z.object({
      name: z.string(),
      breed: z.string(),
      size: z.string(),
      age: z.number(),
      description: z.string(),
      photo: z.string(),
    })

    const putParams = z.object({
      id: z.string(),
    })

    const { id } = putParams.parse(request.params)
    const { name, breed, size, age, description, photo } = putBody.parse(
      request.body,
    )

    if (
      !name.trim() ||
      !breed.trim() ||
      !size.trim() ||
      !age ||
      !description.trim() ||
      !photo.trim()
    ) {
      return reply.code(400).send({
        message: 'All values are required',
      })
    }

    try {
      const pet = await prisma.pet.update({
        where: { id },
        data: {
          name,
          breed,
          size,
          age,
          description,
          photo,
        },
      })

      return reply.code(201).send(pet)
    } catch (error) {
      return reply.code(500).send(error)
    }
  })
}

import { FastifyInstance } from 'fastify'
import prisma from '../../../services/prisma'
import z from 'zod'

// create pet
export async function postPet(app: FastifyInstance) {
  app.post('/createPet', async (request, reply) => {
    const postBody = z.object({
      name: z.string(),
      breed: z.string(),
      size: z.string(),
      age: z.number(),
      description: z.string(),
      photo: z.string(),
    })

    const { name, breed, size, age, description, photo } = postBody.parse(
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
      const pet = await prisma.pet.create({
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

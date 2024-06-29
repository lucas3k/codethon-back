import { FastifyInstance } from 'fastify'
import prisma from '../../../services/prisma'
import z from 'zod'

// get All pats with pagination
export async function getAllPet(app: FastifyInstance) {
  app.get('/listAllPat', async (request, reply) => {
    const getAllPetsQuery = z.object({
      page: z.string(),
      limit: z.string(),
    })

    const { page, limit } = getAllPetsQuery.parse(request.query)

    try {
      const pets = await prisma.pet.findMany({
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      })

      return reply.code(200).send(pets)
    } catch (error) {
      return reply.code(500).send(error)
    }
  })
}

// get pet by id
export async function getPetById(app: FastifyInstance) {
  app.get('/listPetById/:id', async (request, reply) => {
    const getPetByIdQuery = z.object({
      id: z.string(),
    })

    const { id } = getPetByIdQuery.parse(request.params)

    if (!id) {
      return reply.code(400).send('Id is required to get a pet')
    }

    try {
      const pet = await prisma.pet.findUnique({
        where: {
          id,
        },
      })

      return reply.code(200).send(pet)
    } catch (error) {
      return reply.code(500).send(error)
    }
  })
}

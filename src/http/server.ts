import 'dotenv/config'
import Fastify from 'fastify'
import { log } from 'console'
import { test } from './routes/getTest'
import { postUserAdmin, getUserAdmin } from './routes/admin'
import { deletePet, getAllPet, getPetById, postPet, putPet } from './routes/pet'

const app = Fastify({ logger: true })
const PORT = Number(process.env.PORT) || 3000

// Register the routers!
app.register(test)
app.register(postUserAdmin)
app.register(getUserAdmin)
app.register(postPet)
app.register(getAllPet)
app.register(getPetById)
app.register(putPet)
app.register(deletePet)

// Run the server!
try {
  app.listen({ port: PORT })
  log(`Server running on http://localhost:${PORT}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}

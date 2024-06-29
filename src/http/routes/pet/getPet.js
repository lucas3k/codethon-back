"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPet = getAllPet;
exports.getPetById = getPetById;
const prisma_1 = __importDefault(require("../../../services/prisma"));
const zod_1 = __importDefault(require("zod"));
// get All pats with pagination
async function getAllPet(app) {
    app.get('/listAllPat', async (request, reply) => {
        const getAllPetsQuery = zod_1.default.object({
            page: zod_1.default.string(),
            limit: zod_1.default.string(),
        });
        const { page, limit } = getAllPetsQuery.parse(request.query);
        try {
            const pets = await prisma_1.default.pet.findMany({
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
            });
            return reply.code(200).send(pets);
        }
        catch (error) {
            return reply.code(500).send(error);
        }
    });
}
// get pet by id
async function getPetById(app) {
    app.get('/listPetById/:id', async (request, reply) => {
        const getPetByIdQuery = zod_1.default.object({
            id: zod_1.default.string(),
        });
        const { id } = getPetByIdQuery.parse(request.params);
        if (!id) {
            return reply.code(400).send('Id is required to get a pet');
        }
        try {
            const pet = await prisma_1.default.pet.findUnique({
                where: {
                    id,
                },
            });
            return reply.code(200).send(pet);
        }
        catch (error) {
            return reply.code(500).send(error);
        }
    });
}

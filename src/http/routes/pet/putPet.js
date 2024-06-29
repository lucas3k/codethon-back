"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPet = putPet;
const prisma_1 = __importDefault(require("../../../services/prisma"));
const zod_1 = __importDefault(require("zod"));
// update pet by id
async function putPet(app) {
    app.put('/updatePet/:id', async (request, reply) => {
        const putBody = zod_1.default.object({
            name: zod_1.default.string(),
            breed: zod_1.default.string(),
            size: zod_1.default.string(),
            age: zod_1.default.number(),
            description: zod_1.default.string(),
            photo: zod_1.default.string(),
        });
        const putParams = zod_1.default.object({
            id: zod_1.default.string(),
        });
        const { id } = putParams.parse(request.params);
        const { name, breed, size, age, description, photo } = putBody.parse(request.body);
        if (!name.trim() ||
            !breed.trim() ||
            !size.trim() ||
            !age ||
            !description.trim() ||
            !photo.trim()) {
            return reply.code(400).send({
                message: 'All values are required',
            });
        }
        try {
            const pet = await prisma_1.default.pet.update({
                where: { id },
                data: {
                    name,
                    breed,
                    size,
                    age,
                    description,
                    photo,
                },
            });
            return reply.code(201).send(pet);
        }
        catch (error) {
            return reply.code(500).send(error);
        }
    });
}

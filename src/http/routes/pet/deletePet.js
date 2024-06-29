"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = deletePet;
const prisma_1 = __importDefault(require("../../../services/prisma"));
const zod_1 = __importDefault(require("zod"));
// delete pet by id
async function deletePet(app) {
    app.delete('/deletePet/:id', async (request, reply) => {
        const deletePetQuery = zod_1.default.object({
            id: zod_1.default.string(),
        });
        const { id } = deletePetQuery.parse(request.params);
        if (!id) {
            return reply.code(400).send('Id is required to delete a pet');
        }
        try {
            await prisma_1.default.pet.delete({
                where: {
                    id,
                },
            });
            return reply.code(200).send({ message: 'Pet deleted successfully' });
        }
        catch (error) {
            return reply.code(500).send(error);
        }
    });
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUserAdmin = postUserAdmin;
const prisma_1 = __importDefault(require("../../../services/prisma"));
const zod_1 = __importDefault(require("zod"));
async function postUserAdmin(app) {
    app.post('/createUserAdmin', async (request, reply) => {
        const postAdminBody = zod_1.default.object({
            email: zod_1.default.string(),
            password: zod_1.default.string(),
        });
        const { email, password } = postAdminBody.parse(request.body);
        if (!email || !password) {
            return reply
                .status(400)
                .send({ message: 'Email and password are required' });
        }
        await prisma_1.default.admin.create({
            data: {
                email,
                password,
            },
        });
        return reply.status(201).send({ message: 'User created' });
    });
}

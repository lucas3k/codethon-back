"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const console_1 = require("console");
const getTest_1 = require("./routes/getTest");
const postUserAdmin_1 = require("./routes/admin/postUserAdmin");
const pet_1 = require("./routes/pet");
const app = (0, fastify_1.default)({ logger: true });
const PORT = Number(process.env.PORT) || 3000;
// Register the routers!
app.register(getTest_1.test);
app.register(postUserAdmin_1.postUserAdmin);
app.register(pet_1.postPet);
app.register(pet_1.getAllPet);
app.register(pet_1.getPetById);
app.register(pet_1.putPet);
app.register(pet_1.deletePet);
// Run the server!
try {
    app.listen({ port: PORT });
    (0, console_1.log)(`Server running on http://localhost:${PORT}`);
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}

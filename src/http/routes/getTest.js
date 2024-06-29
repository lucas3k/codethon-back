"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = test;
// test route
async function test(app) {
    app.get('/', async (_, reply) => {
        return reply.status(200).send({ message: 'Hello, World!' });
    });
}

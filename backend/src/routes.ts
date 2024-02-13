import fastify, { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerService";
import { ListCustomerController } from "./controllers/ListCustomerController"; 
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";

// Definição das rotas
export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true };
    });

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply);
    });

    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomerController().handle(request, reply);
    });

    
    fastify.delete("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply);
    });
}

// Inicialização do servidor Fastify
const app = fastify();

// Registrando as rotas com o prefixo '/customer'
app.register(routes, { prefix: '/customer' });

// Iniciando o servidor
app.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});

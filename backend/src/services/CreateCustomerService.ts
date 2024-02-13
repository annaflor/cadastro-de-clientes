import prismaClient from "../prisma" ;


interface CreateCustomerProps {
    name: string;
    email: string;
}

class CreateCustomerService {
    async execute({ name, email }: CreateCustomerProps) {
        if (!name || !email) {
            throw new Error("Preencha todos os campos");
        }

        try {
            const customer = await prismaClient.customer.create({
                data: {
                    name,
                    email,
                    status: true
                }
            });
            
            return customer;
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            throw new Error("Erro ao criar cliente");
        }
    }
}

export { CreateCustomerService };

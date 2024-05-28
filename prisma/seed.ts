import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    try {
        const a = await prisma.user.create({
            data: {
                name: "admin",
                password: await hash("1234", 8),
                trombs: {
                    create: {
                        name: "eptm",
                        sections: {
                            createMany: {
                                data: [
                                    { name: "Informatique", abrev: "info" },
                                    { name: "Electronique", abrev: "elec" },
                                    { name: "Automatique", abrev: "auto" },
                                ]
                            }
                        },
                        persons: {
                            createMany: {
                                data: [
                                    { name: "Antho", photo: "", email: "anthoeptm@gmail.com", tel: "0123456789", function: "Sale merde", section: "Info" }
                                ]
                            }
                        }
                    }
                }
            },
            select: {
                trombs: true
            }
        });

        console.log(a.trombs[0].id);
    } catch (e) {
        console.log("error: ", e);
        
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

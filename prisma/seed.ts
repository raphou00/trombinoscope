import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

async function main() {
    const a = await prisma.user.create({
        data: {
            name: "admin",
            password: await hash("1234"),
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
                                { name: "Antho", photo: "https://picsum.photos/500", email: "anthoeptm@gmail.com", tel: "0123456789", function: "Sale merde", section: "Info" }
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

    console.log(a.trombs[0].id);1
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

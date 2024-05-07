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
                    }
                }
            }
        },
        select: {
            trombs: true
        }
    });

    console.log(a.trombs[0].id);
    
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

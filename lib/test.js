import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    // const newUser = await prisma.user.create({
    //   data: {
    //     username: "oumaima",
    //     email: "ouma@gmail.com",
    //     password: "password123",
    //   },
    // });

    const newTask = await prisma.task.create({
      data: {
        title: "Example Task",
        description: "This is an example task",
        dueDate: new Date(),
        status: "INCOMPLETE"
      },
    });

    console.log(newTask);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

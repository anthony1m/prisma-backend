require("dotenv/config");

const prisma = require("../utils/prisma");

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error("Please provide the user's email.");
    console.error("Example: npm run make:admin -- anthony@gmail.com");
    process.exitCode = 1;
    return;
  }

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      role: "ADMIN",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  console.log("User updated:");
  console.log(user);
}

main()
  .catch((error) => {
    if (error.code === "P2025") {
      console.error("User not found. Check the email and try again.");
      process.exitCode = 1;
      return;
    }

    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'qoctales@gmail.com';
  
  // Create or update user
  const user = await prisma.user.upsert({
    where: { email },
    update: { role: 'ADMIN' },
    create: {
      email,
      firstName: 'Admin',
      passwordHash: 'dummy_hash', // In reality, we'd hash a password, but we assume it might exist or not.
      role: 'ADMIN',
    },
  });
  console.log('User admin ready:', user.email, 'Role:', user.role);

  // Platform Config
  await prisma.platformConfig.upsert({
    where: { key: 'PLATFORM_FEE_RATE' },
    update: {},
    create: { key: 'PLATFORM_FEE_RATE', value: '12' }
  });
  console.log('Platform config seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

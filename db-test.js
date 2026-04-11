const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient({
  log: ['error', 'warn'],
});

async function test() {
  const url = process.env.DATABASE_URL || 'NOT SET';
  console.log('DATABASE_URL host:port =', url.replace(/\/\/[^:]+:[^@]+@/, '//***:***@').split('/')[2]);

  try {
    console.log('\nConnecting to database...');
    await db.$connect();
    console.log('✅ Connected successfully!');

    const count = await db.car.count();
    console.log('✅ Car count:', count);

  } catch (e) {
    console.error('\n❌ CONNECTION FAILED');
    console.error('Error code   :', e.code);
    console.error('Error message:', e.message);
    if (e.meta) console.error('Meta         :', JSON.stringify(e.meta, null, 2));
  } finally {
    await db.$disconnect();
  }
}

test();

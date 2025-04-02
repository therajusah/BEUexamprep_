const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Admin credentials
    const adminData = {
      name: "Admin",
      email: "admin@beuexamprep.com",
      password: "admin123" // Change this password!
    };

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminData.email }
    });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email:', adminData.email);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    const admin = await prisma.admin.create({
      data: {
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('🆔 User ID:', admin.id);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 
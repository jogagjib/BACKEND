const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveImageUrl(url) {
    return await prisma.image.create({
        data: { url }
    });
}

module.exports = { saveImageUrl };

const express = require('express');
const multer = require('multer');
const path = require('path');
const { saveImageUrl } = require('../services/image.service');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    try {
        const savedImage = await saveImageUrl(imageUrl);
        res.status(200).json({ imageurl: savedImage.url });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to save image URL' });
    }
});

router.get('/', async (req, res) => {
    try {
        const images = await prisma.image.findMany();
        res.json(images);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});
module.exports = router;

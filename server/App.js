import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); 

const PORT = 8080;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const encryptImage = (imageBuffer, password) => {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, 'salt', 24);
    const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);

    let encrypted = cipher.update(imageBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return Buffer.concat([iv, encrypted]);
};

const decryptImage = (encryptedBuffer, password) => {
    const iv = encryptedBuffer.slice(0, 16);
    const encryptedData = encryptedBuffer.slice(16);
    const key = crypto.scryptSync(password, 'salt', 24);
    const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);

    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted;
};

app.post('/encrypt-image', upload.single('image'), (req, res) => {
    const password = req.body.password;
    const imageBuffer = req.file.buffer;

    if (!imageBuffer || !password) {
        return res.status(400).send('Image and password are required.');
    }

    const encryptedImage = encryptImage(imageBuffer, password);

    res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="encrypted-image.jpeg"',
    });

    res.send(encryptedImage);
});

app.post('/decrypt-image', upload.single('image'), (req, res) => {
    const password = req.body.password;
    const encryptedBuffer = req.file.buffer; 

    if (!encryptedBuffer || !password) {
        return res.status(400).send('Encrypted image and password are required.');
    }

    try {
        const originalImage = decryptImage(encryptedBuffer, password);
        res.set({
            'Content-Type': 'image/jpeg',
            'Content-Disposition': 'inline; filename="original-image.jpeg"',
        });
        res.send(originalImage);
    } catch (error) {
        return res.status(401).send('Invalid password or decryption failed.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

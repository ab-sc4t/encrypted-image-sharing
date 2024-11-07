import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import cors from 'cors';

const app = express();

app.use(cors());
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

const decryptImage = (encryptedBuffer, password) => {
    const iv = encryptedBuffer.slice(0, 16);
    const encryptedData = encryptedBuffer.slice(16);
    const key = crypto.scryptSync(password, 'salt', 24);

    try {
        const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
        let decrypted = decipher.update(encryptedData);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        return encryptedBuffer;
    }
};

app.post('/decrypt-image', upload.single('encryptedImage'), (req, res) => {
    const password = req.body.password;
    const encryptedBuffer = req.file.buffer;

    if (!encryptedBuffer || !password) {
        return res.status(400).send('Encrypted image and password are required.');
    }

    const decryptedImage = decryptImage(encryptedBuffer, password);

    res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="decrypted-image.jpeg"',
    });

    res.send(decryptedImage);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

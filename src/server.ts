import { createWorker } from 'tesseract.js';
import express, { Request, Response } from 'express';
import multer from 'multer';

const app = express();

// Multer configuration for handling form data
const storage = multer.memoryStorage(); // Use memory storage for handling files
const upload = multer({ storage: storage });

app.use(express.json());

app.get("/",(req: Request, res: Response) => {
    res.send('Hello, My name is Inigo Montoya')
});

app.post('/parse', upload.fields([
    { name: 'file', maxCount: 1 }, // Handle a single image file
    { name: 'language' } // Handle text data
  ]), async (req: Request, res: Response) => {

    // Access the file and text data from the request
    const fileBuffer = req.files?.['file']?.[0]?.buffer;
    const languageData = req.body['language'];

    const worker = await createWorker(languageData);
    const ret = await worker.recognize(fileBuffer);

    const data = ret.data.text;
    await worker.terminate();

    res.json({ data });
});

app.listen(300, () => 'server running on port 300');
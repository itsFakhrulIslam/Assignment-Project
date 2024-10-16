const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (!fs.existsSync('uploads/')) {
            fs.mkdirSync('uploads/');
        }

        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully.');
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
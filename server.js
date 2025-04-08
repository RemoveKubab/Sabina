const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serwowanie plików statycznych z folderu 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint do uzyskania listy zdjęć z folderu 'images'
app.get('/get-images', (req, res) => {
    fs.readdir(path.join(__dirname, 'images'), (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Błąd odczytu folderu' });
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));  // Wybieramy tylko obrazy
        res.json(imageFiles);
    });
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});

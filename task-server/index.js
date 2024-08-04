const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Api Start');
})

app.get('/api/h1-text', (req, res) => {
    fs.readFile('h1-text.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading h1 text');
        }
        res.send({ text: data });
    });
});

app.post('/api/h1-text', (req, res) => {
    const newText = req.body.text;
    fs.writeFile('h1-text.txt', newText, (err) => {
        if (err) {
            return res.status(500).send('Error writing h1 text');
        }
        res.send({ text: newText });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

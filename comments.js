// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
  fs.readFile(path.resolve(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    res.json(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(path.resolve(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(req.body);

    fs.writeFile(path.resolve(__dirname, 'comments.json'), JSON.stringify(comments), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }

      res.json(comments);
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile(
    'index.html',
    {root: path.join(__dirname, 'dist')}
  );
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port);
console.log(`Server is listening on port ${port}`);

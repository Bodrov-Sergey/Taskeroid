const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const PORT = process.env.PORT || 4200;

const html = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), {
  encoding: 'utf8',
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (_, res) => {
  res.send(html);
});

app.listen(
  PORT,
  '0.0.0.0',
  () =>
    /* eslint-disable no-console */
    console.log(`Server started on port ${PORT}`),
  /* eslint-enable no-console */
);

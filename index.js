const express = require('express')
const app = express()
const port = 3000
const { connectDB } = require('./db');

connectDB(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

app.get('/', (req, res) => {
    res.send(JSON.stringify({name: "Hello world"}))
})

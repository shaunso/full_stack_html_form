import express from 'express';
import 'dotenv/config';

import homeRouter from './routes/index.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}, {limit: 100}));
app.use(express.static('public'));

app.set('view engine', 'ejs')

// routes
app.use('/', homeRouter);

// page handles when client requests an invalid endpoint
app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen( PORT, () => console.log(`The server is listening for client requests at http://localhost:${PORT}/`) );
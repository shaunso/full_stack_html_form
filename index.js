import express from 'express';
import 'dotenv/config';

import homeRouter from './routes/index.js'
import searchRouter from './routes/searchEntry.js'
import updateRouter from './routes/updateEntry.js'

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}, {limit: 100}));
app.use(express.static('public'));

app.set('view engine', 'ejs')

// routes
app.use('/', homeRouter);
app.use('/search-entry', searchRouter);

app.get( '/modify-entry', ( req, res ) => {
  res.status(200).render('editEntry', { data: [], errors: []})
})

// page handles when client requests an invalid endpoint
app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen( PORT, () => console.log(`The server is listening for client requests at http://localhost:${PORT}/`) );
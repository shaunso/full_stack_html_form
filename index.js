import express from 'express';
import { body, validationResult } from 'express-validator';
import 'dotenv/config';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

// app.use(express.json());
app.use(express.urlencoded({extended: true}, {limit: 10}));
app.use(express.static('public'));

app.get( '/', ( req, res ) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});
app.post( '/', ( req, res ) => {
  const data = req.body;
  res.json(data);
  // once data is retrieved, transform it how you want first
  // then send to mysql - i.e. insert into statements
  // then send to google sheets?? || mysql to google sheets
  // save each entry in a json file
  // ensure logic for category is done here before insert into mysql and google sheets
});

app.listen( PORT, () => console.log(`The server is listening for client requests at http://localhost:${PORT}/`) );
import express from 'express';
import { body, validationResult } from 'express-validator';
import 'dotenv/config';
import path from 'path';

import { validators } from './utils/validators.js'
import { pool } from './utils/database.js';
import { calculateAge, consent, raceID } from './utils/functions.js';
// import { router } from './routes/form_registration_post/registration.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}, {limit: 10}));
app.use(express.static('public'));
// app.use('/', router)

app.get( '/', ( req, res ) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.post( '/', validators, ( req, res ) => {
  const errors = validationResult( req );

  if ( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

  // object destructing used to get user data for each field
  const { fname, lname, day, month, year, email, id_doc, id_no,country_code_mobile, mobile_number, country_code_alt_mobile_number, alt_mobile_number, address1, address2, gender, event_category, emerg_contact_name, country_code_emerg_contact_mobile, emerg_contact_mobile_number, event_discovery, terms_conds, policy, communication } = req.body;

  // formatting data to ensure it is in the way mysql expects it to be
  const race_id = raceID();
  const dob = `${year}-${month}-${day}`;
  const address = address1 + ( address2 === '' ? '' : ` ${address2}`);
  const usr_mobile_num = `+${country_code_mobile}-${mobile_number}`;
  const usr_alt_mobile_num = (alt_mobile_number === '') ? null : `+${country_code_alt_mobile_number}-${alt_mobile_number}`;
  const usr_emerg_cont_num = `+${country_code_emerg_contact_mobile}-${emerg_contact_mobile_number}`;
  const age = calculateAge( new Date( dob ) );
  const usr_conset = consent( terms_conds, policy, communication );
  const usr_event_discover = event_discovery ? event_discovery : null;

  const usr_info = [ race_id, fname, lname, gender, age, dob, email, id_doc, id_no,usr_mobile_num, usr_alt_mobile_num, address, event_category, emerg_contact_name, usr_emerg_cont_num, usr_event_discover, usr_conset];

  const query = process.env.INSERT_QUERY;

  pool.execute( query, usr_info, ( err, result ) => {
    if (err) {
      res.status(500).send('<h3> Something went wrong. <a href="/">Please resubmit<a><h3>')
    };
    // res.status(200).json({ userData: usr_info, queryResult: result} );
    res.status(200).send(`<h1>You have successfully registered for the Dr Simon V Muzenda Gutu Half Marathon 2024 ${fname}. Your reference number is ${race_id}. Please make payment to Ecocash number 0772-210-914</h1>`);

    // ERROR EXPLAINED: error code 580 returned
    //   the pool appears to be closing and not reopening causing the attempt to connect to mysql to fail
    // pool.end( err => { if (err) throw res.status(500).send('<h1>Error 581. Something went wrong closing the pool connection. Please try again</h1>') }) 
  })
});

app.listen( PORT, () => console.log(`The server is listening for client requests at http://localhost:${PORT}/`) );
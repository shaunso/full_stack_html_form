import express from 'express';
const router = express.Router();
import { validationResult } from 'express-validator';
import 'dotenv/config';
import path from 'path';

// middleware, sql config credentials & custom functions 
import { validators } from '../utils/validators.js'
import { pool } from '../utils/database.js';

// PUT
//user view entry landing page
router.put('/update-entry', validators, ( req, res ) => {
  const data = req.body;
  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {
    return res.status(400).render('submission_error', { data: data, errors: errors.array() });
  }

  // object destructing used to get user data for each field
  const { fname, lname, day, month, year, gender, id_doc_typ, id_doc_no,country_code_mobile, mobile_number, country_code_alt_mobile_number, alt_mobile_number, email, address, event_category, emerg_contact_name, emerg_contact_country_code_mobile, emerg_contact_mobile_number, event_discovery, terms_conds, policy, communication } = req.body;  
});

// POST
// user search
router.post('/', validators, ( req, res ) => {
  const data = req.body;
  const errors = validationResult( req );

  const { race_id, lname, day, month, year } = req.body;
  const dob = `${year}-${month}-${day}`;
  const searchData = [ race_id, lname, dob ];
  const sqlQuery = process.env.SEARCH_QUERY;

  // if there are errors with the user data
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ data: data, errors: errors.array() });
  }

  // write the form data into the database
  pool.execute( sqlQuery, searchData, ( err, result ) => {
    if (err) {
        //throw err
        res.status(500).send('<h3> Something went wrong. <a href="/">Please resubmit<a><h3>');
      };
      
    if ( !result.length ) {
      res.status(200).sendFile( path.join( process.cwd(), 'public', 'html', 'no_entry _record.html'));
    } else {
      res.status(200).render('view_entry', { data: result[0] });
      // res.status(200).json(result[0]);

    }
    });
})

export default router;
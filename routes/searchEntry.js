import express from 'express';
const router = express.Router();
import { validationResult } from 'express-validator';
import 'dotenv/config';
import path from 'path';

// middleware, sql config credentials & custom functions 
import { validators2 } from '../utils/validators2.js'
import { pool } from '../utils/database.js';

// GET
//user view entry landing page
router.get('/', ( req, res ) => {
  res.sendFile( path.join( process.cwd(), 'public', 'html', 'search_entry.html') );
});

// POST
// user search
router.post('/', validators2, ( req, res ) => {
  const errors = validationResult( req );

  const { race_id, lname, day, month, year } = req.body;

  const dob = `${year}-${month}-${day}`;
  const searchData = [ race_id, lname, dob ];
  const sqlQuery = process.env.SEARCH_QUERY;

  // if there are errors with the user data
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ errors: errors.array() });
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
    }
    });
})

router.get('/modify-entry', ( req, res ) => {
  const errors = validationResult( req );

  // if there are errors with the user data
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ errors: errors.array() });
  }

  // res.status(200).send('Yebo baba!!🍒🍒🥑');
  res.status(200).sendFile( path.join( process.cwd(), 'public', 'html', 'search_entry.html'))
})
export default router;
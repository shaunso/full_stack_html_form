import { body } from 'express-validator';

export const validators =   
[ 
  // first name
  body('fname').trim().escape().notEmpty().withMessage('First name cannot be left blank').matches(/^[A-Za-z ]+$/).withMessage('First name must only contain letters').isLength({min: 3}).withMessage('First name must contain 3 or more letters').bail().isLength({max: 40}).withMessage('First name must contain 40 or less letters'),

  // last name
  body('lname').trim().escape().notEmpty().withMessage('Last name cannot be left blank').matches(/^[A-Za-z-]+$/).withMessage('Last name must only contain letters').isLength({min: 3}).withMessage('Last name must contain 3 or more letters').bail().isLength({max: 30}).withMessage('Last name must contain 30 or less letters'),

  // day
  body('day').trim().escape().notEmpty().withMessage('Day cannot be left blank').isInt({min: 1, max: 31}).withMessage('Day must be a number between 1 & 31').isLength({max: 2}).withMessage('Enter valid day'),

  // month
  body('month').trim().escape().notEmpty().withMessage('Month cannot be left blank').isInt({min: 1, max: 12}).withMessage('Month must be a number between 1 & 12').isLength({max: 2}).withMessage('Enter valid month'),

  // year
  body('year').trim().escape().notEmpty().withMessage('Year cannot be left blank').isInt({min: 1914, max: 2022}).withMessage('You must be born between 1914 & 2022 to enter').isLength({max: 4}).withMessage('Enter valid year'),

  // gender
  body('gender').trim().escape().notEmpty().withMessage('Gender cannot be left blank').custom( gender => {
    if ( gender === "Female" ||  gender === "Male") return gender;
    throw new Error('Select female or male');
  }),

  // identity document type
  body('id_doc_typ').trim().escape().notEmpty().withMessage('Identity document type cannot be left blank').bail().custom( id => {
    if ( id === "Zimbabwean ID" ||  id === "Passport") return id;
    throw new Error('Select Zimbabwean ID or Passport');
  }),

  // identity document number
  body('id_doc_no').trim().escape().notEmpty().withMessage('Identity document number cannot be left blank').blacklist(' -').bail().isLength({min: 6, max: 20}).withMessage('Identity document number must 6 or more characters').bail().matches(/^[A-Za-z0-9 ]+$/).withMessage('Identity document number must only contain letters and numbers'),

  // mobile number country code
  body('country_code_mobile').trim().escape().notEmpty().withMessage('Country code cannot be left blank').bail().isInt().withMessage('Country code must be a number').bail().isLength({min: 1, max:4}).withMessage('Country code must contain between 1 and 3 numbers'),

  // mobile number
  body('mobile_number').trim().escape().blacklist(' -').notEmpty().withMessage('Mobile number cannot be left blank').isInt().withMessage('Mobile number must only contain numbers').bail().isLength({min: 7, max:15}).withMessage('Mobile number must contain between 7 and 15 numbers'),

  // alternative number country code
  body('country_code_alt_mobile_number').trim().escape().notEmpty().withMessage('Country code cannot be left blank').bail().isInt().withMessage('Country code must be a number').bail().isLength({min: 1, max:4}).withMessage('Country code must contain between 1 and 3 numbers').optional({values: 'falsy'}),

  // alternative number
  body('alt_mobile_number').trim().escape().blacklist(' -').notEmpty().withMessage('Mobile number cannot be left blank').bail().isInt().withMessage('Mobile number must only contain numbers').bail().isLength({min: 7, max:15}).withMessage('Mobile number must contain between 7 and 15 numbers').optional({values: 'falsy'}),
  
  // email
  body('email').trim().escape().normalizeEmail().isEmail().withMessage('Enter valid email address').isLength({min:6}).withMessage('Email must contain 6 or more characters').bail().isLength({max:64}).withMessage('Email must contain 64 or less characters'),

  // address
  body('address').trim().escape().notEmpty().withMessage('Address cannot be left blank').bail().isLength({min: 12}).withMessage('Address must contain 12 or more characters').bail().isLength({max: 64}).withMessage('Address must contain 64 or less characters').bail().matches(/^[A-Za-z0-9 ,-]+$/).withMessage('Address must only contain letters and numbers'),

  // race category
  body('event_category').trim().escape().notEmpty().withMessage('Select the race you are entering').custom( race => {
    if ( race === "21KM" || race === "10KM" || race === "5KM" || race === "2KM" || race === "wheelchair" || race === "spinners" ) return race;
    throw new Error('Select only the options below');
  }),

  // emergency contact full name
  body('emerg_contact_name').trim().escape().notEmpty().withMessage('Emergency contact name cannot be left blank').bail().matches(/^[A-Za-z ]+$/).withMessage('Emergency contact name must only contain letters').bail().isLength({min: 6}).withMessage('Emergency contact name must contain 6 or more letters').bail().isLength({max: 50}).withMessage('Emergency contact name must be less than 50 letter or less'),

  // emergency contact mobile number country code
  body('emerg_contact_country_code_mobile').trim().escape().notEmpty().withMessage('Country code cannot be left blank').bail().isInt().withMessage('Country code must be a number').bail().isLength({min: 1, max:4}).withMessage('Country code must contain between 1 and 3 numbers'),

  // emergency contact mobile number
  body('emerg_contact_mobile_number').trim().escape().blacklist(' -').notEmpty().withMessage('Emergency contact mobile number cannot be left blank').isInt().withMessage('Emergency contact mobile number must only contain numbers').bail().isLength({min: 7, max:15}).withMessage('Emergency contact mobile number must contain between 7 and 15 numbers'),

  // event discovery
  body('event_discovery').trim().escape().matches(/^[A-Za-z0-9 ]+$/).withMessage('Field must only contain letters and numbers').bail().isLength({min: 2}).withMessage('Field must contain 2 or more characters').bail().isLength({max: 64}).withMessage('Fieldust be less than 64 characters long').optional({values: 'falsy'}),

  // user consent checkboxes
  body('terms_conds').trim().escape().custom( agree => {
    if ( agree === 'TRUE') return agree;
    throw new Error('Select the checkboxes to complete entry')
  }),
  body('policy').trim().escape().custom( agree => {
    if ( agree === 'TRUE') return agree;
    throw new Error('Select the checkboxes to complete entry')
  }),
  body('communication').trim().escape().custom( agree => {
    if ( agree === 'TRUE') return agree;
    throw new Error('Select the checkboxes to complete entry')
  }),
];
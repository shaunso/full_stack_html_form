import { body } from 'express-validator';

export const validators =   
[ 
  // first name
  body('fname').trim().escape().notEmpty().withMessage('Enter first name').matches(/^[A-Za-z ]+$/).withMessage('Name must not contain number and/or special characters').isLength({min: 3}).withMessage('First name must be at least 3 characters long').bail().isLength({max: 40}).withMessage('First name must be less than 40 characters long'),

  // middle name
  // body('mname').trim().escape().notEmpty().isAlpha().withMessage('Name must not contain number and/or special characters').isLength({min: 3, max: 20}).withMessage('Middle name must be between 3 and 20 characters long').optional({values: 'falsy'}),

  // last name
  body('lname').trim().escape().notEmpty().withMessage('Enter last name').matches(/^[A-Za-z-]+$/).withMessage('Name must not contain number and/or special characters').isLength({min: 3}).withMessage('Last name must be at least 3 characters long').bail().isLength({max: 30}).withMessage('Last name must be less than 30 characters long'),

  // day
  body('day').trim().escape().isInt({min: 1, max: 31}).withMessage('Enter valid day').isLength({max: 2}).withMessage('Enter valid day'),

  // month
  body('month').trim().escape().isInt({min: 1, max: 12}).withMessage('Enter valid month').isLength({max: 2}).withMessage('Enter valid month'),

  // year
  body('year').trim().escape().isInt({min: 1914, max: 2013}).withMessage('Enter valid year').isLength({max: 4}).withMessage('Enter valid year'),

  // email
  body('email').trim().escape().normalizeEmail().isEmail().withMessage('Enter valid email address').isLength({min:6}).withMessage('Email must be at least 6 characters long').bail().isLength({max:64}).withMessage('Email must be less than 64 characters long'),

  // identity document type
  body('id_doc').trim().escape().bail().custom( id => {
    if ( id === "Zimbabwean ID" ||  id === "Passport") return id;
    throw new Error('Select identity document');
  }),

  // identity document number
  body('id_no').trim().escape().notEmpty().blacklist(' -').withMessage('Enter your identity number').bail().isLength({min: 6, max: 20}).withMessage('Identity number must be at least 6 characters long').bail().matches(/^[A-Za-z0-9 ]+$/).withMessage('Identity number must not contain special characters'),

  // mobile number country code
  body('country_code_mobile').trim().escape().notEmpty().withMessage('Select country code').bail().isInt().withMessage('Enter valid country code').bail().isLength({min: 1, max:4}).withMessage('Country code must be between 1 and 3 characters long'),

  // mobile number
  body('mobile_number').trim().escape().blacklist(' -').notEmpty().withMessage('Enter mobile number').isInt().withMessage('Enter valid mobile number').bail().isLength({min: 7, max:15}).withMessage('Mobile number must be between 7 and 15 characters'),

  // alternative number country code
  body('country_code_alt_mobile_number').trim().escape().notEmpty().withMessage('Select country code').bail().isInt().withMessage('Enter valid country code').bail().isLength({min: 1, max:4}).withMessage('Country code must be between 1 and 3 characters long').optional({values: 'falsy'}),

  // alternative number
  body('alt_mobile_number').trim().escape().blacklist(' -').notEmpty().withMessage('Enter mobile number').bail().isInt().withMessage('Enter valid mobile number').bail().isLength({min: 7, max:15}).withMessage('Mobile number must be between 7 and 15characters').optional({values: 'falsy'}),

  // address line 1
  body('address1').trim().escape().notEmpty().withMessage('Enter your address').bail().isLength({min: 12}).withMessage('Address must be at least 12 characters long').bail().isLength({max: 64}).withMessage('Address must be less than 64 characters').bail().matches(/^[A-Za-z0-9 ,-]+$/).withMessage('Address must not contain special characters'),

  // address line 2
  body('address2').trim().escape().bail().bail().isLength({max: 64}).withMessage('Address must be less than 64 characters').bail().matches(/^[A-Za-z0-9 ,-]+$/).withMessage('Address must not contain special characters').optional({values: 'falsy'}),

  // gender
  body('gender').trim().escape().custom( gender => {
    if ( gender === "Female" ||  gender === "Male") return gender;
    throw new Error('Select your gender');
  }),

  // race category
  body('event_category').trim().escape().custom( race => {
    if ( race === "21KM" || race === "10KM" || race === "5KM" || race === "2KM" || race === "wheelchair" || race === "spinners" ) return race;
    throw new Error('Select the race you are registering for');
  }),

  // emergency contact full name
  body('emerg_contact_name').trim().escape().notEmpty().withMessage('Enter full name').bail().matches(/^[A-Za-z ]+$/).withMessage('Name must not contain number and/or special characters').bail().isLength({min: 6}).withMessage('Name must be at least 6 characters long').bail().isLength({max: 50}).withMessage('First name must be less than 50 characters long'),

  // emergency contact mobile number country code
  body('country_code_emerg_contact_mobile').trim().escape().notEmpty().withMessage('Select country code').bail().isInt().withMessage('Enter valid country code').bail().isLength({min: 1, max:4}).withMessage('Country code must be between 1 and 3 characters long'),

  // emergency contact mobile number
  body('emerg_contact_mobile_number').trim().escape().blacklist(' -').notEmpty().withMessage('Enter mobile number').isInt().withMessage('Enter valid mobile number').bail().isLength({min: 7, max:15}).withMessage('Mobile number must be between 7 and 15 characters'),

  // event discovery
  body('event_discovery').trim().escape().matches(/^[A-Za-z0-9 ]+$/).withMessage('Must not contain special characters').bail().isLength({min: 2}).withMessage('Must be at least 2 characters long').bail().isLength({max: 64}).withMessage('Must be less than 64 characters long').optional({values: 'falsy'}),

  // user consent checkboxes
  body('terms_conds').trim().escape().custom( agree => {
    if ( agree === 'TRUE') return agree;
    throw new Error('Select the checkboxes to complete registration')
  }),
  body('policy').trim().escape().custom( agree => {
    if ( agree === 'TRUE') return agree;
    throw new Error('Select the checkboxes to complete registration')
  }),
  body('communication').trim().escape().custom( agree => {
    if ( agree === 'TRUE') return agree;
    throw new Error('Select the checkboxes to complete registration')
  }),
];

import { body } from 'express-validator';

export const validators2 =   
[ 
  // first name
  body('race_id').trim().escape().notEmpty().withMessage('Race id cannot be left blank').bail().isAlphanumeric().withMessage('Race id must only contain numbers & letters').isLength({min: 3}).withMessage('Race id must contain 3 or more numbers & letters').bail().isLength({max: 8}).withMessage('Race id must contain 8 or less numbers & letters'),

  // last name
  body('lname').trim().escape().notEmpty().withMessage('Last name cannot be left blank').bail().matches(/^[A-Za-z-]+$/).withMessage('Last name must only contain letters').bail().isLength({min: 3}).withMessage('Last name must contain 3 or more letters').bail().isLength({max: 30}).withMessage('Last name must contain 30 or less letters'),

  // day
  body('day').trim().escape().notEmpty().withMessage('Day cannot be left blank').bail().isInt({min: 1, max: 31}).withMessage('Day must be a number between 1 & 31').bail().isLength({max: 2}).withMessage('Enter valid day'),

  // month
  body('month').trim().escape().notEmpty().withMessage('Month cannot be left blank').bail().isInt({min: 1, max: 12}).withMessage('Month must be a number between 1 & 12').bail().isLength({max: 2}).withMessage('Enter valid month'),

  // year
  body('year').trim().escape().notEmpty().withMessage('Year cannot be left blank').bail().isInt({min: 1914, max: 2022}).withMessage('You must be born between 1914 & 2022 to enter').bail().isLength({max: 4}).withMessage('Enter valid year'),
];
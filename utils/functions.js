import crypto from 'crypto';

export { calculateAge, consent, raceID }

///////////////////////
// Function to calculate age (in years)
function calculateAge(dateOfBirth) {
  // Ensure the dateOfBirth is a Date object
  if (!(dateOfBirth instanceof Date)) {
    dateOfBirth = new Date(dateOfBirth);
  }

  // Enter the cut off date
   const race_day_date = new Date('2024-11-02'); 

  // Get the difference (in milliseconds) between the selected date and date of birth
  const diffInMilliSeconds = race_day_date.getTime() - dateOfBirth.getTime(); 

  // 1 year = 365.25 days
  const diffInYears = diffInMilliSeconds/1000/60/60/24/365.25;

  // Return the difference in years
  return Math.abs(Math.floor(diffInYears))
} 

///////////////////////
// Function that checks that user has ticked all three checkboxes and returns one value to be inserted into database
function consent(a,b,c) {
  if ( ( a === 'TRUE') && ( b === 'TRUE') &&  ( c === 'TRUE') ) return true
  else return false
}

///////////////////////
// Function that generates random string that will be used to set the user unique race_id
function raceID () {
    // generate a random 32 byte
    const randomBytes = crypto.randomBytes(32);
    // convert this byte in a 64 character length hexadecimal figure
    const randomString = randomBytes.toString("hex");
    // extract the hexidecimal number at two different starting positions 
    // each extratcted part will consist of 3 characters each in length
    // concatenate the two string to make a new 6 character length string
    // new 6 character string will be the race_id for each registered user
    const usr_id = randomString.slice(51,54) + randomString.slice(14,17);
    // store in upper-case for ease of readability
    return usr_id.toUpperCase()
}

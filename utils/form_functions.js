// Function to calculate age (in years)

export { calculateAge, consent }

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
  return Math.abs(Math.floor(diffInYears));
} 

function consent(a,b,c) {
  if ( ( a === 'TRUE') && ( b === 'TRUE') &&  ( c === 'TRUE') ) return true;
  else return false;
}
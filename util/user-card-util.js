const random = require("random");

// helper method for number sequence generation
const generateRandomNumberSequence = (desiredSequenceLength, min, max) => {
  let randomNumberSequence = "";
  while (randomNumberSequence.length < desiredSequenceLength) {
    randomNumberSequence += random.int((min = min), (max = max));
  }

  return randomNumberSequence;
};

const generateCardNumber = () => {
  const cardNumberSequenceLength = 16;
  const creditCardNumber = generateRandomNumberSequence(
    cardNumberSequenceLength,
    (min = 0),
    (max = 9)
  );

  return creditCardNumber;
};

const generateCardExpiry = (cardLifeDurationInYears) => {
  const todaysDate = new Date();
  const expiryDate = new Date(
    Date.UTC(
      (year = todaysDate.getFullYear() + cardLifeDurationInYears),
      (month = todaysDate.getMonth() + 1),
      (day = 0) // last day of the month
    )
  );
  return expiryDate.toISOString();
};

const generateCardCvcNumber = () => {
  const cvcNumberSequenceLength = 3;
  const cvcNumber = generateRandomNumberSequence(
    cvcNumberSequenceLength,
    (min = 0),
    (max = 9)
  );

  return cvcNumber;
};

const generateCreditLimit = (cardID) => {
  let creditLimit = null;

  // creditLimit is usually dependent on income, but in this case,
  // credit limit is 0 for YouthSaver Cards, which cardID == 1.
  // If not YouthSaver, return default null value (no credit limit)
  if (cardID == 1) {
    creditLimit = 0;
  }

  return creditLimit;
};

const convertInputCardExpiryToISOString = (inputCardExpiry) => {
  // get MM and YY to convert to desired date format, suitable to construct date object
  // then convert date object to ISOString
  [MM, YY] = inputCardExpiry.split("/", -1);
  const year = "20" + YY;
  const month = MM;
  let date = new Date(Date.UTC(year, MM, 0));

  return date.toISOString();
};

exports.generateCardNumber = generateCardNumber;
exports.generateCardExpiry = generateCardExpiry;
exports.generateCardCvcNumber = generateCardCvcNumber;
exports.generateCreditLimit = generateCreditLimit;
exports.convertInputCardExpiryToISOString = convertInputCardExpiryToISOString;

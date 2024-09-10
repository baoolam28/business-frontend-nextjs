// Barcode validation functions

export default function validateBarcode(barcode) {
  barcode = barcode.trim();

  if (!/^\d+$/.test(barcode)) {
    return false;
  }

  switch (barcode.length) {
    case 8:
      return validateEAN8(barcode);
    case 12:
      return validateUPC(barcode);
    case 13:
      return validateEAN13(barcode);
    case 10:
      return validateISBN10(barcode);
    case 13:
      return validateISBN13(barcode);
    default:
      return false;
  }
}

function validateEAN8(barcode) {
  const checkDigit = parseInt(barcode[7]);
  let sum = 0;

  for (let i = 0; i < 7; i++) {
    let num = parseInt(barcode[i]);
    sum += i % 2 === 0 ? num * 3 : num;
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === calculatedCheckDigit;
}

function validateUPC(barcode) {
  const checkDigit = parseInt(barcode[11]);
  let sum = 0;

  for (let i = 0; i < 11; i++) {
    let num = parseInt(barcode[i]);
    sum += i % 2 === 0 ? num : num * 3;
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === calculatedCheckDigit;
}

function validateEAN13(barcode) {
  const checkDigit = parseInt(barcode[12]);
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    let num = parseInt(barcode[i]);
    sum += i % 2 === 0 ? num : num * 3;
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === calculatedCheckDigit;
}

function validateISBN10(barcode) {
  const checkDigit = barcode[9];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let num = parseInt(barcode[i]);
    sum += num * (10 - i);
  }

  const calculatedCheckDigit = (11 - (sum % 11)) % 11;
  const isValidCheckDigit =
    checkDigit === "X"
      ? calculatedCheckDigit === 10
      : parseInt(checkDigit) === calculatedCheckDigit;
  return isValidCheckDigit;
}

function validateISBN13(barcode) {
  const checkDigit = parseInt(barcode[12]);
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    let num = parseInt(barcode[i]);
    sum += i % 2 === 0 ? num : num * 3;
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === calculatedCheckDigit;
}

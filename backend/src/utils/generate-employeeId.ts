function generateEmployeeId(): string {
  const date = new Date();
  const dateString = `${date.getFullYear().toString().slice(2)}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`; // YYMMDD
  const randomNumber = Math.floor(Math.random() * 10000);  // Angka acak 4 digit
  return dateString + randomNumber.toString().padStart(4, '0');  // Gabungkan dan pastikan angka 4 digit
}

export default generateEmployeeId;
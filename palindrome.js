const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanedStr === cleanedStr.split('').reverse().join('');
}

rl.question('Enter a string: ', function(input) {
  if (isPalindrome(input)) {
    console.log(`The string '${input}' is a palindrome.`);
  } else {
    console.log(`The string '${input}' is not a palindrome.`);
  }
  rl.close();
});


'use scrict';

// -----------------Promise------------------

let promise = new Promise (function(resolve, reject) {
    // executor
});

function delay(ms) {
    return new Promise (resolve => setTimeout(resolve, ms));
  }
  
  delay(3000).then(() => console.log('выполнилось через 3 секунды'));
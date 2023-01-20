'use scrict';

// -----------------Promise------------------

// let promise = new Promise (function(resolve, reject) {
//     // executor
// });

function delay(ms) {
    return new Promise (resolve => setTimeout(resolve, ms));
  }
  
  delay(3000).then(() => console.log('выполнилось через 3 секунды'));


//   --------------Промисы: обработка ошибок----------------

  let promise = new Promise ((resolve, reject) => {
    setTimeout(() => {reject(new Error('whoooooops!!'));}, 2000);
    setTimeout(() => {resolve('some value')}, 1000);
  }).then(value => console.log(value))
  .catch(err => console.log(err.message + '!!???'));

// ----------------Промисификация-----------------------

function loadScript (src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error('Ошибка загрузки ' + src));
}

let loadScriptNew = function (src) {
    return new Promise ((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err)
            else resolve(script);
        });
    });
}

function promisify (f) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function callback(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }

            args.push(callback);
            f.call(this, ...args);
        });
    };
}
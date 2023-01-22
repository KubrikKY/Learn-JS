'use scrict';

// -----------------Promise------------------

// let promise = new Promise (function(resolve, reject) {
//     // executor
// });

function delay(ms) {
    return new Promise (resolve => setTimeout(resolve, ms));
  }
  
  delay(3000).then(() => console.log('выполнилось через 3 секунды'));

function delay (ms) {
    return new Promise (resolve => setTimeout(() => resolve(ms), ms));
}

delay(3000).then((ms) => console.log(`Выполнено за ${ms / 1000} секунды`));

 let prom = time => {
    return new Promise (resolve => {
        let arr = [1, 2, 3];
        console.log(arr);
        setTimeout (() => resolve(arr), time);
    });
 };

 new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);
  
  }).then(function(result) {
  
    console.log(result); // 1
  
    return new Promise (resolve => setTimeout(() => resolve(result * 2), 1000));
  
  }).then(function(result) { // (**)
  
    console.log(result); // 2
  
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) {
  
    console.log(result); // 4
  });

 let func = prom(1000).then(result => {
    return new Promise (resolve => {
        setTimeout(() => {
            result.push(4);
            console.log(result);
            resolve(result);
        }, 2000);
    });
 }).then(newresult => {
    newresult.push(5);
    console.log(newresult);
    return new Promise (resolve =>  resolve(newresult));
 });

 setTimeout(() => console.log(func), 7000);



//   --------------Промисы: обработка ошибок----------------

  let promise = new Promise ((resolve, reject) => {
    setTimeout(() => {reject(new Error('whoooooops!!'));}, 2000);
    setTimeout(() => {resolve('some value')}, 3000);
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

function promisifyMany(f, many = false) {
    return function (...args) {
        return new Promise ((resolve, reject) => {
            function callback (err, ...result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(many? result: result[0]);
                }
            }

            args.push(callback);
            f.call(this, ...args);
        });
    };
}

// ---------------Async/await------------------

async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("готово!"), 1000)
    });
  
    let result = await promise; // будет ждать, пока промис не выполнится (*)
  
    console.log(result); // "готово!"
  }
  
  f();
  

async function showAvatar () {
    let response = await fetch('/article/promise-chaining/user.json'),
        user = await response.json(),

        githubResponse = await fetch(`https://api.github.com/users/${user.name}`),
        githubUser = await githubResponse.json();
        img = document.createElement('img');

    img.src = githubUser.avatar_url;
    img.className = 'promise-avatar-example';
    document.body.append(img);

    await new Promise ((resolve, reject) => setTimeout(resolve, 3000));
    img.remove();

    return githubUser;
}




let someUrl = 'https://jsonplaceholder.typicode.com/todos';

function delay (ms) {
    return new Promise (r => setTimeout(() => r(), ms));
}

// function createJson (url) {
//     console.log('Start create JSON Data...')
//     return delay(2000)
//     .then(() => {
//         console.log('Preparing Data ... ');
//     })
//     .then(() => fetch(url))
//     .then(response => response.json());
// }

// createJson(someUrl)
// .then(data => console.log(data))
// .catch(err => console.log('Возникла ошибка ' + err.name));

async function getData (url) {
    console.log('Start create JSON Data...');
    try {
        await delay(2500);
        console.log('Preparing data...');
        let data = await fetch(url).then(response => response.json());
        return data;
    } catch (e) {
        console.log('Возникла ошибка ' + e.name);
    }
}

getData(someUrl).then(data => {
    let pr = document.createElement('p');
    pr.innerHTML = data;
    document.body.append(pr);
});

// Перепишите, используя async/await
// Перепишите один из примеров раздела Цепочка промисов, используя async/await вместо .then/catch:

// class HttpError extends Error {
//     constructor(response) {
//       super(`${response.status} for ${response.url}`);
//       this.name = 'HttpError';
//       this.response = response;
//     }
//   }
  
//   function loadJson(url) {
//     return fetch(url)
//       .then(response => {
//         if (response.status == 200) {
//           return response.json();
//         } else {
//           throw new HttpError(response);
//         }
//       })
//   }
  
//   // Запрашивать логин, пока github не вернёт существующего пользователя.
//   function demoGithubUser() {
//     let name = prompt("Введите логин?", "iliakan");
  
//     return loadJson(`https://api.github.com/users/${name}`)
//       .then(user => {
//         alert(`Полное имя: ${user.name}.`);
//         return user;
//       })
//       .catch(err => {
//         if (err instanceof HttpError && err.response.status == 404) {
//           alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
//           return demoGithubUser();
//         } else {
//           throw err;
//         }
//       });
//   }
  
//   demoGithubUser();
  

class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
  }
  
  // Запрашивать логин, пока github не вернёт существующего пользователя.
   async function demoGithubUser() {
    let user;
    while (true) {
        let name = prompt("Введите логин?", "iliakan");
        try {      
            user = await loadJson(`https://api.github.com/users/${name}`);
            break;
        } catch(err) {
            if (err instanceof HttpError && err.response.status == 404) {
              alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
            } else {
              throw err;
            }
          }
    }
    alert(`Полное имя: ${user.name}.`);
    return user;
  }
  
  demoGithubUser();
  
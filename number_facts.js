/* function get(url) {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      request.onload = function () {
        if (request.readyState !== 4) return;

        // Check status code
        if (request.status >= 200 && request.status < 300) {
          resolve({
            data: JSON.parse(request.response),
            status: request.status,
            request: request,
          })
        } else {
          reject({
            msg: 'Server Error',
            status: request.status,
            request: request
          })
        }
      }
      request.onerror = function handleError() {
        reject({
          msg: 'NETWORK ERROR!'
        })
      };
      request.open('GET', url);
      request.send();
    })
}
let div = document.getElementById('facts')
get('http://numbersapi.com/1..10,89?json')   
    .then(res => {
    for (key in res.data){
        let p = document.createElement('p')
        p.innerText = res.data[key]
        div.appendChild(p)
    }
    console.log(res.data)
    })
    .catch(err => console.log(err))


get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
      console.log(res.data);
      deck_id = res.data.deck_id
      return get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then(res => {
      console.log(res.data)
      console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
      return get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then(res => {
      console.log(res.data)
      console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
    .catch(err => console.log(err))
 */
let baseURL = 'http://numbersapi.com'
let div = document.getElementById('facts')

async function favorite() {
    try {
        let res = await axios.get(`${baseURL}/89?json`);
        let p = document.createElement('p');
        p.innerText = res.data.text;
        div.appendChild(p);
    } catch(e) {
        let p = document.createElement('p');
        p.innerText = `Error! ${e}`;
        div.appendChild(p)
    }
}


async function multiple() {
    try {
        let res = await axios.get(`${baseURL}/1..10,69?json`);
        for (key in res.data){
            let p = document.createElement('p')
            p.innerText = res.data[key]
            div.appendChild(p)
        }
    } catch(e) {
        let p = document.createElement('p');
        p.innerText = `Error! ${e}`;
        div.appendChild(p)
    }
}

async function multiple_favorite() {
    try {
        let number  = await Promise.all([
            $.getJSON(`${baseURL}/9?json`),
            $.getJSON(`${baseURL}/9?json`),
            $.getJSON(`${baseURL}/9?json`)
        ]);
        for (num in number){
            let p = document.createElement('p');
            p.innerText = number[num].text;
            div.appendChild(p);
        }
    } catch(e) {
        let p = document.createElement('p');
        p.innerText = `Error! ${e}`;
        div.appendChild(p)
    }
}

async function everything() {
    await favorite()
    await multiple()
    await multiple_favorite()
}

everything()
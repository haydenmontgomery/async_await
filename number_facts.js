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
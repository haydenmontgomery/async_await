let baseURL = 'https://deckofcardsapi.com/api/deck';
let div = document.getElementById('cards');

async function shuffle_draw_one(){
  let deck_id = ''
  try {
    let res = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
    deck_id = res.data.deck_id;
  } catch(e) {
    console.log(`Error in shuffle: ${e}`);
  }
  try {
    let res = await axios.get(`${baseURL}/${deck_id}/draw/?count=1`);
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
  } catch(e){
    console.log(`Error in draw: ${e}`);
  }
}

shuffle_draw_one();

async function shuffle_draw_two(){
  let deck_id = ''
  try {
    let res = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
    deck_id = res.data.deck_id;
  } catch(e) {
    console.log(`Error in shuffle: ${e}`);
  }
  try {
    let draws = await Promise.all([
      $.getJSON(`${baseURL}/${deck_id}/draw/?count=1`),
      $.getJSON(`${baseURL}/${deck_id}/draw/?count=1`)
    ]);
    for (card in draws) {
      console.log(`${draws[card].cards[0].value} of ${draws[card].cards[0].suit}`)
    }
  } catch(e){
    console.log(`Error in draw: ${e}`);
  }
}

shuffle_draw_two()

let newDeck = true;
let click_deck_id = '';

function addCard(url){
  img = document.createElement('img');
  img.src = url;
  img.classList.add('position-absolute', 'w-100', 'h-100');
  const randomAngle = Math.floor(Math.random() * 361);
  img.style.transform = `rotate(${randomAngle}deg)`;
  div.appendChild(img);
}

async function card_clicker() {
  if (newDeck == true){
    newDeck = false;
    try {
      let res = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
      click_deck_id = res.data.deck_id;
    } catch(e) {
      console.log(`Error in shuffle: ${e}`);
    }
    try {
      let res = await axios.get(`${baseURL}/${click_deck_id}/draw/?count=1`);
      addCard(res.data.cards[0].image)
    } catch(e){
      console.log(`Error in draw: ${e}`);
    }
  } else {
    try {
      let res = await axios.get(`${baseURL}/${click_deck_id}/draw/?count=1`);
      addCard(res.data.cards[0].image)
    } catch(e){
      console.log(`Error in draw: ${e}`);
    }
  }
}

document.getElementById('click').addEventListener('click', () => {
  card_clicker();
})
function createNewCard() {
  let cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div> 
  `;
  return cardElement;
}

function appendNewCard(parentElement) {
  let cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}

function shuffleCardImageClasses(){
  let cardClasses = [
    "hellokitty", "hellokitty",
    "cinnamoroll", "cinnamoroll",
    "kuromi", "kuromi",
    "pompompurin", "pompompurin",
    "pochacco", "pochacco",
    "mymelody", "mymelody"
  ];
  
  for (let i = 1; i <= 0; i++) {
      cardClasses.push(`image-${i}`, `image-${i}`);
  }
  cardClasses = _.shuffle(cardClasses);
  return cardClasses;
}

function createCards(parentElement, shuffledImageClasses) {
  let cardObjects = [];
  for (let i = 0; i < 12; i++) {
    let cardElement = appendNewCard(parentElement);
      cardElement.querySelector('.card-up').classList.add(shuffledImageClasses[i]);
      cardObjects.push({
          index: i,
          element: cardElement,
          imageClass: shuffledImageClasses[i]
      });
  }
  return cardObjects;
}

function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass === cardObject2.imageClass;
}

let counters = {
    flips: 0,
    matches: 0
};

function incrementCounter(counterName, parentElement) {
  counters[counterName] = counters[counterName] || 0;
  counters[counterName]++;
  parentElement.innerText = counters[counterName];
}

let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  incrementCounter('flips', document.getElementById('flip-count'));

  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    newlyFlippedCard.element.classList.add('flipped');
    return;
  }

  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
      lastCardFlipped.element.classList.remove('flipped');
      newlyFlippedCard.element.classList.remove('flipped');
      lastCardFlipped = null;
      return;
  }

  incrementCounter('matches', document.getElementById('match-count'));
  lastCardFlipped.element.classList.add('matched');
  newlyFlippedCard.element.classList.add('matched');

  if (counters.matches === 6) {
      winAudio.play();
  } else {
      matchAudio.play();
  }

  lastCardFlipped = null;
}

function resetGame() {
  let cardContainer = document.getElementById('card-container');
  while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
  }

  document.getElementById('flip-count').innerText = 0;
  document.getElementById('match-count').innerText = 0;
  counters = {};

  lastCardFlipped = null;

  setUpGame();
}

function applyGlowEffect(card1, card2) {
  card1.element.classList.add('matched');
  card2.element.classList.add('matched');
}

setUpGame();

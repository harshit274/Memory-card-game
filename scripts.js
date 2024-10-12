const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard=false;
let firstCard, secondCard;
let total = 0;

function flipCard() {
  if (lockBoard) return;
  if(this===firstCard) return;
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.frame === 
  secondCard.dataset.frame;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  total += 2;
  resetBoard();
  if (total === 12) {
    setTimeout(() => {
      alert("Congratulations!! you've a sharp memory.");
      initialize();
      resetBoard();
    }, 1000);
  }
}

function unflipCards() {
  lockBoard=true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard,lockBoard]=[false,false];
  [firstCard,secondCard]=[null,null];
}

function shuffle(){
  cards.forEach(card=>{
    let randomPos=Math.floor(Math.random()*12);
    card.style.order=randomPos;
  });
}

function initialize() {
  total = 0;
  cards.forEach(card => card.classList.remove('flip'));
  shuffle();
  cards.forEach(card => card.addEventListener('click', flipCard));
}

initialize();
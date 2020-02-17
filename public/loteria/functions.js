
import { returnCards } from './returnCards.js'
import * as utils from './utils.js'

var timer = document.getElementById("timer");
var card_index_div = document.getElementById("card_index_div");
var history_element = document.getElementById(`history_div`);
var used_cards_div = document.getElementById(`used_cards`);
var deck_id = document.getElementById(`used_cards`);
var elem = document.getElementById("progress_bar");
var images = returnCards();
var images2 = images;
var loaderId;
var card_index = 0;
var width=0;
var isPlaying = false;
var imagesUsed = [];
var HistoryCardNegIndex = 0;
var change_time = 3500; //in milliseconds 3500 is a good speed
var img_go_to;
var img_id;


function Deck() {
}

Deck.prototype.initialise = function() {
  this.toggleTutorialButtons();
};


function UpdateButton(){
  if(isPlaying){
    start_button.innerHTML = "PLAY"
  }
  else {
    start_button.innerHTML = "PAUSE"
  }
  isPlaying = !isPlaying;
}

let counter = 1;
Deck.prototype.toggleTutorialButtons = function() {

  
  document.getElementById("skipButton").onclick = () => {
    document.getElementById("tutorial").style.display = "none";
    //this.toggleButtons();
  }

  if (document.getElementById("nextButton")) {
    document.getElementById("nextButton").onclick = () => {
      if (counter < 5) counter++;
      nextPreviousClick();
      this.toggleTutorialButtons();
    }
  }

  document.getElementById("previousButton").onclick = () => {
    if (counter > 1) counter--;
    nextPreviousClick();
    this.toggleTutorialButtons()
  }

  let board = this;
  function nextPreviousClick() {
    if (counter === 1) {
      document.getElementById("tutorial").innerHTML = `<h3>Welcome to La Loteria!</h3>
      <p>Already know how to play? No problem, press the "Skip" button below.</p>
      <p>Otherwise use the next and previous buttons to navigate instructions. </p>
      <div id="tutorialCounter">${counter}/5</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip</button>`
    } else if (counter === 2) {
      document.getElementById("tutorial").innerHTML = `<div class="tutorial_body">
      <p>La Loteria is a traditional game of chance, similar to Bingo but using images on cards instead of numbers on ping pong balls</p>
      <p>There are 54 unique cards on a deck, each player gets a Loteria Board containg 16 images.</div>
      <div id="tutorialCounter">${counter}/5</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip</button>`
    } else if (counter === 3) {
      document.getElementById("tutorial").innerHTML = `<div class="tutorial_body">
      <p>Cards are shuffled, then one by one picked and read out loud to the players</p>
      <p>If the image chosen matches one of the images on your loteria board, mark it. This is traditionally done using a bean</div>
      <div id="tutorialCounter">${counter}/5</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip</button>`
    } else if (counter === 4) {
      document.getElementById("tutorial").innerHTML = `<div class="tutorial_body">
      <p>The first person to complete all the cards on their board should shout 'LA LOTERIA!' to win the game.</p></div>
      <div id="tutorialCounter">4/5</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip</button>`
    } else if (counter === 5) {
      document.getElementById("tutorial").innerHTML = `
      <div class="tutorial_body"><h3><b>Enjoy!</b></h3><p>I had a lot of fun writing this website, I hope you enjoy it as well.</p>
      <p>See the source code <a href="https://github.com/SilvioAburto/loteria">here</a>.
      <p>Check out my Blog <a href="https://silvioaburto.github.io">here</a>! </p> </div><div id="tutorialCounter">${counter}/5</div><button id="finishButton" class="btn btn-default navbar-btn" type="button">Finish</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip</button>`
      document.getElementById("finishButton").onclick = () => {
        document.getElementById("tutorial").style.display = "none";
        //board.toggleButtons();
      }
    }
  }

};


function changeCard(){
  images2 = utils.filterUsedCards(images2, imagesUsed); //Remove used images
  if(card_index === 0){
    images2 = utils.shuffle(images2)
  }
  card_index_div.textContent = (card_index+1) + "/" + images.length;
  //console.log("'public/images/" + images2[0].src +".jpg'")
  document.getElementById(`deck_id`).style.backgroundImage = "url('http://silvioaburto.github.io/loteria/public/images/" + images2[0].src +".jpg')";
  utils.playSound(images2[0].name); 
  imagesUsed.push(images2[0].id);
  card_index = card_index + 1;
}

//Try nested setinterval for more precise timing. 
function PlayCards() {
  console.log(imagesUsed.length)
    if(isPlaying){
      var increment = 10
      var loader_time = change_time/(100/increment)
      loaderId = setTimeout(function run() {
        if(imagesUsed.length == 54){
          pauseGame();
        }
        else{
          elem.style.width = width + '%';
          width= width+increment;
          if (width>=110){
            width= 0
            elem.style.width ='0%';
            if(imagesUsed ==0){
              document.getElementById(`card_cover`).style.visibility = 'hidden';
            }
            changeCard();
          }
          loaderId = setTimeout(run, loader_time)
        }
      },loader_time);
    } else {
      pauseGame();
    }

};

function ExitHistory(){
  pauseGame();
  document.getElementById(`history_div`).style.visibility = 'hidden';
  document.getElementById(`deck_id`).style.visibility = 'visible';
  PlayCards();
}


function startTimer(m, s) { 
    timer.textContent = m + ":" + s;
    if (s == 0) {
        if (m == 0) {
            return;
        } else if (m != 0) {
            m = m - 1;
            s = 60;
        }
    }
    
    s = s - 1;
    id = setTimeout(function () {
        startTimer(m, s)
    }, 1000);
}


function historyImgChange(HistoryCardNegIndex){
  if(imagesUsed.length !=0){
    img_id = imagesUsed[imagesUsed.length - HistoryCardNegIndex-1]
    img_go_to  = images.filter(i => i.id == img_id)
    used_cards_div.textContent = img_go_to[0].name
  }
  else{
    used_cards_div.textContent = 'No Cards Played Yet'
  }
  //document.getElementById(`deck_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/" + go_to +".jpg')"
}


function ShowHistory(){
  pauseGame();
  HistoryCardNegIndex = 0; //reset history index
  //console.log(imagesUsed.length)
  document.getElementById(`deck_id`).style.visibility = 'hidden'
  //If the game has lesss than 2 cards do not allow left or right navigation
  history_element.style.visibility = 'visible'
  history_right.style[`pointer-events`] = 'none'
  history_right.style.backgroundColor = 'lightgray'
  if(imagesUsed.length < 2) {
    history_left.style[`pointer-events`] = 'none'
    history_left.style.backgroundColor = 'lightgray'
  }
  else{
    history_left.style[`pointer-events`] = 'auto'
    history_left.style.backgroundColor = 'white'
  }
  historyImgChange(HistoryCardNegIndex)
 // history_element.textContent = card_index + "/" + images.length
  //document.getElementById(`deck_id`).className = 'history_id'
}


function HistoryBack(){
  HistoryCardNegIndex = HistoryCardNegIndex + 1 
  //console.log(imagesUsed.length)
  //console.log(HistoryCardNegIndex)
  if(HistoryCardNegIndex >= 0){
    history_right.style[`pointer-events`] = 'auto'
    document.getElementById(`history_right`).style.backgroundColor = 'white'
  }
  if(HistoryCardNegIndex <= 0){
    // console.log('turn off right')
     history_right.style[`pointer-events`] = 'none'
     document.getElementById(`history_right`).style.backgroundColor = 'lightgray'
   }
  if(HistoryCardNegIndex >= imagesUsed.length-1){
    //console.log('turn off left')
    history_left.style[`pointer-events`] = 'none'
    document.getElementById(`history_left`).style.backgroundColor = 'lightgray'
  }
  historyImgChange(HistoryCardNegIndex)
}


function HistoryNext(){
  HistoryCardNegIndex = HistoryCardNegIndex - 1
  if(HistoryCardNegIndex <= 0){
   // console.log('turn off right')
    history_right.style[`pointer-events`] = 'none'
    document.getElementById(`history_right`).style.backgroundColor = 'lightgray'
  }
  if(HistoryCardNegIndex < imagesUsed.length){
    //console.log('turn on left')
    history_left.style[`pointer-events`] = 'auto'
    document.getElementById(`history_left`).style.backgroundColor = 'white'
  }
  historyImgChange(HistoryCardNegIndex)
}

start_button.addEventListener("click", function() {
  document.getElementById("tutorial").style.display = "none";
  utils.LoadSounds(images);
  UpdateButton();
  PlayCards();
}, false);


function pauseGame() {
  clearTimeout(loaderId);
}


function resetGame() {
  clearTimeout(loaderId);
  imagesUsed = []; //reset imagesUsed to none
  images = utils.shuffle(images) //reshuffle images
  card_index= 0; //reset card position
  HistoryCardNegIndex = 0; //reset history index
  width=0; //loading bar width
  elem.style.width =width + '%'; //reset loading bar
  card_index_div.textContent = card_index + "/" + images.length; //reset card index text
  document.getElementById(`card_cover`).style.visibility = 'visible';
  document.getElementById(`deck_id`).style.backgroundImage = 'none';
  if(isPlaying){
    UpdateButton();
  }
}


reset_button.addEventListener("click", resetGame, false)
history_button.addEventListener("click", ShowHistory, false)
history_left.addEventListener("click", HistoryBack, false)
history_right.addEventListener("click", HistoryNext, false)
history_exit.addEventListener("click", ExitHistory, false)
let newDeck = new Deck()
newDeck.initialise();
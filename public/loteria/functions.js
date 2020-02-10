
import { returnCards } from './returnCards.js'
import * as utils from './utils.js'

var timer = document.getElementById("timer");
var card_index_div = document.getElementById("card_index_div")
var history_element = document.getElementById(`history_div`)
var used_cards_div = document.getElementById(`used_cards`)
var deck_id = document.getElementById(`used_cards`)
var elem = document.getElementById("progress_bar");
var loaderId;
var card_index = 0
var width=0;
var isPlaying = false;
var imagesUsed = [];
var HistoryCardNegIndex = 0
var images = returnCards()
var images2 = utils.shuffle(images)
var change_time = 2500 //in milliseconds 3500 is a good speed
var img_go_to;
var img_id;

function UpdateButton(){
  if(isPlaying){
    start_button.innerHTML = "PLAY"
  }
  else {
    start_button.innerHTML = "PAUSE"
  }
  isPlaying = !isPlaying;
}


function changeCard(){
  images2 = utils.filterUsedCards(images2, imagesUsed);
  //console.log(imagesUsed)
  card_index = card_index + 1
  card_index_div.textContent = card_index + "/" + images.length
  console.log( "'public/images/" + images2[card_index].src +".jpg'")
  document.getElementById(`deck_id`).style.backgroundImage = "url('http://silvioaburto.github.io/loteria/public/images/" + images2[card_index].src +".jpg')";
  utils.playSound(images2[card_index].name) 
  imagesUsed.push(images2[card_index].id)
}

//Try nested setinterval for more precise timing. 
function PlayCards() {
  //shuffle cards
  if(isPlaying){
    var increment = 10
    var loader_time = change_time/(100/increment)
    loaderId = setTimeout(function run() {
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
  //console.log(imagesUsed)
  //console.log(HistoryCardNegIndex)
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
  console.log(HistoryCardNegIndex)
  //console.log(imagesUsed)
  historyImgChange(HistoryCardNegIndex)
}

start_button.addEventListener("click", function() {
  utils.LoadSounds(images);
  UpdateButton();
  PlayCards();
}, false);


function pauseGame() {
  console.log("Pausing Game");
  clearInterval(loaderId);
}


function resetGame() {
  console.log("Game is starting over");
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

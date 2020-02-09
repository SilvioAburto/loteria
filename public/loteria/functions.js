
import { returnCards } from './returnCards.js'
import * as utils from './utils.js'

var timer = document.getElementById("timer");
var card_index_div = document.getElementById("card_index_div")
var history_element = document.getElementById(`history_div`)
var used_cards_div = document.getElementById(`used_cards`)
var elem = document.getElementById("progress_bar");
var loaderId;
var card_index = 0
var width=0;
var isPlaying = false;
var imagesUsed = [];
var HistoryCardNegIndex = 0
var images = returnCards()
var images2 = utils.shuffle(images)
var change_time = 1500 //in milliseconds 3500 is a good speed
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
  card_index_div.textContent = card_index + "/" + images2.length
  document.getElementById(`deck_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/" + images2[card_index].src +".jpg')"
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
        changeCard()
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
    //console.log(img_go_to[0].src)
    used_cards_div.textContent = img_go_to[0].name
    //console.log(HistoryCardNegIndex)
  }
  else{
    used_cards_div.textContent = 'No Cards Played Yet'
  }
 // var go_to = imagesUsed[(imagesUsed.length-1) - HistoryCardNegIndex]
 // console.log(go_to)
  //return(img_array.filter(i => !img_array_exclude.includes(i.id)))
  //document.getElementById(`deck_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/" + go_to +".jpg')"
}


function ShowHistory(){
  pauseGame();
  HistoryCardNegIndex = 0; //reset history index
  console.log(imagesUsed.length)
  document.getElementById(`deck_id`).style.visibility = 'hidden'
  history_left.style[`pointer-events`] = 'none'
  history_right.style[`pointer-events`] = 'none'
  document.getElementById(`history_left`).style.backgroundColor = 'lightgoldenrodyellow'
  document.getElementById(`history_right`).style.backgroundColor = 'lightgoldenrodyellow'
  history_element.style.visibility = 'visible'
  if(imagesUsed.Length == 0){
    //console.log("No image to show")
    used_cards_div.textContent = 'No Cards Played Yet'
  }
  if(imagesUsed.Length === 1){
    history_left.style[`pointer-events`] = 'none'
    document.getElementById(`history_left`).style.backgroundColor = 'lightgoldenrodyellow'
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
     document.getElementById(`history_right`).style.backgroundColor = 'lightgoldenrodyellow'
   }
  if(HistoryCardNegIndex >= imagesUsed.length-1){
    //console.log('turn off left')
    history_left.style[`pointer-events`] = 'none'
    document.getElementById(`history_left`).style.backgroundColor = 'lightgoldenrodyellow'
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
    document.getElementById(`history_right`).style.backgroundColor = 'lightgoldenrodyellow'
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
  document.getElementById(`deck_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/loteria_cover.jpg')"; //display cover image
  if(isPlaying){
    UpdateButton();
  }
}


reset_button.addEventListener("click", resetGame, false)
history_button.addEventListener("click", ShowHistory, false)
history_left.addEventListener("click", HistoryBack, false)
history_right.addEventListener("click", HistoryNext, false)
history_exit.addEventListener("click", ExitHistory, false)

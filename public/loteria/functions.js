
import { returnCards } from './returnCards.js'
import * as utils from './utils.js'

var timer = document.getElementById("timer");
var card_index_div = document.getElementById("card_index_div")
var loaderId;
var card_index = 0
let images = utils.shuffle(returnCards())
var width=0;
var elem = document.getElementById("progress_bar");
let change_time = 3500 //in milliseconds
var isPlaying = false;
var imagesUsed = []
var histDiv = document.getElementById("history_id");

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
  images = utils.filterUsedCards(images, imagesUsed)
  //console.log(images.length)
  //console.log(images.filter(i => !imagesUsed.includes(i.id)))
  card_index = card_index + 1
  card_index_div.textContent = card_index + "/" + images.length
  document.getElementById(`deck_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/" + images[card_index].src +".jpg')"
  imagesUsed.push(images[card_index].name)
  utils.playSound(images[card_index].name) 
  //console.log(imagesUsed)
}

//Try nested setinterval for more precise timing. 
function PlayCards() {
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

function ShowHistory(){
  pauseGame();
  document.getElementById(`deck_id`).style.visibility = 'hidden'
  document.getElementById(`history_div`).style.visibility = 'visible'
  //document.getElementById(`deck_id`).className = 'history_id'
}

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

function pauseGame() {
  console.log("Pausing Game");
  clearInterval(loaderId);
}


function resetGame() {
  console.log("Game is starting over");
  clearTimeout(loaderId);
  images = utils.shuffle(images) //reshuffle images
  card_index= 0; //reset card position
  width=0; //loading bar width
  elem.style.width =width + '%'; //reset loading bar
  card_index_div.textContent = card_index + "/" + images.length; //reset card index text
  document.getElementById(`deck_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/loteria_cover.jpg')"; //display cover image

}

start_button.addEventListener("click", function() {
  utils.LoadSounds(images);
  UpdateButton();
  PlayCards();
}, false);


reset_button.addEventListener("click", resetGame, false)
history_button.addEventListener("click", ShowHistory, false)
history_exit.addEventListener("click", ExitHistory, false)

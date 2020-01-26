
import { returnCards } from './returnCards.js'
import * as utils from './utils.js'

var timer = document.getElementById("timer");
var card_index_div = document.getElementById("card_index_div")
var countdown;
var loaderId;
var card_index = 0
let images = utils.shuffle(returnCards())
var width=0;
var elem = document.getElementById("progress_bar");
let change_time = 3500 //in milliseconds
var isPlaying = false;


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
  card_index = card_index + 1
  card_index_div.textContent = card_index + "/" + images.length
  document.getElementById(`img_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/" + images[card_index].src +".jpg')"
  utils.playSound(images[card_index].name) 
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
  clearInterval(countdown);
  clearInterval(loaderId);
  images = utils.shuffle(images)
  card_index= 0;
  width=0;
  elem.style.width =width + '%';
  card_index_div.textContent = card_index + "/" + images.length;
  document.getElementById(`img_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/loteria_cover.jpg')"

}

start_button.addEventListener("click", function() {
  utils.LoadSounds(images);
  UpdateButton();
  PlayCards();
}, false);


reset_button.addEventListener("click", resetGame, false)

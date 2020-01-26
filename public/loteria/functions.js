
import { returnCards } from './returnCards.js'

var timer = document.getElementById("timer");
var card_index_div = document.getElementById("card_index_div")
var countdown;
var loaderId;
var allAudio = [];
var card_index = 0
let images = returnCards()
var width=0;
var elem = document.getElementById("progress_bar");

function loadSound (sound_target, sound_id) {
  createjs.Sound.registerSound("public/sounds/" + sound_target + ".mp3", sound_id);
}

function playSound (sound_id) {
  createjs.Sound.play(sound_id);
}



//Shuffle array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


let change_time = 3500 //in milliseconds
images = shuffle(images)
//Load all the sounds at the beginning of the game
for(var i= 0; i < images.length; i++){
  allAudio[i] = images[i].src 
  loadSound(images[i].src, images[i].name)
}
//Try nested setinterval for more precise timing. 
function LoadingBar() {
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

};


function changeCard(){
  //Shuffle cards
  card_index = card_index + 1
  card_index_div.textContent = card_index + "/" + images.length
  document.getElementById(`img_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/" + images[card_index].src +".jpg')"
  playSound(images[card_index].name) 
    
  }

function changeCard2(){
  //Load all the sounds at the beginning of the game
  for(var i= 0; i < images.length; i++){
    allAudio[i] = images[i].src 
    loadSound(images[i].src, images[i].name)
  }
  //Shuffle cards
  images = shuffle(images)
  countdown = setTimeout(function flip() {

    //console.log("card index is " + card_index)
    card_index = card_index + 1
    card_index_div.textContent = card_index + "/" + images.length
    document.getElementById(`img_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/" + images[card_index].src +".jpg')"
    playSound(images[card_index].name) 

    countdown = setTimeout(flip, change_time)
  }, change_time);
    
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
  clearInterval(countdown);
  clearInterval(loaderId);
  images = shuffle(images)
  card_index= 0;
  width=0;
  elem.style.width =width + '%';
  card_index_div.textContent = card_index + "/" + images.length;
  document.getElementById(`img_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/loteria_cover.jpg')"

}

start_button.addEventListener("click", function() {
  LoadingBar()
}, false);

pause_button.addEventListener("click", pauseGame,false)
reset_button.addEventListener("click", resetGame, false)

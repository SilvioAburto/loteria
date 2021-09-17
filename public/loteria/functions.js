
import { returnCards } from './returnCards.js'
import * as utils from './utils.js'

//var timer = document.getElementById(`timer`);
var card_index_div = document.getElementById(`card_index_div`);
var card_timer_div = document.getElementById(`card_timer_div`)
var history_element = document.getElementById(`history_div`);
var used_cards_div = document.getElementById(`used_cards`);
var deck_id_div = document.getElementById(`deck_id`);
var pause_icon = document.getElementById(`pause_icon`);
var new_game = document.getElementById(`new_game`);
var exit_icon_history = document.getElementById(`exit_icon_history`);
var exit_icon_config = document.getElementById(`exit_icon_config`);
var left_icon = document.getElementById(`left_arrow_icon`);
var right_icon = document.getElementById(`right_arrow_icon`);
var config_div = document.getElementById(`config_div`);
var card_cover = document.getElementById(`card_cover`);
var images = returnCards();
var images2 = images;
var loaderId;
var card_index = 0;
var width=0;
var isPlaying = false;
var imagesUsed = [];
var HistoryCardNegIndex = 0;
var change_time = 3000; //in milliseconds 3500 is a good speed
var img_go_to;
var img_id;
var counter = 1;
var tutorial_up = true;
var config_up = false;
var history_up = false;
var clock = document.getElementById('clock');
var timer = null;  // The timer variable is null until the clock initializes
var seconds = 0;
var minutes = 0;
var hours = 0;


function Deck() {
}

Deck.prototype.initialise = function() {
  //getScreenSize();
  this.toggleTutorialButtons();
};


function UpdateStatus(){
  isPlaying = !isPlaying;
}

Deck.prototype.toggleTutorialButtons = function() {

  document.getElementById("skipButton").onclick = () => {
    document.getElementById("tutorial").style.display = "none";
    tutorial_up = false;
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
      document.getElementById("tutorial").innerHTML = `<h3><b>Welcome to La Loteria!</b></h3>
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
      <p>If the image chosen matches one of the images on your loteria board, mark it. This is traditionally done using a bean.</div>
      <div id="tutorialCounter">${counter}/5</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip</button>`
    } else if (counter === 4) {
      document.getElementById("tutorial").innerHTML = `<div class="tutorial_body">
      <p>The first person to complete all the cards on their board should shout 'LA LOTERIA!' to win the game.</p></div>
      <div id="tutorialCounter">4/5</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip</button>`
    } else if (counter === 5) {
      document.getElementById("tutorial").innerHTML = `
      <div class="tutorial_body"><h3><b>Enjoy!</b></h3><p>I had a lot of fun writing this website, I hope you enjoy it as well.</p>
      <p>See the source code <a href="https://github.com/SilvioAburto/loteria">here</a>.
      <p>Check out my Blog <a href="https://silvioaburto.github.io">here</a>! </p> 
      <p>Instagram account <a href="https://www.instagram.com/silviortizz/">here</a>! </p> 
      </div>
      <div id="tutorialCounter">${counter}/5</div><button id="finishButton" class="btn btn-default navbar-btn" type="button">Finish</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip</button>`
      document.getElementById("finishButton").onclick = () => {
        document.getElementById("tutorial").style.display = "none";
      }
      tutorial_up = false;
    }
  }

};


function handleClock(){
  console.log("running clock handler");
  console.log(timer);
  if(timer !== null){
    clearInterval(timer);  // Cancel the timer
    timer = null;  // Reset the timer because the clock is now not ticking.
  } else {
    timer = setInterval(updateClock, 1000);
  }
}

function formatClock(n){
  return n > 9 ? "" + n: "0" + n;
}

function updateClock() {
    console.log("running clock update");
    seconds += 1;
    if(seconds > 60){
      seconds = 0;
      minutes +=1;
    }
    if(minutes > 60){
      minutes = 0;
      hours +=1;
    }
    if(hours > 1){
      clock.innerText = formatClock(hours) + ':'+formatClock(minutes)+':'+ formatClock(seconds);
    }
    else{
      clock.innerText = formatClock(minutes)+':'+ formatClock(seconds);
    } 
}


function changeCard(){
  images2 = utils.filterUsedCards(images2, imagesUsed); //Remove used images
  if(card_index === 0){
    card_cover.style.visibility = 'hidden';
    images2 = utils.shuffle(images2)
  }
  card_index_div.textContent = (card_index+1) + "/" + images.length;
  var imgPath = "http://silvioaburto.github.io/loteria/public/images/" + images2[0].src +".jpg"
  console.log(imgPath);
  document.getElementById('deck_id').setAttribute("style", "background-image:url("+imgPath+") !important");
  //document.getElementById(`deck_id`).style.backgroundImage = "url('http://silvioaburto.github.io/loteria/public/images/" + images2[0].src +".jpg')";
  utils.playSound(images2[0].name); 
  imagesUsed.push(images2[0].id);
  card_index = card_index + 1;
}

function showHidePauseIcon() {
  pause_icon.style.visibility = "visible";
  setTimeout(() => pause_icon.style.visibility = "hidden", 100)
}

//Try a nested setinterval for more precise timing. 
function PlayCards() {
  if(isPlaying){
      console.log("playing game")
      console.log("Card Index" + card_index)
      document.getElementById("play_icon").style.visibility = "hidden";
      showHidePauseIcon();
      var increment = 1;
      var loader_time = change_time/(100/increment);
      console.log("Loader Time" + loader_time)
      var progress = $('progress');
      loaderId = setTimeout(function run() {
        if(imagesUsed.length == 54){
          pauseGame();
        }
        else{
          width= progress.val()+increment;
          progress.val(width);
          if (width > 100){
            width = 0
            if(imagesUsed===0){
              card_cover.style.visibility = 'hidden';
            }
            changeCard();
            progress.val(progress.attr('min'))
          }
          loaderId = setTimeout(run, loader_time)
        }
      },loader_time);
    } else {
      document.getElementById("play_icon").style.visibility = "visible";
      pauseGame();
    }

};

function ExitHistory(){
  pauseGame();
  history_up = false;
  document.getElementById(`history_div`).style.visibility = 'hidden';
  document.getElementById(`deck_id`).style.visibility = 'visible';
  PlayCards();
}


//startTime
var timePassed = 0;

//Run Timer
var runTimer = function() {
    card_timer_div.textContent = ++justSomeNumber
    console.log(++justSomeNumber);
};

function updateTimer(){
  var timePassed;
  var timeParsed;
  timePassed = ++justSomeNumber;
  if(timePassed < 100){
    timeParsed = '00:00:'+ timePassed
  }
  else if(timePassed > 100)
    card_timer_div.textContent =  ++justSomeNumber
}

function historyImgChange(HistoryCardNegIndex){
  if(imagesUsed.length !=0){
    img_id = imagesUsed[imagesUsed.length - HistoryCardNegIndex-1]
    img_go_to  = images.filter(i => i.id == img_id)
    var img_url = "url('https://silvioaburto.github.io/la_loteria/img/" + img_go_to[0].src +".jpg')"
    console.log(img_url)
    history_element.style.backgroundImage = img_url
  }
  else{
    used_cards_div.textContent = 'No Cards Played Yet'
  }
}

function changeSpeed(speed){
  change_time = speed*1000;
}

function getSpeed(){
  console.log("hello")
  var radioElements = document.getElementsByName("speed")
  var checkedFlag = true;
  var counter = 0;
  while(checkedFlag){
    if(radioElements[counter].checked){
      checkedFlag = false;
      return radioElements[counter].value;
    }
    else{
      counter++;
    }
  }
}


function CloseConfig(save){
  if(save){
    if(card_index === 0){
      card_cover.style.visibility = 'visible';
    }
    config_div.style.visibility = 'hidden';
    document.getElementById(`deck_id`).style.visibility = 'visible';
    right_icon.style.visibility = 'visible';
    left_icon.style.visibility = 'visible';
    config_up = false;
    var newSpeed = getSpeed()
    changeSpeed(newSpeed);
    PlayCards();
    handleClock();
  }
  else{
    if(card_index === 0){
      card_cover.style.visibility = 'visible';
    }
    var radioElements = document.getElementsByName("speed")
    radioElements[(change_time/1000)-1].checked= true
    config_div.style.visibility = 'hidden';
    document.getElementById(`deck_id`).style.visibility = 'visible';
    right_icon.style.visibility = 'visible';
    left_icon.style.visibility = 'visible';
    config_up = false;
    handleClock();
    PlayCards();
  }
}


function OpenConfig(){
  config_up = true;
  pauseGame();
  document.getElementById(`play_icon`).style.visibility = "hidden";
  document.getElementById(`deck_id`).style.visibility = 'hidden';
  history_element.style.visibility = 'hidden'
  card_cover.style.visibility = 'hidden';
  right_icon.style.visibility = "hidden";
  left_icon.style.visibility = 'hidden';
  config_div.style.visibility = 'visible'
}


function ShowHistory(){
  history_up = true;
  pauseGame();
  document.getElementById("play_icon").style.visibility = "hidden";
  HistoryCardNegIndex = 0; //reset history index
  document.getElementById(`deck_id`).style.visibility = 'hidden'
  //If the game has lesss than 2 cards do not allow left or right navigation
  history_element.style.visibility = 'visible'
  right_icon.style[`pointer-events`] = 'none'
  right_icon.style.color = 'lightgray'
  if(imagesUsed.length < 2) {
    left_icon.style[`pointer-events`] = 'none'
    left_icon.style.color = 'lightgray'
  }
  else{
    left_icon.style[`pointer-events`] = 'auto'
    left_icon.style.color = 'lightblue'
  }
  historyImgChange(HistoryCardNegIndex)

}


function HistoryBack(){
  HistoryCardNegIndex = HistoryCardNegIndex + 1 
  if(HistoryCardNegIndex >= 0){
    right_icon.style[`pointer-events`] = 'auto'
    right_icon.style.color = 'lightblue'
  }
  if(HistoryCardNegIndex <= 0){
    // console.log('turn off right')
     right_icon.style[`pointer-events`] = 'none'
     right_icon.style.color = 'lightgray'
   }
  if(HistoryCardNegIndex >= imagesUsed.length-1){
    //console.log('turn off left')
    left_icon.style[`pointer-events`] = 'none'
    left_icon.style.color = 'lightgray'
  }
  historyImgChange(HistoryCardNegIndex)
}


function HistoryNext(){
  HistoryCardNegIndex = HistoryCardNegIndex - 1
  if(HistoryCardNegIndex <= 0){
   // console.log('turn off right')
    right_icon.style[`pointer-events`] = 'none'
    right_icon.style.color = 'lightgray'
  }
  if(HistoryCardNegIndex < imagesUsed.length){
    //console.log('turn on left')
    left_icon.style[`pointer-events`] = 'auto'
    left_icon.style.color = 'lightblue'
  }
  historyImgChange(HistoryCardNegIndex)
}


function pauseGame() {
  clearTimeout(loaderId);
  clearInterval(timer);
}

function resetGame() {
  if(confirm("Are you sure?")){
    var progress = $('progress')
    clearInterval(timer);
    clearTimeout(loaderId);
    imagesUsed = []; //reset imagesUsed to none
    images = utils.shuffle(images) //reshuffle images
    card_index= 0; //reset card position
    HistoryCardNegIndex = 0; //reset history index
    progress.val(progress.attr('min')) //reset loading bar
    card_index_div.textContent = card_index + "/" + images.length; //reset card index text
    config_div.style.visibility = 'hidden';
    document.getElementById(`deck_id`).style.visibility = 'visible';
    card_cover.style.visibility = 'visible';
    right_icon.style.visibility = 'visible';
    left_icon.style.visibility = 'visible';
    document.getElementById(`deck_id`).style.backgroundImage = "none";
    config_up = false;
    if(isPlaying){
      UpdateStatus();
    }
  }
  else{return;}
}


function handleCardEvent(){
  var event_type = event.target.id
  if(tutorial_up === false){
    if(event_type === 'deck_id' | event_type === 'play_icon' | event_type === 'card_cover'){
      document.getElementById("tutorial").style.display = "none";
      utils.LoadSounds(images);
      handleClock();
      UpdateStatus();
      PlayCards();
    }
    else if(event_type === 'history_icon'){
      ShowHistory()
    }
    else if (event_type === 'config_icon'){
      OpenConfig()
    }
    else{return}
  }
  else{return;}
}

function handleKeyEvent(event){
  var key_id = event.key
  if(tutorial_up === false & config_up === false & history_up === false){
    if(key_id === " "){
      document.getElementById("tutorial").style.display = "none";
      utils.LoadSounds(images);
      UpdateStatus();
      PlayCards();
      handleClock();
    }
  }
  else{return;}
}


var radioButtons = document.radioForm.speed;
var prev = null;
for(var i=0; i < radioButtons.length; i++){
 // radioButtons[i].addEventListener("change",changeSpeed, false)
}


var config_save_exit = document.getElementById(`config_save_exit`)

window.addEventListener("keydown", (event) => {handleKeyEvent(event)}, false);
new_game.addEventListener("click", resetGame, false);
deck_id_div.addEventListener("click", handleCardEvent, false);
exit_icon_config.addEventListener("click", () => CloseConfig(false), false);
config_save_exit.addEventListener("click", () => CloseConfig(true), false)
left_icon.addEventListener("click", HistoryBack, false)
right_icon.addEventListener("click", HistoryNext, false)
exit_icon_history.addEventListener("click", ExitHistory, false)

let newDeck = new Deck()
newDeck.initialise();
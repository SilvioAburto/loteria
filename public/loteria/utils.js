
export function LoadSounds(card_array){
    var allAudio = [];
    function loadSound (sound_target, sound_id) {
        createjs.Sound.registerSound("public/sounds/" + sound_target + ".mp3", sound_id);
      }
    //Load all the sounds at the beginning of the game
    for(var i= 0; i < card_array.length; i++){
      allAudio[i] = card_array[i].src 
      loadSound(card_array[i].src, card_array[i].name)
    }

  }


export function playSound (sound_id) {
    createjs.Sound.play(sound_id);
}


export function shuffle(array) {
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

export function filterUsedCards(img_array, img_array_exclude){
  return(img_array.filter(i => !img_array_exclude.includes(i.id)))
}
//deprecated
/*
function changeCard2(){
    //Shuffle cards
    images = utils.shuffle(images)
    countdown = setTimeout(function flip() {
  
      //console.log("card index is " + card_index)
      card_index = card_index + 1
      card_index_div.textContent = card_index + "/" + images.length
      document.getElementById(`img_id`).style.backgroundImage = "url('https://silvioaburto.github.io/la_loteria/img/" + images[card_index].src +".jpg')"
      playSound(images[card_index].name) 
  
      countdown = setTimeout(flip, change_time)
    }, change_time);
      
    }
    */
   
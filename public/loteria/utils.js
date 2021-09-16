
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

export function loteriaTimer(t){
    var t0 =(new Date ()).valueOf();
    var diff = t -t0
    console.log(diff)
    if(timeStart){
      var t = (new Date ()).valueOf();
    }
}
/*
 * Self-adjusting interval to account for drifting
 * 
 * @param {function} workFunc  Callback containing the work to be done
 *                             for each interval
 * @param {int}      interval  Interval speed (in milliseconds) - This 
 * @param {function} errorFunc (Optional) Callback to run if the drift
 *                             exceeds interval
*/
/*Source https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript */ 


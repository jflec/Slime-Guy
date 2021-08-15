
// Importing slime sounds
let slimeSoundOne = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
let slimeSoundTwo = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
let slimeSoundThree = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
let slimeSoundFour = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3");

// Adjusting slime sound volumes

let slimeVolume = 0.1;
slimeSoundOne.volume = slimeVolume;
slimeSoundTwo.volume = slimeVolume;
slimeSoundThree.volume = slimeVolume;
slimeSoundFour.volume = slimeVolume;

// Pushing slime sounds into an array

let slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour];

// Returning random slime sound when called

function sample(array) {
    return array[Math.floor ( Math.random() * array.length )]
}

export function slimeSoundPlay() {
    sample(slimeSounds).play();
}

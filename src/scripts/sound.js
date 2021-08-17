let muted = true;

// Importing background music

let backgroundMusicOne   = new Audio("../src/sounds/background_music/A Lonely Cherry Tree 🌸.mp3");
let backgroundMusicTwo   = new Audio("../src/sounds/background_music/Hello, it's Me!.mp3");
let backgroundMusicThree = new Audio("../src/sounds/background_music/Melancholic Walk.mp3");
let backgroundMusicFour  = new Audio("../src/sounds/background_music/No Destination.mp3");
let backgroundMusicFive  = new Audio("../src/sounds/background_music/Ready Pixel One.mp3");
let backgroundMusicSix   = new Audio("../src/sounds/background_music/Run As Fast As You Can.mp3");
let backgroundMusicSeven = new Audio("../src/sounds/background_music/The search.mp3");
let backgroundMusicEight = new Audio("../src/sounds/background_music/Welcome Space Traveler.mp3");

let backgroundMusic = [backgroundMusicOne, backgroundMusicTwo, backgroundMusicThree, backgroundMusicFour,
                       backgroundMusicFive, backgroundMusicSix, backgroundMusicSeven, backgroundMusicEight];

// Importing slime sounds

let slimeSoundOne   = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
let slimeSoundTwo   = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
let slimeSoundThree = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
let slimeSoundFour  = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3");

// Adjusting slime sound volumes

let slimeVolume = 0.05;
slimeSoundOne.volume   = slimeVolume;
slimeSoundTwo.volume   = slimeVolume;
slimeSoundThree.volume = slimeVolume;
slimeSoundFour.volume  = slimeVolume;

// Pushing slime sounds into an array

let backgroundMusicVolume = 0.1;

backgroundMusicOne.volume   = backgroundMusicVolume;
backgroundMusicTwo .volume  = backgroundMusicVolume;
backgroundMusicThree.volume = backgroundMusicVolume;
backgroundMusicFour.volume  = backgroundMusicVolume;
backgroundMusicFive.volume  = backgroundMusicVolume;
backgroundMusicSix.volume   = backgroundMusicVolume;
backgroundMusicSeven.volume = backgroundMusicVolume;
backgroundMusicEight.volume = backgroundMusicVolume;

let slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour];

// Returning random slime sound when called

function sample(array) {
    return array[Math.floor ( Math.random() * array.length )]
}

export function slimeSoundPlay() {
    if (!muted) sample(slimeSounds).play();
}

export function backgroundMusicPlay() {
    if (!muted) sample(backgroundMusic).play();
}
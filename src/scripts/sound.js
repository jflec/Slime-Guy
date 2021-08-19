// let muted = true;
// let songRunning = false;

// // const menu = document.querySelector(".menu")
// // console.log(menu)
// // const menuList = menu.querySelector(".menu-list")


// // Importing background music

// let backgroundMusicOne   = new Audio("../src/sounds/background_music/A Lonely Cherry Tree 🌸.mp3");
// let backgroundMusicTwo   = new Audio("../src/sounds/background_music/Hello, it's Me!.mp3");
// let backgroundMusicThree = new Audio("../src/sounds/background_music/Melancholic Walk.mp3");
// let backgroundMusicFour  = new Audio("../src/sounds/background_music/No Destination.mp3");
// let backgroundMusicFive  = new Audio("../src/sounds/background_music/Ready Pixel One.mp3");
// let backgroundMusicSix   = new Audio("../src/sounds/background_music/Run As Fast As You Can.mp3");
// let backgroundMusicSeven = new Audio("../src/sounds/background_music/The search.mp3");
// let backgroundMusicEight = new Audio("../src/sounds/background_music/Welcome Space Traveler.mp3");

// let backgroundMusic = [backgroundMusicOne, backgroundMusicTwo, backgroundMusicThree, backgroundMusicFour,
//                        backgroundMusicFive, backgroundMusicSix, backgroundMusicSeven, backgroundMusicEight];

// // Importing slime sounds
// let slimeSoundOne    = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
// let slimeSoundTwo    = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
// let slimeSoundThree  = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
// let slimeSoundFour   = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3");
// let slimeSoundFive   = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
// let slimeSoundSix    = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
// let slimeSoundSeven  = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
// let slimeSoundEight  = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3");

// // Adjusting slime sound volumes
// let slimeVolume = 0.05;
// slimeSoundOne.volume    = slimeVolume;
// slimeSoundTwo.volume    = slimeVolume;
// slimeSoundThree.volume  = slimeVolume;
// slimeSoundFour.volume   = slimeVolume;
// slimeSoundFive.volume   = slimeVolume;
// slimeSoundSix.volume    = slimeVolume;
// slimeSoundSeven.volume  = slimeVolume;
// slimeSoundEight.volume  = slimeVolume;

// // Pushing slime sounds into an array
// let slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour, slimeSoundFour,
//     slimeSoundFive, slimeSoundSix, slimeSoundSeven, slimeSoundEight];

// // let backgroundMusicVolume = 1;

// // backgroundMusicOne.volume   = backgroundMusicVolume;
// // backgroundMusicTwo .volume  = backgroundMusicVolume;
// // backgroundMusicThree.volume = backgroundMusicVolume;
// // backgroundMusicFour.volume  = backgroundMusicVolume;
// // backgroundMusicFive.volume  = backgroundMusicVolume;
// // backgroundMusicSix.volume   = backgroundMusicVolume;
// // backgroundMusicSeven.volume = backgroundMusicVolume;
// // backgroundMusicEight.volume = backgroundMusicVolume;



// // Returning random slime sound when called

// function sample(array) {
//     return array[Math.floor ( Math.random() * array.length )]
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const slider = document.getElementById("music");

// slider.addEventListener('change', function() {
//     let currentSong = sample(backgroundMusic)
//     backgroundMusicPlay(currentSong)
//     currentSong.volume = this.value / 100;
//     console.log(this.value / 100)
//     })
// })

// export function slimeSoundPlay() {
//     if (!muted) sample(slimeSounds).play();
// }

// export function backgroundMusicPlay(currentSong) {
//     if (!songRunning) {
//         songRunning = true;
//         if (!muted) {
//             currentSong.play();
//         }
//     }
    
// }

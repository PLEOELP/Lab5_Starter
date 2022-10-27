// expose.js

window.addEventListener('DOMContentLoaded', init);

const jsConfetti = new JSConfetti();

function init() {
  read_option();
  read_sound();
}

function read_option(){
  let image = document.querySelector("img");
  let sound = document.querySelector("audio");
  let image_option = document.getElementById("horn-select");
  image_option.addEventListener("change", (event) =>{
    let img_name = event.target.value;
    if (img_name == "air-horn"){
      image.src = "assets/images/air-horn.svg";
      sound.src = "assets/audio/air-horn.mp3";
    }
    if (img_name == "car-horn"){
      image.src = "assets/images/car-horn.svg";
      sound.src = "assets/audio/car-horn.mp3";
    }
    if (img_name == "party-horn"){
      image.src = "assets/images/party-horn.svg";
      sound.src = "assets/audio/party-horn.mp3";
    }
  });
}

function read_sound(){
  let volume_controls = document.getElementById("volume-controls");
  let sound = document.querySelector("audio");
  let sound_option = document.getElementById("horn-select");
  let play_sound = document.querySelector("button");
  
  volume_controls.addEventListener("change",(event)=>{
    let volume_level = event.target.value;
    let volume_level_img = document.querySelector("#volume-controls > img");
    sound.volume = volume_level/100;
    if (volume_level == 0){
      volume_level_img.src = "assets/icons/volume-level-0.svg";
    }
    else if (volume_level < 33){
      volume_level_img.src = "assets/icons/volume-level-1.svg"; 
   
    }
    else if (volume_level < 67){
      volume_level_img.src = "assets/icons/volume-level-2.svg";
    }
    else{
      volume_level_img.src = "assets/icons/volume-level-3.svg";    
    } 
  })

  play_sound.addEventListener("click", (event)=>{
    if (sound.volume != 0) {
      if (sound_option.value == "party-horn") {
          jsConfetti.addConfetti();
      }
      sound.play();
    }
  })
}
// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  // Create list of voices for selection
  const synth = window.speechSynthesis;
  const voiceSelect = document.querySelector("select");

  let voices = [];

  function populateVoiceList(){
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++){
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default){
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }


  // read input text and option and speak
  const input_text = document.querySelector("textarea");
  const changing_image = document.querySelector("img");
  const press_to_speak = document.querySelector("button");

  press_to_speak.addEventListener("click", (event)=>{
    const speak_unit = new SpeechSynthesisUtterance(input_text.value);

    speak_unit.addEventListener("start", (event)=>{
      changing_image.src = "assets/images/smiling-open.png";
    })

    speak_unit.addEventListener("end", (event)=>{
      changing_image.src = "assets/images/smiling.png";
    })    

    const selected_option = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length; i++){
      if (voices[i].name === selected_option){
        speak_unit.voice = voices[i];
        break;
      }
    }
    synth.speak(speak_unit);
  })




}


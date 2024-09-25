const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis; // tarayıcı tarafından sağlanan speechSynthesis APİ
let isSpeaking = true; // konuşma durumunnu takip eden değişken

voices();

function voices(){
    // tarayıcının mevcut seçeneklerini alıp, açılır listeye ekleyen fonksiyon

    for(let voice of synth.getVoices()){
        let selected = voice.name == "Google US English" ? "selected" : ""; // başlangıçta ingilizce seçili olsun
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

// ses seçenekleri değiştiğinde sesleri tekrar listeler
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    //metni sesli olarak konuşan fonksiyon
    let utterance = new SpeechSynthesisUtterance(text);

    for(let voice of synth.getVoices()){
        if (voice.name === voiceList.value) {
            utterance.voice = voice; // açılır listeleden seçilen ses ile okur
        }
    }

    utterance.addEventListener('end', ()=> {
        isSpeaking = false;
        document.querySelector(".placeholder").style.display = "none";
    });

  synth.speak(utterance);
  isSpeaking = true;
}

speechBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    if(textarea.value !==""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
            document.querySelector(".placeholder").style.display = "block";
        }
    }
})
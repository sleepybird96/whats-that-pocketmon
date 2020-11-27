const answerFilm = document.querySelector('.answerFilm')
const allAnswer = document.querySelectorAll('.answer')
const questZone = document.querySelector('.questZone')
const left = document.querySelector('#leftArrow')
const right = document.querySelector('#rightArrow')
const modal = document.querySelector('#modal')
const fact = document.querySelector('.fact')
const realFact = document.querySelector('.realFact')
const answerIs = document.querySelector('strong')
const audio = document.querySelector('audio')
const startModal = document.querySelector('#gameStart')
const start = document.querySelector('a')
const resultQuest = document.querySelector('h2')

//부모의 막내 document.querySelector('#modal').lastElementChild

let answerFilmLength = document.querySelectorAll('.answer').length;

let current = 1;

let dragSrc = allAnswer[0].src.split('/')[allAnswer[0].src.split('/').length - 1]
let currentSrc = document.querySelectorAll('.quest')[0].src.split('/')[allAnswer[0].src.split('/').length - 1]

function answerSlideShow () {
  if(current > answerFilmLength){
    current = 1;
  }else if(current < 1){
    current = answerFilmLength;
  }
  answerFilm.style.transition = '500ms';
  answerFilm.style.transform = `translateX(-${(current - 1) * 100}%)`
}

function playTheme () {
  audio.play();
}

left.onclick = function(){
  current--;
  answerSlideShow();
}
right.onclick = function(){
  current++;
  answerSlideShow();
}

function answerPrint(pocketmon){
  if(pocketmon === 'cat'){
    return '냐옹이'
  }
  if(pocketmon === 'pigeon'){
    return '피죤'
  }
  if(pocketmon === 'phantom'){
    return '팬텀'
  }
  if(pocketmon === 'mutes'){
    return '뮤츠'
  }
  if(pocketmon === 'ghost'){
    return '고스트'
  }
}

for(el of allAnswer){
  el.ondrag = function(){
    dragSrc = event.target.src.split('/')[event.target.src.split('/').length - 1]
    currentSrc = document.querySelectorAll('.quest')[0].src.split('/')[allAnswer[0].src.split('/').length - 1]
  }
}
function printAnswer(result){
  let name = currentSrc.replace('.png','');
  fact.src = document.querySelectorAll('.quest')[0].src;
  realFact.src = fact.src.replace('.png','-original.png');
  resultQuest.textContent = result;
  answerIs.textContent = answerPrint(name);
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 500);
  setTimeout(() => {
    realFact.style.opacity = '1';
    answerIs.style.opacity = '1';
  }, 1000); 
  document.querySelectorAll('.quest')[0].remove();
  setTimeout(() => {
    answerIs.style.opacity = '0';
    realFact.style.opacity = '0';
    modal.style.opacity = '0';
  }, 3500);
  setTimeout(() => {
    playTheme();
  }, 3100);
  setTimeout(() => {
    modal.style.display = 'none';
  }, 4000);
  answerSlideShow();
}

//드롭허용!
questZone.ondragover = function(){
  event.preventDefault();
}
questZone.ondrop = function(){
  event.preventDefault();
  let result ='정답입니다!';
  if(dragSrc === currentSrc){
    printAnswer(result);
  }else{
    result = '땡! 틀렸습니다!';
    printAnswer(result);
  }
  if(document.querySelectorAll('.quest').length === 0){
    setTimeout(() => {
      modal.style.display = 'grid';
      modal.style.opacity = '1';
      modal.style.placeItems = 'center'
      document.querySelector('h2').textContent = '모든 문제를 다 맞추셨습니다!'
      document.querySelector('h3').textContent = '축하드립니다!'
      realFact.style.display = 'none';
      fact.style.display = 'none';
    }, 4200); 
  }
}
start.onclick = function(){
  startModal.style.display = 'none';
  playTheme();
}
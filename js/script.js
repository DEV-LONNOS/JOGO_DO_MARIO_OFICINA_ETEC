///////////////////////////////////////////////////////////////////////////////////
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const cloud = document.querySelector('.cloud')
const textStart = document.querySelector('#text-start')

const audioStart = new Audio('./audio/theme.mp3')
const audioGameOver = new Audio('./audio/gameover.mp3')
let isStart = false

const scoreElement = document.querySelector('#score')

let score = 0
////////////////////////////////////////////////////////////////////////////////////
//função Start//
function start() {
    textStart.getElementsByClassName.color = "#ececec"
    pipe.classList.add('pipe-animation')
    cloud.classList.add('cloud-animation')
    textStart.innerHTML = "<strong>Para Pular, Precione Espaço</strong>"
    isStart = true
    playAudioStart()

    scoreInterval = setInterval(() => {
        score++
        scoreElement.textContent = score


    }, 1000) //Adiciona 1 ponto a cada segundo


}
////////////////////////////////////////////////////////////////////////////////////
//Função Pular//
function jump() {
    mario.classList.add('jump')
    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500)
}
////////////////////////////////////////////////////////////////////////////////////
//Início Função Audio//
function playAudioStart() {
    audioStart.play();

}
function playAudioGameOver() {
    audioGameOver.play();

}
function stopAudioStart() {
    audioStart.pause();

}
function stopAudio() {
    audioGameOver.pause();

}
//Fim Função Audio//
/////////////////////////////////////////////////////////////////////////////////////

//Incluir Keydown e Start do game//
document.addEventListener('keydown', (Event) => {

    if (Event.code === 'Space' && isStart == true) {
        jump()
    }
    else if (Event.code === "KeyS") {
        start();
    }
})
//////////////////////////////////////////////////////////////////////////////////////

//Evento de Fim de Jogo//
const loop = setInterval(() => {
    let pipePosition = pipe.offsetLeft;
    let cloudPosition = cloud.offsetLeft;
    let marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`;
        cloud.style.animation = 'none'
        cloud.style.left = `${cloudPosition}px`;
        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '20px';

        textStart.style.color = 'black';
        textStart.innerHTML = "<strong>GAME OVER</strong>";

        stopAudioStart();

        playAudioGameOver();

        setTimeout(stopAudio, 8000);
        clearInterval(loop);
        clearInterval(scoreInterval);
        
        //Recarregar a tela//
        setTimeout(function (){   
          location.reload();


        }, 9000);


    }

}, 10);
///////////////////////////////////////////////////////////////////////////////////////
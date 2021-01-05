// challenge 1: your age in days
function ageindays(){
    var birthyear = prompt("what year where u born?");
    var ageindaysss = (2021-birthyear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('you are ' + ageindaysss + ' days old');
    h1.setAttribute('id', 'ageindays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('ageindays').remove();
}

//challenge 2
function generatecat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-box-cat');
    image.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//challenge 3: rock,paper,scissors
function rpsgame(yourchoice) {
    console.log(yourchoice);
    var humanchoice, botchoice;
    humanchoice = yourchoice.id;
    botchoice = numbTochoice(randtoRPSint());
    console.log('computer choice:', botchoice)
    results = decideWinner(humanchoice, botchoice); //[0,1] human lost | bot won
    console.log(results);
    message = finalMessage(results); //{'mesage': 'You won!', 'color': 'green'} object(JS), Dictionary(Python)
    console.log(message)
    rpsFrontEnd(yourchoice.id, botchoice, message);

}

function randtoRPSint(){
    return Math.floor(Math.random() * 3);
}

function numbTochoice(number){
    return['rock', 'paper', 'scissors'][number];
}

function decideWinner(humanchoice, botchoice){
    var RPSdatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };

    var yourscore = RPSdatabase[humanchoice][botchoice];
    var compscore = RPSdatabase[botchoice][humanchoice];

    return [yourscore, compscore];
}

function finalMessage([yourscore, compscore]) {
    if (yourscore === 0) {
        return {'message': 'You Lost', 'color': 'red'};
    }else if(yourscore === 0.5) {
        return {'message': 'Game Tied', 'color': 'orange'};
    }else {
        return {'message': 'You Won', 'color': 'green'};
    }
    
}

function rpsFrontEnd(humanimagechoice, botchoiceImage, finalMessage) {
    var imagesdatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // removing of all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humandiv = document.createElement("div");
    var botdiv = document.createElement("div");
    var messagediv = document.createElement("div");
    
    humandiv.innerHTML = "<img src='" + imagesdatabase[humanimagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messagediv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
    botdiv.innerHTML = "<img src='" + imagesdatabase[botchoiceImage] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24 , 1);'>"
    
    document.getElementById("flex-box-rps-div").appendChild(humandiv);
    document.getElementById("flex-box-rps-div").appendChild(messagediv);
    document.getElementById("flex-box-rps-div").appendChild(botdiv);


}
//Challenge 4: change the color of all the buttons!
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(btingy) {
    if (btingy.value === 'red') {
        buttonsRed();
    }else if (btingy.value === 'green') {
        buttonsGreen();
    }else if (btingy.value === 'reset') {
        buttonsReset();
    }else if (btingy.value === 'random') {
        buttonRandom();
    }
}

function buttonsRed() {
    for (let i=0; 1 < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonsReset() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
function buttonRandom(){
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    
    for (let i=0; i < all_buttons.length; i++) {
        let randomnumber = Math.floor(Math.random() * 4); //dont keep this outside of the for loop it will not run for every iteration
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomnumber]);
    }
}

//Challenge 5:blackjack
let blackjackGame = {
    'you': {'scorespan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scorespan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']


const hitsound = new Audio('static/sounds/swish.m4a');
const windSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aww.mp3')


document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackhit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
         console.log(card);
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
   }
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitsound.play();
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function blackjackDeal() {
    
    if (blackjackGame['turnsOver'] === true){

        blackjackGame['isStand'] = false;

        let yourimages = document.querySelector("#your-box").querySelectorAll('img');
        let dealerimages = document.querySelector("#dealer-box").querySelectorAll('img');

        for (i=0; i < yourimages.length; i++) {
            yourimages[i].remove();
        }

        for (i=0; i < dealerimages.length; i++) {
            dealerimages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;


        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector("#your-blackjack-result").style.color = '#ffffff';
        document.querySelector("#dealer-blackjack-result").style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }


}


function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';

    }else {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        showResult();
        await sleep(1000);
    }    
    
     blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

//compute winner and return who just won
//update the wins, draws, losses
function computeWinner() {
     let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        }else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        }else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
            
        }

        // condition: when you bust but dealer doesnt

     }else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

    // you and dealer both bust
     } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;

     }
     console.log(blackjackGame);
     return winner;
}


function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true){
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            windSound.play();

        }else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];

            message = 'you lost!';
            messageColor = 'red';
            lossSound.play();
            
        }else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];

            message = 'You drew!';
            messageColor = 'black;';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}


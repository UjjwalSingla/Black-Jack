/****************************/
/**********BLack Jack********/
/***Author: Ujjwal Singla****/
/****************************/

let blackjack = {
    'you': { 'scorespan': '#youscore', 'div': '#mybox', 'score': 0 },
    'dealer': { 'scorespan': '#dealerscore', 'div': '#botbox', 'score': 0 }
}
const you = blackjack['you'];
const dealer = blackjack['dealer'];
const hitsound = new Audio('sounds/swish.m4a');
const lossound = new Audio('sounds/aww.mp3');
const winsound = new Audio('sounds/cash.mp3');
document.querySelector('#hit').addEventListener('click', hitbutton);
document.querySelector('#stand').addEventListener('click', standbutton);
document.querySelector('#stand').disabled = true;
document.querySelector('#deal').addEventListener('click', deal);




function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function hitbutton() {
    cardvalue = showcard(you);
    updatescore(you, cardvalue);
    burst(you);
    hitsound.play();
    document.querySelector('#stand').disabled = false;
    document.querySelector('#deal').disabled = true;

}

function standbutton() {
    document.querySelector('#hit').disabled = true;
    document.querySelector('#stand').disabled = true;
    document.querySelector('#deal').disabled = false;
    hitsound.play();
    let cardvalue = showcard(dealer);
    updatescore(dealer, cardvalue);
    aichoice(dealer['score']);



}

async function aichoice(score) {
    await delay(1000);
    let turn = nextmovedecide(score);
    //console.log(turn);
    if (turn == true) {
        let cardvalue = showcard(dealer);
        hitsound.play();
        updatescore(dealer, cardvalue);
        if (burst(dealer) != true) {

            aichoice(dealer['score']);
        } else {
            winnerblackjack();
        }

    } else { winnerblackjack(); }
}

function nextmovedecide(score) {
    if (score < you['score']) { return true; } else if (score > you['score']) { return false; } else if (score > 15) {
        nextturn = Math.floor(Math.random() * 2);
        console.log(nextturn);
        if (nextturn == 1) { return true; } else { return false; }
    } else { return true; }
}

function deal() {
    document.querySelector('#stand').disabled = true;
    document.querySelector('#hit').disabled = false;
    var card0 = document.querySelector('#mybox').querySelectorAll('img');
    var card1 = document.querySelector('#botbox').querySelectorAll('img');
    for (i = 0; i < card0.length; i++) {
        card0[i].remove();
    }
    for (i = 0; i < card1.length; i++) {
        card1[i].remove();
    }
    you['score'] = 0;
    dealer['score'] = 0;
    (document.querySelector(you['scorespan']).textContent = '0');
    (document.querySelector(you['scorespan']).style.color = 'white');
    (document.querySelector(dealer['scorespan']).textContent = '0');
    (document.querySelector(dealer['scorespan']).style.color = 'white');
    let res = (document.querySelector("#result"));
    res.textContent = "Let's Play!";
    res.style.color = 'black';

}

function showcard(y) {
    let card = document.createElement('img');
    c = Math.floor(Math.random() * 13) + 1;
    card.src = 'image/' + c + '.png';
    document.querySelector(y['div']).appendChild(card);
    return c
}

function updatescore(activeplayer, card) {
    activeplayer['score'] += card;
    (document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score']);

}

function burst(activeplayer) {

    if (activeplayer['score'] > 21) {
        activeplayer['score'] = 0;
        (document.querySelector(activeplayer['scorespan']).textContent = 'BUST');
        (document.querySelector(activeplayer['scorespan']).style.color = 'red');
        if (activeplayer['div'] == '#mybox') {
            console.log(activeplayer);
            document.querySelector('#stand').disabled = true;
            document.querySelector('#hit').disabled = true;
            console.log(' you bust');

            standbutton();
        } else {
            console.log(' dealer bust');


        }
        return true;
    } else { return false; }
}

function winnerblackjack() {
    //console.log(you['score']);
    //console.log(dealer['score']);
    document.querySelector('#deal').disabled = false;
    let res = (document.querySelector("#result"));
    if (you['score'] > dealer['score']) {
        res.textContent = 'You Won!';
        res.style.color = 'rgba(3, 255, 29,1.5)';
        let win = parseInt(document.querySelector("#win").textContent);
        console.log(win);
        win++;
        (document.querySelector("#win").textContent = win);
        winsound.play();
        console.log("You won");
    } else if (you['score'] < dealer['score']) {
        console.log("You lose");
        res.textContent = 'You Lost !';
        res.style.color = 'red';
        let los = parseInt(document.querySelector("#lost").textContent);
        console.log(los);
        los++;
        console.log(los);
        document.querySelector("#lost").textContent = los;
        console.log(document.querySelector("#lost").textContent);
        lossound.play();
    } else {
        console.log("Draw");
        res.textContent = 'You Drew!';
        let draw = parseInt(document.querySelector("#draw").textContent);
        console.log(draw);
        draw++;
        (document.querySelector("#draw").textContent = draw);
        lossound.play();
    }
    //deal();

}
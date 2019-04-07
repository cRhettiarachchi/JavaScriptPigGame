/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// declare the variable for the program
var roundScore, playerScore, activePlayer, gameStatus, selector;

    init();
 
    selector = document.querySelector('.dice');

// Roll the dice functionalities 

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gameStatus){ // to stop working after one player wins
        // generate a random number 
        var dice = Math.floor(Math.random() * 6) + 1;
        
        // display the concurrent dice 
        selector.style.display = "inline";
        selector.src = "dice-" + dice + '.png';

        if( dice !== 1 ){
            // add dice value to round score and display
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            changeCurrent();
        }
    }
    
})


// Hold the dice functionalites

document.querySelector('.btn-hold').addEventListener('click', function(){

    selector = document.querySelector('.player-' + activePlayer + '-panel');

    
    if(gameStatus){ // to stop working after one player wins

        playerScore[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = playerScore[activePlayer];
        // when global score is above 100
        if (playerScore[activePlayer] >= 100){

            selector.classList.remove('active');
            selector.classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = "Winner";
            gameStatus = false;
        }
        else{
            changeCurrent();
        }
    }
    
})


function changeCurrent(){ // change the turn 
    document.querySelector('#current-' + activePlayer).textContent = '0';
    roundScore = 0;
    activePlayer === 0 ? activePlayer += 1: activePlayer -= 1;
    for(var i = 0; i < 2; i++){
       document.querySelector('.player-' + i + '-panel').classList.toggle('active');
    }
}

// new game functionality 

document.querySelector('.btn-new').addEventListener('click', function(){
    init();
})

function init(){
 gameStatus = true;
 roundScore = 0;
 playerScore = [0, 0];
 activePlayer = 0; // this is necessary because always the player needs to be the player one in a new game

// basics of the games
    
 document.querySelector('.dice').style.display = 'none';
 for(var i = 0; i < 2; i++){
    document.querySelector('#score-' + i).textContent = '0';
    document.querySelector('#current-' + i).textContent = '0';
    document.querySelector('.player-' + i + '-panel').classList.remove('active');
    document.querySelector('.player-' + i + '-panel').classList.remove('winner');
 }
    document.querySelector('.player-0-panel').classList.add('active');
}


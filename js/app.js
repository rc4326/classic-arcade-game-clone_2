// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
}

//utility for random useable game locations
var rand_y = [68, 151, 234];
var rand_x = [0, 100, 200, 300, 400, 500];

function randCoords() {

    var newXY = [];
    var xbrick = Math.floor(Math.random() * rand_x.length);
    var ybrick = Math.floor(Math.random() * rand_y.length);

    newXY.push(xbrick);
    newXY.push(ybrick);

    return newXY;
}

randCoords();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!GameState.paused) {
        if (this.x < 605) {
            this.x = this.x + (this.speed * dt);
        } else {
            this.x = -100;
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    this.sprite = 'images/char-cat-girl.png';
    this.x = 0;
    this.y = 400;
}

Player.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 317;

}

Player.prototype.handleInput = function(key) {
    if (!GameState.paused) {
        if (key === 'left' && this.x > 0) {
            this.x -= 101;
        } else if (key === 'right' && this.x < 495) {
            this.x += 101;
        } else if (key === 'up' && this.y > 0) {
            this.y -= 83;
        } else if (key === 'down' && this.y < 400) {
            this.y += 83;
        } else if (key === 'p') {
            pausegame();
        }
    }
}

/**Create the Gem object with an x y and point value. */
var GemOGB = function(x, y, color, value) {

    this.sprite = color;
    this.x = x;
    this.y = y;
    this.value = value;
    this.destroyed = false;

}
GemOGB.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/** Function to create random gems on the screen and assign them random points*/
function randGem() {

        randcoords = randCoords();
        randx = rand_x[randcoords[0]];
        randy = rand_y[randcoords[1]];
        gemcolor = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png', 'images/Star.png'];


        if (gamestate && gamestate.level > 2) {

            var randGemColor = Math.floor(Math.random() * gemcolor.length);
            var newGemColor = gemcolor[randGemColor];
            if (randGemColor === 3) {
                var gemValue = 5000;
            } else {
                var gemValue = Math.floor((Math.random() * 1000) + 100);
            }
            var gem = new GemOGB(randx, randy, newGemColor, gemValue);

            return gem;
        }

    }
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player


/** This was a request by my 7 year old niece so that should could add as many bugs as she wants
  Must change start_bugs = 1 to start_bugs = manybugs(); and uncomment out below */

//function manybugs() {

//var num = prompt("How many bugs do you want?");
//		if (num > 500) {
//			bootbox.alert("Uncle Bob says: Fine you can have" +num, function () { return 4;});
//			return 200;
//	} else if (num > 0  && num < 500) {

//			return num;
//	}
//}



/**Lets make some bugs! We'll start with one and if the player wins it will incrase start_bugs by
	1 each round  we'll start with an empty array and then use that fancy randCoords function
	to give them randsome starting points */

var start_bugs = 1;

function createBugs() {

    var bugs = [];

    for (var i = 0; i < start_bugs; i++) {

        randcoords = randCoords();
        randy = rand_y[randcoords[1]];
        randx = rand_x[randcoords[0]];

        var bugspeed = Math.floor((Math.random() * 50) + 10);

        var bug = new Enemy(randx, randy, bugspeed);

        bugs.push(bug);

    }

    return bugs;

}

/** Gamestate keeps track of some game details like pausing the game settlng the level, score and lives */
var GameState = function() {
    this.paused = false;
    this.level = 1;
    this.score = 0;
    this.lives = 5;

}

/** Function to pause the game. It basically stops the entities from rendering The bootbox is a JS librabry*
that creates nice looking modal boxes and allows a callback function*/
function pausegame() {
        GameState.paused = true;
        bootbox.alert(pausetext, function() {
            GameState.paused = false;
        });
    }
    /** Function to draw the score on the canvas. The white fill is important to draw over the previous score
    with each update  */
var updateScore = function() {
        ctx.fillStyle = 'white';
        ctx.fillRect(20, 20, 150, 40);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.font = 'bold 20px Times';
        ctx.fillText('Score: ' + gamestate.score, 20, 40);
    }
    /** Function to write the player lives to the canvas*/
var updateLives = function() {
        ctx.fillStyle = 'white';
        ctx.fillRect(500, 20, 600, 40);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.font = 'bold 20px times';
        ctx.fillText('Lives: ' + gamestate.lives, 500, 40);


    }
    /** Function to write the level to the canvas*/
var updateLevel = function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(300, 20, 150, 40);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.font = 'bold 20px Times';
    ctx.fillText('Level: ' + gamestate.level, 300, 40);

}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'p'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/** Various game messages for the bootbox alerts*/
var deathMessage = "<H1>You died a horrible death!</H1><p> Current Score: <span id='score'></span></p><p>Current Level:<span id='level'></span></p>";
var gameover = "<H1>GAME OVER</h1><p> Final Score: <span id='score'></span></p><p>You made it to level: <span id='level'></span></p>";
var winMessage = "<h1>You Win!</h1><p>Prepare for the next level</p>";
var pausetext = "<h1>Game Paused</h1><div>Press Enter or Click Ok to unpause</div>"
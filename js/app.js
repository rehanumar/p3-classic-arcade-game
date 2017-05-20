// global tile width and height variables used in game for further calculations.
var TILEHEIGHT = 70, TILEWIDTH = 100;

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.y = y;
    this.x = 0;
    this.random = Math.floor(Math.random() * 3) + 1;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = Math.round(this.x + (this.random + 1 * dt));
  if(this.x > 600) {
    this.x = 0;
    this.random = Math.floor(Math.random() * 3) + 1;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.life = 3;
  this.score = 0;

  // starting positions of the player. When we draw the game first time,
  // these values are used for the first frame.
  this.x = 200;
  this.y = 350;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  // not need right now;
};

Player.prototype.renderText = function () {
  ctx.fillStyle = '#DDD';
  ctx.fillRect(0, 0, 510, 50);
  ctx.font = "48px serif";
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.fillText("Score: " + this.score, 0, 40, 150);
  ctx.strokeText("Score: " + this.score, 0, 40, 150);
  ctx.fillText("life: " + this.life, 350, 40);
  ctx.strokeText("life: " + this.life, 350, 40);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
  if(keyCode === 'up' && this.y > 0) {
    this.y = this.y - TILEHEIGHT;
  }
  if(keyCode === 'down' && this.y < 400) {
    this.y = this.y + TILEHEIGHT;
  }
  if(keyCode === 'right' && this.x < 400) {
    this.x = this.x + TILEWIDTH;
  }
  if(keyCode === 'left' && this.x > 0) {
    this.x = this.x - TILEWIDTH;
  }
};

var Gem = function () {
  this.y = 70;
  this.x = TILEWIDTH * Math.floor(Math.random() * 5);
  this.upgrade = 0;
  this.gems = ['Gem Blue', 'Gem Green','Gem Orange', 'Star'];
  this.sprite = 'images/'+this.gems[this.upgrade]+'.png';
};

Gem.prototype.update = function () {
  if(player.score === 5 || player.score === 10 || player.score === 15) {
    gem.upgrade++;
  }
  this.sprite = 'images/'+this.gems[this.upgrade]+'.png';
  this.x = TILEWIDTH * Math.floor(Math.random() * 5);
};

Gem.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// heart object for increaseing life
var Heart = function () {
  this.y = 70;
  this.notVisible = true;
  this.sprite = 'images/Heart.png';
};

Heart.prototype.update = function () {
  if(this.notVisible && (player.score % player.life) % 2 && (player.score > player.life)) {
    this.notVisible = false;
    this.x = TILEWIDTH * Math.floor(Math.random() * 5);
  }
};

Heart.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiating the objects.
// Placing all enemy objects in an array called allEnemies
// Placing the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(70), new Enemy(140), new Enemy(210)];
var gem = new Gem();
var heart = new Heart();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

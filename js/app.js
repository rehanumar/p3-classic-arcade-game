var app = app || {};

(function () {
    // Enemies our player must avoid
  app.Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.y = y;
    this.randomStartPos();
    this.sprite = 'images/enemy-bug.png';
    this.updateVelocityRandomizer();
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  app.Enemy.prototype.update = function() {
    this.randomSpeed();
    if (this.x > 600) {
      this.newWave();
    }
  };

  app.Enemy.prototype.newWave = function() {
    this.randomStartPos();
    this.updateVelocityRandomizer();
  }

  app.Enemy.prototype.randomSpeed = function () {
    this.x = this.x + this.randomVelocity;
  }

  app.Enemy.prototype.updateVelocityRandomizer = function () {
    this.randomVelocity = Math.random() * 5;
  }

  app.Enemy.prototype.randomStartPos = function () {
    this.x = -(Math.random() * 400);
  }

  // Draw the enemy on the screen, required method for game
  app.Enemy.prototype.render = function() {
    app.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  app.Player = function() {
    this.life = 3;
    this.score = 0;

    // starting positions of the player. When we draw the game first time,
    // these values are used for the first frame.
    this.x = 200;
    this.y = 350;
    this.sprite = 'images/char-boy.png';
  };

    app.Player.prototype.renderText = function () {
    app.ctx.fillStyle = '#DDD';
    app.ctx.fillRect(0, 0, 510, 50);
    app.ctx.font = "48px serif";
    app.ctx.fillStyle = 'white';
    app.ctx.strokeStyle = 'black';
    app.ctx.fillText("Score: " + this.score, 0, 40, 150);
    app.ctx.strokeText("Score: " + this.score, 0, 40, 150);
    app.ctx.fillText("life: " + this.life, 350, 40);
    app.ctx.strokeText("life: " + this.life, 350, 40);
  };

  app.Player.prototype.render = function() {
    app.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  app.Player.prototype.handleInput = function(keyCode) {
  if(keyCode === 'up' && this.y > 0) {
    this.y = this.y - app.GAME_CONFIG.TILE_HEIGHT;
  }
  if(keyCode === 'down' && this.y < 400) {
    this.y = this.y + app.GAME_CONFIG.TILE_HEIGHT;
  }
  if(keyCode === 'right' && this.x < 400) {
    this.x = this.x + app.GAME_CONFIG.TILE_WIDTH;
  }
  if(keyCode === 'left' && this.x > 0) {
    this.x = this.x - app.GAME_CONFIG.TILE_WIDTH;
  }
  };

  app.Gem = function () {
  this.y = 70;
  this.x = app.GAME_CONFIG.TILE_WIDTH * Math.floor(Math.random() * 5);
  this.upgrade = 0;
  this.gems = ['Gem Blue', 'Gem Green','Gem Orange', 'Star'];
  this.sprite = 'images/'+this.gems[this.upgrade]+'.png';
  };

  app.Gem.prototype.update = function () {
    var player = app.ACTORS.player,
    gem = app.ACTORS.gem;

    if(player.score === 5 || player.score === 10 || player.score === 15) {
      gem.upgrade++;
    }
    this.sprite = 'images/'+this.gems[this.upgrade]+'.png';
    this.x = app.GAME_CONFIG.TILE_WIDTH * Math.floor(Math.random() * 5);
  };

  app.Gem.prototype.render = function () {
  app.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // heart object for increaseing life
  app.Heart = function () {
    this.y = 70;
    this.notVisible = true;
    this.sprite = 'images/Heart.png';
  };

  app.Heart.prototype.update = function () {
    var player = app.ACTORS.player;

    if(this.notVisible && (player.score % player.life) % 2 && (player.score > player.life)) {
      this.notVisible = false;
      this.x = app.GAME_CONFIG.TILE_WIDTH * Math.floor(Math.random() * 5);
    }
  };

  app.Heart.prototype.render = function () {
  app.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // This listens for key presses and sends the keys to your
  // app.Player.handleInput() method. You don't need to modify this.
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

    app.ACTORS.player.handleInput(allowedKeys[e.keyCode]);
  });
})();

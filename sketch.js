//sprites
var player;
var playerImg
var block;
var blockImg
var minion
var minionImg
var bat
var batImg
var spider
var spiderImg
var wall1
var wall2
var flux
var fluxImg
var ghost
var ghostImg
var mole
var moleImg

//movement
var jump = false;
var playerSpeed = 5;
var move = 0

//misc
var gameOver = false
var score = 0
var back
var highscore = getCookie('Highscore')
var level = 1
var load_tries = 0


function preload() {

}

function setup() {

  createCanvas(550, 300);
  playerImg = loadImage('Mario (2).png')
  player = createSprite(100, 0, 20, 50);
  player.addImage(playerImg)
  player.scale = 0.1

  moleImg = loadImage('mole.png')
  mole = createSprite(200, -100, 40, 40)
  mole.addImage(moleImg)
  mole.scale = 0.15

  blockImg = loadImage('ground (2).png')
  block = createSprite(275, 280, 1200, 50) // ground block
  block.addImage(blockImg)

  minionImg = loadImage('Minion.png')
  minion = createSprite(600, 218, 20, 50);
  minion.addImage(minionImg)
  minion.scale = 0.7

  batImg = loadImage('Bat.png')
  bat = createSprite(600, 190, 20, 50);
  bat.addImage(batImg)
  bat.scale = 0.5

  spiderImg = loadImage('Spider.png')
  spider = createSprite(700, 231, 50, 20)
  spider.addImage(spiderImg)
  spider.scale = 0.5

  wall1 = createSprite(1, 150, 1, 300)
  wall2 = createSprite(549, 150, 1, 300)

  fluxImg = loadImage('Flux.png')
  flux = createSprite(-40, 222, 30, 60)
  flux.addImage(fluxImg)
  flux.scale = 0.6

  ghostImg = loadImage('Ghost.png')
  ghost = createSprite(-40, 60, 25, 35)
  ghost.addImage(ghostImg)
  ghost.scale = 0.6
}


function draw() {
  if (load_tries == 1) {
    background(130, 130, 255);

    if (score == 5000) {
      level = 6
    } else if (score == 4000) {
      level = 5
    } else if (score == 3000) {
      level = 4
    } else if (score == 2000) {
      level = 3
    } else if (score == 1000) {
      level = 2
    }

    if (level == 6) {
      mole.position.y += 4
      ghost.position.x -= 1
      flux.position.x += 3
      spider.position.x -= 4
      bat.position.x -= 6
      minion.position.x -= 5
    } else if (level == 5) {
      ghost.position.x -= 1
      flux.position.x += 3
      spider.position.x -= 4
      bat.position.x -= 6
      minion.position.x -= 5
    } else if (level == 4) {
      flux.position.x += 3
      spider.position.x -= 4
      bat.position.x -= 6
      minion.position.x -= 5
    } else if (level == 3) {
      spider.position.x -= 4
      bat.position.x -= 6
      minion.position.x -= 5
    } else if (level == 2) {
      bat.position.x -= 6
      minion.position.x -= 5
    } else {
      minion.position.x -= 5
    }

    if (bat.position.x <= -50) {
      back = int(random(1, 20))
      if (back == 2) {
        bat.position.x = 600
      }
    }

    if (minion.position.x <= -50) {
      back = int(random(1, 10))
      if (back == 1) {
        minion.position.x = 600
      }
    }

    if (spider.position.x <= -50) {
      back = int(random(1, 30))
      if (back == 3) {
        spider.position.x = 700
      }
    }

    if (flux.position.x >= 600) {
      back = int(random(1, 40))
      if (back == 4) {
        flux.position.x = -50
      }
    }

    if (ghost.position.x <= -50) {
      back = int(random(1, 50))
      if (back == 5) {
        ghost.position.x = 750
      }
    }
    if (mole.position.y >= 400) {
      back = int(random(1, 60))
      if (back == 6) {
        mole.position.y = -100
        mole.position.x = int(random(0, 550))
      }
    }

    drawSprites()
    keyboardCode() // call the keyboard code (all keyboard code in separate function)

    player.collide(ghost, collision)
    player.collide(minion, collision)
    player.collide(bat, collision)
    player.collide(spider, collision)
    player.collide(flux, collision)
    player.collide(mole, collision)

    if (player.collide(wall1)) {
      move = -1
    } else if (player.collide(wall2)) {
      move = 1
    } else {
      move = 0
    }

    function collision(spriteA, spriteB) {
      spriteA.position.x = 275
      gameOver = true
    }
    player.position.y += playerSpeed;

    if (player.collide(block)) {

      //allow jumping again
      jump = false;

    }
    //player is not colliding with the ground
    else {
      //gravity accelerates the movement speed
      playerSpeed++;
    }
    if (gameOver === true) {
      textSize(70);
      text('GAME OVER', 60, 100);
      textSize(20);
      text('Press Enter To Try Again', 175, 125)
      minion.position.x = -40
      bat.position.x = -40
      spider.position.x = -40
      flux.position.x = -40
      ghost.position.x = -40
      mole.position.y = -100
      jump = true
      playerspeed = 0
      player.position.x = 275
      player.mirrorX(1)
      if (getItem('Highscore') < highscore) {
        storeItem('Highscore', highscore)
      }
    }

    if (gameOver == false && (score == highscore || score > highscore)) {
      score += 1
      highscore = score
      setcookie('Highscore', highscore)
    } else if (gameOver == false) {
      score += 1
    }

    textSize(20)
    text('Score = ' + score, 350, 20);
    text('Highscore = ' + highscore, 75, 20);


  } else {
    load_tries += 1
  }
}

function keyboardCode() {

  if ((keyIsDown(UP_ARROW) || keyIsDown('W'.charCodeAt(0))) && keyIsPressed === true && jump === false) {
    jump = true;
    player.position.y -= 10
    playerSpeed = -16;
  }
  if ((keyIsDown(RIGHT_ARROW) || keyIsDown('D'.charCodeAt(0))) && keyIsPressed === true && move == 0 || move == -1) {
    if (!gameOver) {
      player.mirrorX(1)
    }
    player.position.x += 4

  }
  if ((keyIsDown(LEFT_ARROW) || keyIsDown('A'.charCodeAt(0))) && keyIsPressed === true && move == 0 || move == 1) {
    if (!gameOver) {
      player.mirrorX(-1)
    }
    player.position.x -= 4
  }
  if (keyIsDown(ENTER) && gameOver === true) {
    gameOver = false
    minion.position.x = 600
    player.position.x = 100
    score = 0
    level = 1
  }

}
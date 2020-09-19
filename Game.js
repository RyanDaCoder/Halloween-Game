
/**
 * see if we have a name
 * If we already have name, dont ask "what is your name"
 * if we dont have a name, ask what is ur name
 * save player into local storage called player
 */

var player = localStorage.getItem('player');
if (!player) {
	player = prompt("What is your name?");
	localStorage.setItem('player', player);
}


var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext('2d');
var activeGame = false;
var gameOver = false;

var backgroundImage = new Image();
backgroundImage.src="images/Halloweenbackground.jpg";
var backgroundX, backgroundY;
backgroundX = backgroundY = 0;
var backgroundSpeed = 3;

var halloweenMusic = new Audio();
halloweenMusic.src="music/song.mp3";
halloweenMusic.load();
halloweenMusic.play();

var leaderboard = null;
var score = 0;
var highscore = localStorage.getItem("highscore");



//pumpkin normal image
var pumpkinImage = new Image();
pumpkinImage.src = "images/pumpkinImage.png";
//jack-o-lantern images
//1st
var jack1Image = new Image();
jack1Image.src="images/pumpkin1.png";
//2nd
var jack2Image = new Image();
jack2Image.src="images/pumpkin2.png";
//3rd
var jack3Image = new Image();
jack3Image.src ="images/pumpkin3.png";
//knife images
var KnifeImage = new Image();
KnifeImage.src="images/knife.png";

var pumpkin = {
	width: 60,
	height: 60,
	x: 20,
	y: 300,
	speed: 10,
	move: function () {
		if (keys["w"]) {
			this.y -= this.speed;
			if (this.y < 0) {
				this.y = 0;
			}
		}

		if (keys["s"]) {
			this.y += this.speed;
			if (this.y > 690) {
				this.y = 690;
			}
		}

		if (keys["a"]) {
			this.x -= this.speed;
			if (this.x < 0) {
				this.x = 0;
			}
		}

		if (keys["d"]) {
			this.x += this.speed;
			if (this.x > 940) {
				this.x = 940;
			}
		}
	},
	draw: function () {
        ctx.drawImage(pumpkinImage, this.x,this.y,this.width,this.height);
        ctx.fillStyle="red";	
	}
}

var knife = {
	width: 50,
	height: 50, 
	x: 1100, 
	y: Math.random()*650,
	speed: 15,
	move: function() {
		this.x -= this.speed;
		
		if (this.x <= -40) {
			this.x = 1100;
			this.y = Math.random()*650;
			score++;
			
			
		}	
	},
	draw: function() {
			ctx.drawImage(KnifeImage, this.x, this.y, this.width, this.height);
			
		}
	}

	var knife1 = {
		width: 50,
		height: 50, 
		x: 1500, 
		y: Math.random()*690,
		speed: 15,
		move: function() {
			this.x -= this.speed;
			
			if (this.x <= -40) {
				this.x = 1500;
				this.y = Math.random()*650;
				score++;
				
			}	
		},
		draw: function() {
				ctx.drawImage(KnifeImage, this.x, this.y, this.width, this.height);
				
			}
		}

		var knife2 = {
			width: 50,
			height: 50, 
			x: 1855, 
			y: Math.random()*690,
			speed: 15,
			move: function() {
				this.x -= this.speed;
				
				if (this.x <= -40) {
					this.x = 1855;
					this.y = Math.random()*650;
					score++;
					
				}	
			},
			draw: function() {
					ctx.drawImage(KnifeImage, this.x, this.y, this.width, this.height);
					
			}
		}

		var knife3 = {
			width: 50,
			height: 50, 
			x: 2100, 
			y: Math.random()*690,
			speed: 15,
			move: function() {
				this.x -= this.speed;
				
				if (this.x <= -40) {
					this.x = 2100;
					this.y = Math.random()*650;
					score++;
					
				}	
			},
			draw: function() {
					ctx.drawImage(KnifeImage, this.x, this.y, this.width, this.height);
					
			}
		}



var keys = [];

window.onkeydown = function (e) {
	keys[e.key] = true;
};

window.onkeyup = function (e) {
	keys[e.key] = false;
};

// MAIN GAME LOOP- startGame() will begin the loop
function startGame() {
	drawScreen();
	drawBackground();
	draw();
	movement();
	drawScore();
	drawText();
	window.requestAnimationFrame(startGame)
}


// Starts the gameLoop and hides buttons & directions
// function startGame() {
// 	activeGame = window.requestAnimationFrame(gameLoop, 30);
// }


function movement () {
	pumpkin.move();
	knife.move();
	knife1.move();
	knife2.move();
	knife3.move();

	// collision detection 
	//first
	if (checkCollisions(pumpkin, knife)) {
		knife.x = 1100;
		knife.y = Math.random()*690;
		pumpkinImage.src="images/pumpkin1.png";
		gameOver = true;
		
	}
	//second
	if (checkCollisions(pumpkin, knife1)) {
		knife1.x = 1500;
		knife1.y = Math.random()*690;
		pumpkinImage.src="images/pumpkin2.png";
		gameOver = true;
		
	}
	//third
	if (checkCollisions(pumpkin, knife2)) {
		knife2.x = 1855;
		knife2.y = Math.random()*690;
		pumpkinImage.src="images/pumpkin3.png";
		gameOver = true;
		
	}

	if (checkCollisions(pumpkin, knife3)) {
		knife3.x = 1855;
		knife3.y = Math.random()*690;
		pumpkinImage.src="images/pumpkin3.png";
		gameOver = true;
		
	}
}

function drawBackground () {
	backgroundX -= backgroundSpeed;
	if (backgroundX < -canvas.width){
		backgroundX = 0;
	}
	ctx.drawImage(backgroundImage, backgroundX, backgroundY, canvas.width, canvas.height);
	ctx.drawImage(backgroundImage, backgroundX + canvas.width, backgroundY, canvas.width, canvas.height);

}



function drawText() {
	if (!gameOver || leaderboard == null) {
		return;
	}
	ctx.fillStyle="orange";
	ctx.font = "30px Arial";
	ctx.fillText("Game Over", 250, 300);

	ctx.fillStyle="orange";
	ctx.font = "50px Comic Sans MS";
	ctx.fillText("Name    |    Score", 300, 400);
	
	//ctx.fillText("data: " + leaderboard[0], 250, 450);
	const {username, score} = leaderboard[0];
	
	//console.log(username, score);
	//console.log(leaderboard);
	ctx.fillText("1. " + leaderboard[0].username + "         " + leaderboard[0].score, 300, 450);
	ctx.fillText("2. " + leaderboard[1].username + "    " + leaderboard[1].score, 300, 500);
	ctx.fillText("3. " + leaderboard[2].username + "          " + leaderboard[2].score, 300, 550);
}


let sendGameOver = false;
async function draw () {
	pumpkin.draw();
	knife.draw();
	knife1.draw();
	knife2.draw();
	knife3.draw();
	if (gameOver) {
		if (leaderboard === null) {
			var url = new URL("https://tragically-goose-74465.herokuapp.com/test");
			url.searchParams.append("rows", "3");
			url.searchParams.append("offset", "0");
			let response = await axios.get(url);
			leaderboard = response.data;
		}
		
		
		knife.x = 5550;
		knife.speed = 0;
		knife1.x = 5550;
 		knife1.speed = 0;
 		knife2.x = 5550;
 		knife2.speed = 0;
 		knife3.x = 5550;
		 knife3.speed = 0;
		 
		
		
		 
		


		if(highscore !== null){
			if (score > highscore) {
				localStorage.setItem("highscore", score); 
				//window.location.href="index.html";
     
			}
		}
		else{
			localStorage.setItem("highscore", score);
		}
		
		//get req will go here for the name and score from db
		
		if (sendGameOver === false) {
			console.log(highscore);
			sendGameOver = true;
			//post to database   OLD ONE
			// let response = await axios.post("http://localhost:3001/leaderboard", {
			// 	"score": highscore,
			// 	"playerName": player
			// });
			//  let response = await axios.post("https://tragically-goose-74465.herokuapp.com/leaderboard", {
			//  	"score": score,
			//  	"playerName": player
			//  });
		}

	}	
}

function drawScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}



//  function gameOver() {
	
//  	setInterval(up(), 1000/60);
	
//  	//setTimeout(function(){ window.location.href="index.html"; }, 3000);
//  	//document.getElementById("hi").innerHTML = "GAME OVER";
//  	//document.getElementById("hii").innerHTML = "Play Again!";
//  }



function drawScore() {
	ctx.fillStyle="orange";
	ctx.font = "30px Arial";
	ctx.fillText("Knive's Dodged: "+score, 10, 50);
	if (score >= 15) {
		knife.speed = 20;
		knife1.speed = 20;
		knife2.speed = 20;
		knife3.speed = 20;
		backgroundSpeed=5.5;
	}

	if (score >= 30) {
		knife.speed = 25;
		knife1.speed = 25;
		knife2.speed = 25;
		knife3.speed = 25;
		backgroundSpeed=7;
	}

	if (score >= 45) {
		knife.speed = 30;
		knife1.speed = 30;
		knife2.speed = 30;
		knife3.speed = 30;
		backgroundSpeed=8.5;
	}

	if (score >= 60) {
		knife.speed = 35;
		knife1.speed = 35;
		knife2.speed = 35;
		knife3.speed = 35;
		backgroundSpeed=10;
	}

	if (score >= 75) {
		knife.speed = 40;
		knife1.speed = 40;
		knife2.speed = 40;
		knife3.speed = 40;
		backgroundSpeed=11.5;
	}

	if (score >= 100) {
		knife.speed = 50;
		knife1.speed = 50;
		knife2.speed = 50;
		knife3.speed = 50;
		backgroundSpeed=13;
	}
}



function checkCollisions(param1, param2) {
	if (param1.x < param2.x + param2.width &&
		param1.x + param1.width > param2.x &&
		param1.y < param2.y + param2.height &&
		param1.height + param1.y > param2.y) {
		return true;
	} else {
		return false
	}
}


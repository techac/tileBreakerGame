var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var paddleHeight = 33;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth)/2;
var x =canvas.width/2;
var y = canvas.height - 60;
var rightPressed = false;
var rightAcceleration = 1;
var leftPressed = false;
var leftAcceleration = 1;
var accelerationIncrement = 0.06;
var maxAcceleration = 7;
var brickRowCount = 6;
var brickColumnCount = 8;
var brickWidth = 120;
var brickHeight = 40;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 25;
var score = 0;
var dx = 1;
var dy = -1;
var ballRadius = 10;
var ballSprite = new Image();
var paddleSprite = new Image();
ballSprite.onload = function () {
    context.drawImage(img, 0, 0);
}
ballSprite.src = "images/ball.png";

paddleSprite.onload = function () {
    context.drawImage(img, 0, 0);
}
paddleSprite.src = "images/paddle.png";

document.addEventListener("keydown", function(e){
    if(e.keyCode == 68){
        rightPressed = true;
    }
    else if(e.keyCode ==65){
        leftPressed =true;
    }
});
document.addEventListener("keyup", function(e){
    if(e.keyCode == 68){
        rightPressed = false;
        rightAcceleration = 1;
    }
    else if(e.keyCode==65){
        leftPressed = false;
        leftAcceleration = 1;
    }
});


function drawBall(){
    ctx.drawImage(ballSprite,x,y);
};
function drawPaddle(){
    ctx.drawImage(paddleSprite,paddleX,canvas.height - paddleHeight);
};

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fefefe";
    ctx.fillText("Score: "+score, 25, 20);
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    if(y + dy- ballRadius < 0) {
        dy = -dy;
    }
    else if(y+dy >  canvas.height - ballRadius * 1.5 - paddleHeight ){
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else{
            console.log("GAME OVER");
            document.location.reload();
        }
    }
    if(x + dx > canvas.width-2*ballRadius || x + dx - ballRadius < 0) {
        dx = -dx;
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += rightAcceleration;
        if(rightAcceleration < maxAcceleration) {
            rightAcceleration += accelerationIncrement;
        }
    }
    else if(leftPressed && paddleX>0){
        paddleX -= leftAcceleration;
        if(leftAcceleration < maxAcceleration) {
            leftAcceleration += accelerationIncrement;
        }
    }
    drawPaddle();
    drawScore();
    x+=dx;
    y+=dy;
    collisionDetection();
    drawBricks();
    
};

var bricks =[]
for(var i =0;i<brickColumnCount; i++){
    bricks[i] = [];
    for(var j=0;j<brickRowCount; j++){
        bricks[i][j] = {x:0 , y:0, status :1};
    }
}

function drawBricks(){
    for (var i=0;i<brickColumnCount; i++){
        for(var j=0;j<brickRowCount; j++){
            if(bricks[i][j].status == 1){
                drawBrick(i,j);
            }
        }
    }
}

function drawBrick(i, j) {
    let brickBorder = 10;
    var brickX = (i*(brickWidth+ brickPadding) + brickOffsetLeft);
    var brickY = (j*(brickHeight + brickPadding) + brickOffsetTop);
    var color = getBrickColor(i,j);
    bricks[i][j].x = brickX;
    bricks[i][j].y = brickY;

    // inner rectangle
    ctx.fillStyle = color.inner;
    ctx.fillRect(brickX + brickBorder, brickY + brickBorder, 
        brickWidth - brickBorder * 2, brickHeight - brickBorder * 2);

    // top border
    ctx.fillStyle = color.top;
    ctx.beginPath();
    ctx.moveTo(brickX, brickY);
    ctx.lineTo(brickX + brickWidth, brickY);
    ctx.lineTo(brickX + brickWidth - brickBorder, brickY + brickBorder);
    ctx.lineTo(brickX + brickBorder, brickY + brickBorder);
    ctx.closePath();
    ctx.fill();

    // bottom border
    ctx.fillStyle = color.bottom;
    ctx.beginPath();
    ctx.moveTo(brickX + brickBorder, brickY + brickHeight - brickBorder);
    ctx.lineTo(brickX + brickWidth - brickBorder, brickY + brickHeight - brickBorder);
    ctx.lineTo(brickX + brickWidth, brickY + brickHeight);
    ctx.lineTo(brickX, brickY + brickHeight);
    ctx.closePath();
    ctx.fill();

    // left border
    ctx.fillStyle = color.left;
    ctx.beginPath();
    ctx.moveTo(brickX, brickY);
    ctx.lineTo(brickX + brickBorder, brickY + brickBorder);
    ctx.lineTo(brickX + brickBorder, brickY + brickHeight - brickBorder);
    ctx.lineTo(brickX, brickY + brickHeight);
    ctx.closePath();
    ctx.fill();

    // right border
    ctx.fillStyle = color.right;
    ctx.beginPath();
    ctx.moveTo(brickX + brickWidth - brickBorder, brickY + brickBorder);
    ctx.lineTo(brickX + brickWidth, brickY);
    ctx.lineTo(brickX + brickWidth, brickY + brickHeight);
    ctx.lineTo(brickX + brickWidth - brickBorder, brickY + brickHeight - brickBorder);
    ctx.closePath();
    ctx.fill();

}

function getBrickColor(i,j) {
    if(j > 4) {
        return {
            inner: "#F68500",
            top: "#FDBE78",
            bottom: "#7E3D00",
            left: "#F9A13E",
            right: "#B86200"
        };
    } else if(j > 2) {
        return {
            inner: "#81097F",
            top: "#B37CB6",
            bottom: "#3C003B",
            left: "#974898",
            right: "#5E005E"
        };
    } else {
        return {
            inner: "#007B00",
            top: "#00BB00",
            bottom: "#003100",
            left: "#009A00",
            right: "#005600"
        };
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status ==1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status=0;
                    score++;
                    console.log(score);
                    if(score == brickColumnCount * brickRowCount){
                        alert("Congratulations You Won");
                        doxumnet.location.reload();
                    }
                }
            }
        }
    }
}


setInterval(draw,1000/120);


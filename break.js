var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var x =canvas.width/2;
var y = canvas.height - 30;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var dx = 1;
var dy = -1;
var ballRadius = 10;

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
    }
    else if(e.keyCode==65){
        leftPressed = false;
    }
});


function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
};
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
};

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    if(y + dy- ballRadius < 0) {
        dy = -dy;
    }
    else if(y+dy >  canvas.height-ballRadius ){
        console.log("GAME OVER");
        document.location.reload();
    }
    if(x + dx > canvas.width-ballRadius || x + dx- ballRadius < 0) {
        dx = -dx;
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX+=7;
    }
    else if(leftPressed && paddleX>0){
        paddleX-=7;
    }
    drawPaddle();
    x+=dx;
    y+=dy;
    drawBricks();
};

var bricks =[]
for(var i =0;i<brickColumnCount; i++){
    bricks[i] = [];
    for(var j=0;j<brickRowCount; j++){
        bricks[i][j] = {x:0 , y:0};
    }
}

function drawBricks(){
    for (var i=0;i<brickColumnCount; i++){
        for(var j=0;j<brickRowCount; j++){
            var brickX = (i*(brickWidth+ brickPadding) + brickOffsetLeft);
            var brickY = (j*(brickHeight + brickPadding) + brickOffsetTop);
            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY;
            ctx.rect(brickX, brickY,brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}



setInterval(draw,.1);

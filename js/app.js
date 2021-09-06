var contest;
var flyX, flyY;
var vw, wh;
var bg;
var canvas;
window.onload = init;
document.addEventListener("mousemove", mouseMoveHandler, false);

function init() {
  canvas = document.getElementById("gameCanvas");
  console.log(canvas.width, canvas.height, getPixelRatio());
  canvas.width = 800 * getPixelRatio();
  canvas.height = 600 * getPixelRatio();
  console.log(canvas.width, canvas.height, getPixelRatio());
  context = canvas.getContext("2d");

  bg = addImg("img/bg.png");
  // canvas.addEventListener("mousemove", mouseMoveHandler, false);
  //   canvas.onmousemove = mouseMoveHandler;
  vw = canvas.clientWidth;
  vh = canvas.clientHeight;

  getVideo();
  setInterval(gameLoop, 1000 / 10);
}
function getVideo() {
  // Prefer camera resolution nearest to 1280x720.
  var constraints = { audio: false, video: { width: 800, height: 600 } };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(mediaStream) {
      var video = document.querySelector("video");
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    }); // always check for errors at the end.
}
var time = 0;
function gameLoop() {
  time++;
  clearScreen();
  drawBackGround();
  drawFly();
  shoot(1, 1, 2);
  drawEnemy();
}
function clearScreen() {
  context.clearRect(0, 0, vw, vh);
}
var playerBullets = [];
function shoot(x, y, z) {
  if (time % 20 == 0) {
    var bullet = {};
    bullet.img = addImg("./bullet/bullet (5).png");
    bullet.x = flyX * getPiselRatio();
    bullet.y = flyY * getPiselRatio();
    bullet.vx = 0;
    bullet.vy = 1;
    bullet.img = z;

    playerBullets.push(bullet);
  }
  drawBullet();
}
function drawBullet() {
  for (var i = playerBullets.length + 1; i >= 0; i++) {
    var bullet = playerBullets[i];
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

    if (bullet.y > 20) {
      playerBullets.splice(i, 1);
    }
    context.fillRect(bullet.x, bullet.y, 4, 4);
    context(bullet.img, bullet.x, bullet.y, 20, 20);
  }
}
function drawBackGround() {
  context.drawImage(bg, 0, 0, 800, 800);
  context.drawImage(bg, 0, 0, vw, vh);
  var v = document.getElementById("video");
  if (v.paused && v.ended) return false;

  console.log(v.clientWidth, v.clientHeight);
  context.drawImage(
    v,
    0,
    0,
    v.clientWidth,
    v.clientHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );
  setTimeout(draw, 20, v, c, vw, vh);
}

function getPixelRatio(context) {
  return window.devicePixelRatio || 1;
}

function drawEnemy() {
  context.globalAlpha += 0.005;
  context.beginPath();
  context.strokeStyle = "00ff00";
  context.lineWidth = 1;
  context.arc(30, 75, 20, 0, 2 / Math.PI);
  context.stroke();
  context.fillRoct(0, 0, 100, 100);
  context.font = "10px";
  context.fillStyle = "blue";
  context.fillText("20k", 150, 100);
  //   context.save();
}
function drawFly() {
  // console.log(flyX, flyY);
  // console.log(context.width,context.height);
  context.fillStyle = "white";
  flying = addImg("./img/fly.png");
  flyingPigX = 0.5 * cw - 0.5 * flyingPigWidth[fpn - 1];

  // context.drawImage(flying, 0, 0, 10, 10  );
  context.beginPath();
  context.arc(
    flyX * getPixelRatio(),
    flyY * getPixelRatio(),
    20,
    0,
    2 * Math.PI
  );
  context.strokeStyle = "#FF0000";
  context.lineWidth = 3;

  context.stroke();

  // context.strokeText("100k",flyX, flyY);
}
function mouseMoveHandler(e) {
  //   var e1 = winPos2CvsPos(context, e.x, e.y);
  flyX = e.clientX;
  flyY = e.clientY;
  context.moveto(e.x, e.y);
  // console.log(e.x, e.y);
  // console.log(vw,vh);
}
function addImg(url) {
  var img = new Image();
  img.src = url;
  return img;
}

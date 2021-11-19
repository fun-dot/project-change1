
song ="";
song1 = "";
song_status = "";
song1_status = "";
scorerightwrist = 0;
scoreleftwrist = 0;
rightwristX = 0;
rightwristY = 0;
leftwristX = 0;
leftwristY = 0;
function preload(){
 song = loadSound("music.mp3");
 song1 = loadSound("music2.mp3");
}
function setup(){
canvas = createCanvas(600, 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet( video, modelLoaded);
poseNet.on("pose" , gotPoses);
}
function modelLoaded(){
console.log("model Loaded");
}
function gotPoses(results){

if(results.length > 0){
console.log(results);
leftwristX=results[0].pose.leftWrist.x;
leftwristY=results[0].pose.leftWrist.y;
console.log(" leftwrist x =" + leftwristX + "leftwrist y =" + leftwristY);
rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log(" rightwrist x =" + rightwristX + "rightwrist y =" + rightwristY);
scorerightwrist = results[0].pose.keypoints[10].score;
scoreleftwrist = results[0].pose.keypoints[9].score;
console.log("scoreleftwrist is = " + scoreleftwrist);
console.log("scorerightwrist is = " + scorerightwrist);
}

}
function draw(){

image(video, 0 , 0 ,600 , 500);

song_status = song.isPlaying();
song1_status = song1.isPlaying();
fill("#FF0000");
stroke("#FF0000");
if(scorerightwrist > 0.2)
{ 
    circle(rightwristX,rightwristY,20);
song1.stop();
if(song_status == false)
{
song.play();
document.getElementById("song").innerHTML = "playing- harry potter theme song";

}

}
if(scoreleftwrist > 0.2)
{ 
    circle(leftwristX,leftwristY,20);
song.stop();
if(song1_status == false)
{
song1.play();
document.getElementById("song").innerHTML = "playing- peter pan song";

}

}
}
function play() {

song.play();
song.setVolume(1);
song.rate(1);
}


// JavaScript Document

//constant
var step=10;
//Step is the basic unit number, and the wid is width by step, hei is height same as wid.
var wid=document.getElementById('canvas').width/step;
var hei=document.getElementById('canvas').height/step;
//variable
var timer;
var context = document.getElementById('canvas').getContext('2d');
var bean={	x:0,	y:0,};
/*var node={	x:0,	y:0,};*/
var snake={	nodes:[],	direction:1,};//1 equals to up; 2 equals to down; 3 euqals to left; 4 equals to right;
//set keydown direction function   
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
	switch(e.keyCode){
		case 39://rightPressed
			if(snake.direction==3)break;
			snake.direction=4;break;
		case 37://leftPressed
			if(snake.direction==4)break;
			snake.direction=3;break;
		case 38://upPressed
			if(snake.direction==2)break;
			snake.direction=1;break;
		case 40://downPressed
			if(snake.direction==1)break;
			snake.direction=2;;break;
		default:
	}
}
//初始化
function init(){
	//inti randowm bean's location data 
	randomBeanData();
	//init snkae's location data
	var node={	x:0,	y:0,};
	node.x=wid/2*step;
	node.y=hei/2*step;
	snake.nodes.push(node);
	//init snake's direction data
	snake.direction=1;
}

function randomBeanData(){
	bean.x=Math.floor((Math.random()*wid))*step;
	bean.y=Math.floor((Math.random()*hei))*step;
	//check bean not in sanke body.
	for(var i in snake.nodes){
		if(bean.x==snake.nodes[i].x&&bean.y==snake.nodes[i].y){
				randomBeanData();
		}
	}
}

function drawBean(){
	context.fillStyle="red";
	context.fillRect(bean.x,bean.y,step,step);
}
//drawSanke
function drawSnake(){
	context.fillStyle="#35DE00";
	for(var n in snake.nodes){
		context.fillRect(snake.nodes[n].x,snake.nodes[n].y,step,step);
	}
}
function draw(){
	context.clearRect(0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height);
	drawBean();
	drawSnake();
}
function start(){
	clearInterval(timer);
	timer=setInterval(run, 80);
}
function stop(){
	clearInterval(timer);
}
function run(){
	var len=snake.nodes.length-1;//lenght
	// get the head node data
	var node={	x:0,	y:0,};
	node.x=snake.nodes[len].x;
	node.y=snake.nodes[len].y;
	
	// by snkae.direction to ensure the node which will go. 
	switch(snake.direction){
		case 1:	node.y=snake.nodes[len].y-step;break;	//up
		case 2:	node.y=snake.nodes[len].y+step;break;	//down
		case 3:	node.x=snake.nodes[len].x-step;break;	//left
		case 4: node.x=snake.nodes[len].x+step;break;	//right
		default:
	}
	
	//if meet wall
	if(node.x>document.getElementById('canvas').width-step||node.x<0||node.y>document.getElementById('canvas').height-step||node.y<0){
		clearInterval(timer);
		alert("Game over! Your sorce is "+snake.nodes.length);
		return;
	}
	//if meet self body
	for(var i in snake.nodes){
		if(node.x==snake.nodes[i].x&&node.y==snake.nodes[i].y){
			clearInterval(timer);
			alert("Game over! Your sorce is "+snake.nodes.length);
			return;
		}		
	}
	snake.nodes.push(node);
	//if meet bean
	if(bean.x!=node.x||bean.y!=node.y)
		snake.nodes.splice(0,1);
	else 
		randomBeanData();
	draw();
}



init();
draw();
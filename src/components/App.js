import React from 'react';
import Header from './Header';
import TankCanvas from './TankCanvas';
import EnemyTank from '../elements/enemyTank';
import PlayerTank from '../elements/playerTank';
import Boom from '../elements/boom';
import CV from '../elements/ConstVariable';
import {drawPanel, gameOver} from '../elements/GameFunction';


//main app
class App extends React.Component{

	constructor (props){
		super(props);
		this.state = {
			
			gameTimeCount: 0
		};
		this.playerTank = new PlayerTank();
		this.gameLevel=1;
		this.enemyTanks = [new EnemyTank(this.gameLevel), new EnemyTank(this.gameLevel),new EnemyTank(this.gameLevel), new EnemyTank(this.gameLevel),new EnemyTank(this.gameLevel)];
		this.gameScore=0;
		this.booms=[];
		this.gameOver = false;
		this.ctx;
	}


	componentDidMount() {

			

	}



	componentWillUnmount() {
		clearTimeout(this.mainTimer);

	}


	startMenu =(ctx)=>{
		this.ctx = ctx;
		//ctx.clearRect(0,0,512,448);
		let menuImage = new Image();
		menuImage.src ='/images/menu.gif';
		menuImage.onload =()=>{
			ctx.drawImage(menuImage,0,0);
			ctx.fillStyle="#000";
			ctx.fillRect(0, 224, 512, 448);
			ctx.fillStyle="#F00";
			ctx.font = '30px serif';
			ctx.fillText('Press any key to start', 135, 350);
			let flag=true;
			this.menuLoop = setInterval(()=>{

				ctx.fillStyle="#000";
				ctx.fillRect(0, 224, 512, 448);
				if(flag){
				ctx.fillStyle="#F00";
				ctx.font = '30px serif';
				ctx.fillText('Press any key to start', 135, 350);
				flag=false;
				}else flag=true;

			}, 500);
		}

		window.addEventListener("keydown",this.handleGameStart);

	};

	handleGameStart =(e)=>{
		window.removeEventListener("keydown", this.handleGameStart);
		clearInterval(this.menuLoop);
		setTimeout(this.gameInit,1000);
	};


	gameInit =()=>{
		CV.AI=1000;
		this.state.gameTimeCount =0;
		this.playerTank = new PlayerTank();
		this.gameLevel =1;
		this.enemyTanks = [new EnemyTank(this.gameLevel), new EnemyTank(this.gameLevel),new EnemyTank(this.gameLevel), new EnemyTank(this.gameLevel),new EnemyTank(this.gameLevel)];
		this.gameScore=0;
		this.booms=[];
		this.gameOver = false;		
		window.addEventListener("keydown", this.handleTankMove);
		window.addEventListener("keyup", this.handleTankStop);
		this.mainGameLoop();
	};

	//MainGameLoop started when componentDidMount. 
	mainGameLoop = ()=>{
			
		let gameTimeCount =this.state.gameTimeCount + 20;
		this.gameScore +=50/CV.AI;
		this.setState({gameTimeCount: gameTimeCount});
		this.enemyTankDirLoop(gameTimeCount, this.enemyTanks);
		this.checkhit(this.booms);
		this.addNewEnemy();
		this.checkEnemyUpgrade(gameTimeCount, this.enemyTanks);
		this.drawAll(this.ctx);
		this.mainTimer = setTimeout(this.mainGameLoop,20);

		if(this.gameOver) {
			//this.stopLoopTimer =setTimeout(()=>{clearTimeout(this.mainTimer)}, 500);
			clearTimeout(this.mainTimer);
			gameOver(this.ctx);
			this.resetTimer = setTimeout(()=>{this.gameInit(this.ctx)},5000);
		}
	};





	addNewEnemy = ()=>{
		if(this.enemyTanks.length <=3){
			this.enemyTanks.push(new EnemyTank(this.gameLevel));
			this.enemyTanks.push(new EnemyTank(this.gameLevel));
		}

	};


	checkhit = (booms)=>{
		for(let etank of this.enemyTanks){
			for(let bullet of etank.bullets){
				for(let mybullet of this.playerTank.bullets){
					if(mybullet.isShot(bullet)){
						bullet.isAlive=false;
						mybullet.isAlive=false;
						booms.push(new Boom(1,mybullet));
						booms.push(new Boom(1,bullet));
					}
				}
				if(this.playerTank.isShot(bullet)){
					bullet.isAlive=false;
					booms.push(new Boom(1,bullet));
					this.playerTank.destory(this);
				}
			}

			if(!etank.isAlive && (etank.bullets.length==0)){
				this.enemyTanks.splice(this.enemyTanks.indexOf(etank),1);
				
			}

			for(let bullet of this.playerTank.bullets){
				if(etank.isShot(bullet)){
					bullet.isAlive=false;
					booms.push(new Boom(1,bullet));
					etank.lives--;
					etank.destroy(this);

				}
			}	
		}
	};


	checkEnemyUpgrade = (gameTime,enemyTanks)=>{
		if(parseInt(gameTime%30000)==0){
			this.gameLevel ++;
			if(CV.AI>200){
				CV.AI =parseInt(CV.AI-100);
			}else if (CV.AI>10){
				CV.AI = CV.AI-10;
			}
			for(let etank of enemyTanks){
				etank.speed++;
				etank.maxBullet++;
			}
		}else return;
	};



	//AI change eTank dir automatically.
	enemyTankDirLoop = (gameTime, enemyTanks)=>{
		if(gameTime%CV.AI==0){
			for(let etank of enemyTanks){
				if(etank.isAlive){
					etank.dir =  Math.floor(Math.random()*4);
					etank.shoot();
				}
			}
		}
	};

	//draw enemyTank pass to the canvas component
	enemyTankDraw = (ctx)=>{
		for(let etank of this.enemyTanks){
			etank.draw(ctx);
		}
	};

	playerTankDraw = (ctx)=>{
		this.playerTank.draw(ctx);
	};

	boomDraw = (ctx)=>{
		for(let boom of this.booms){
			if(boom.isOver){
				this.booms.splice(this.booms.indexOf(boom),1);
			}else{

				boom.draw(ctx);
			}
		}
	};

	drawAll = (ctx)=>{
		ctx.clearRect(0,0,512,448);
		ctx.fillStyle="#000";
		ctx.fillRect(CV.SCREEN_OFFSET_X, CV.SCREEN_OFFSET_Y, CV.GAME_AREA_WIDTH, CV.GAME_AREA_HEIGHT);
		this.enemyTankDraw(ctx);
		this.playerTankDraw(ctx);
		this.boomDraw(ctx);
		drawPanel(this.playerTank.lives,this.gameScore, this.state.gameTimeCount, this.gameLevel, ctx);
		
	};

	//handle player keybaord start moving the tank
	handleTankMove = (e)=>{
		let key = e.which||e.keyCode||0;
		if(key ==32) {
			this.playerTank.shoot();
		}
		else if(key==87||key==68||key==83||key==65)
		{	
			this.playerTank.isMoving =true;
			if(key==87) this.playerTank.dir=0;
			else if(key ==83 ) this.playerTank.dir=1;
			else if(key ==65) this.playerTank.dir =2;
			else if(key ==68) this.playerTank.dir =3;
		}
	};

	//handle player keyboard stop moving the tank
	handleTankStop = (e)=>{
		let key = e.which||e.keyCode||0;
		if(key==87||key==68||key==83||key==65){
			this.playerTank.isMoving =false;
		}
	};


	render(){
		return (
			<div>
				<Header />
				<TankCanvas 				
				handleTankMove={this.handleTankMove}
				handleTankStop = {this.handleTankStop}
				//drawAll = {this.drawAll}	
				gameInit ={this.gameInit}
				startMenu = {this.startMenu}
						
				/>
			</div>
			);
	}
}

export default App;
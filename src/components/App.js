import React from 'react';
import Header from './Header';
import TankCanvas from './TankCanvas';
import EnemyTank from '../elements/enemyTank';
import PlayerTank from '../elements/playerTank';
import CV from '../elements/ConstVariable';

//main app
class App extends React.Component{

	constructor (props){
		super(props);
		this.state = {
			playerTank: new PlayerTank(),
			enemyTanks: [new EnemyTank(1), new EnemyTank(2),new EnemyTank(3), new EnemyTank(2),new EnemyTank(1)]
		};
		
		
	}


	componentDidMount() {

		var gameTimeCount = 0;
		const mainGameLoop = ()=>{
			//this.state.playerTank.move();
			this.setState({
				playerTank: this.state.playerTank
			});
			gameTimeCount +=20;

			this.enemyTankDirLoop(gameTimeCount, this.state.enemyTanks);

			this.mainTimer = setTimeout(mainGameLoop,20);
		}

		mainGameLoop();
		
		
	}



	componentWillUnmount() {
		clearTimeout(this.mainTimer);

	}

	
	//handle player keybaord input control the tank
	handleTankMove = (e)=>{
		let key = e.which||e.keyCode||0;
		if(key ==32) {
			this.state.playerTank.shoot();
		}
		else if(key==87||key==68||key==83||key==65)
		{	
			this.state.playerTank.isMoving =true;
			if(key==87) this.state.playerTank.dir=0;
			else if(key ==83 ) this.state.playerTank.dir=1;
			else if(key ==65) this.state.playerTank.dir =2;
			else if(key ==68) this.state.playerTank.dir =3;
		}
	};
	handleTankStop = (e)=>{
		let key = e.which||e.keyCode||0;
		if(key==87||key==68||key==83||key==65){
			this.state.playerTank.isMoving =false;
		}
	};

	enemyTankMove = (enemyTanks,ctx)=>{
		for(let etank of enemyTanks){
			etank.draw(ctx);
		}
	};

	enemyTankDirLoop = (gameTime, enemyTanks)=>{
		if(gameTime%CV.AI==0){
			for(let etank of enemyTanks){
				etank.dir =  Math.floor(Math.random()*4);
				etank.shoot();
			}
		}
	};


	render(){
		return (
			<div>
				<Header />
				<TankCanvas 
				playerTank={this.state.playerTank}
				enemyTanks={this.state.enemyTanks}
				handleTankMove={this.handleTankMove}
				handleTankStop = {this.handleTankStop}
				enemyTankMove = {this.enemyTankMove}
				/>
			</div>
			);
	}
}

export default App;
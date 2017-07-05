import React from 'react';
import ReactDOM from 'react-dom';
import CV from '../elements/ConstVariable';

class TankCanvas extends React.Component{

		
	constructor (props){
		super(props);
		let ctx;
	}



	componentDidMount() {
		this.ctx = ReactDOM.findDOMNode(this).getContext('2d');
		this.props.playerTank.draw(this.ctx);
		this.props.enemyTankMove(this.props.enemyTanks, this.ctx);
		window.addEventListener("keydown", this.props.handleTankMove);
		window.addEventListener("keyup", this.props.handleTankStop);
	}
	
	componentDidUpdate() {
	
	}

	componentWillReceiveProps(nextProps) {
		this.ctx.clearRect(0,0,512,448);
		this.ctx.fillStyle="#000";
		this.ctx.fillRect(CV.SCREEN_OFFSET_X, CV.SCREEN_OFFSET_Y, CV.GAME_AREA_WIDTH, CV.GAME_AREA_HEIGHT);
		nextProps.playerTank.draw(this.ctx);
		this.props.enemyTankMove(this.props.enemyTanks, this.ctx);

	}

	componentWillUpdate(nextProps, nextState) {
		
	}

	
	render(){
		return(
				<canvas id="tankgame" width="512" height="448"> 
				</canvas>
			);
	}


}

	
TankCanvas.propTypes = {
	playerTank: React.PropTypes.object.isRequired,
	handleTankMove: React.PropTypes.func.isRequired,
	handleTankStop: React.PropTypes.func.isRequired,
	enemyTanks: React.PropTypes.array.isRequired,
	enemyTankMove:React.PropTypes.func.isRequired
	
}

export default TankCanvas;
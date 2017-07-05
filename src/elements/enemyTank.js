import Tank from './tank';
import Images from './image';
import CV from './ConstVariable';


class EnemyTank extends Tank{

	constructor(enemyType){
		super();
		
		(Math.random()>0.5)? this.x = CV.SCREEN_OFFSET_X:(this.x=CV.SCREEN_OFFSET_X+CV.GAME_AREA_WIDTH-this.size);
		this.y = CV.SCREEN_OFFSET_Y;
		this.type = enemyType;
		this.lives = 5;
		this.isPlayer = false;
		this.protected = false;
		this.isMoving =true;
		

	}

	changeDir = ()=>{

		if(this.notHit()) this.dir = Math.floor(Math.random()*4);
		else{
			let tempDir = this.dir;
			while(tempDir == this.dir) this.dir = Math.floor(Math.random()*4);
		}
	};

	


	draw = (ctx)=>{
		switch(this.type){
			case 1: ctx.drawImage(Images.tankAll, 0+this.dir*this.size,32,this.size,this.size, this.x,this.y,this.size,this.size); break;

			case 2:	ctx.drawImage(Images.tankAll, 128+this.dir*this.size,32,this.size,this.size, this.x,this.y,this.size,this.size); break;

			case 3: ctx.drawImage(Images.tankAll, 0+this.dir*this.size,64,this.size,this.size, this.x,this.y,this.size,this.size); break;

			default: return 
		}
		this.move();
		this.refreshBullet(ctx);


	};


	


}

export default EnemyTank;
import Tank from './tank';
import Images from './image';
import Boom from './boom';

class PlayerTank extends Tank{

	constructor(){
		super();
		this.x = 150;
		this.y = 400;
		this.lives = 5;
		this.isPlayer = true;
		this.protected = true;
		this.protectedTime = 500;

	}

	destory = (obj)=>{
		this.lives--;
		
		obj.booms.push(new Boom(0,this));

		if(this.lives >=0){
			this.x = 150;
			this.y = 400;
			this.protected = true;
			this.protectedTime = 500;
		}else{
			setTimeout(()=>{obj.gameOver =true;}, 1000);
		}
	};


	draw = (ctx)=>{
		if(this.lives>=0){
			this.move();
			ctx.drawImage(Images.tankAll, 0+this.dir*this.size,0,this.size,this.size, this.x,this.y,this.size,this.size);
			this.refreshBullet(ctx);
		}

	};



}

export default PlayerTank;
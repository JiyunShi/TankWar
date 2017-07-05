import Tank from './tank';
import Images from './image';

class PlayerTank extends Tank{

	constructor(){
		super();
		this.x = 100;
		this.y = 100;
		this.lives = 5;
		this.isPlayer = true;
		this.protected = true;
		this.protectedTime = 500;

	}

	draw = (ctx)=>{
		this.move();
		ctx.drawImage(Images.tankAll, 0+this.dir*this.size,0,this.size,this.size, this.x,this.y,this.size,this.size);
		this.refreshBullet(ctx);

	};



}

export default PlayerTank;
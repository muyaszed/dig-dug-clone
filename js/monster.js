game.Monster = me.Entity.extend({
	init :function(x, y) {
		

		this._super(me.Entity, "init", [x, y, {
			image: me.loader.getImage("monster"),
			width: game.Monster.width, 
			height: game.Monster.height
		}]);
		
		this.name = "monster";
		this.body.collisionType = me.collision.types.ENEMY_OBJECT;

		this.body.removeShape(this.body.getShape(0));
		this.body.addShape(new me.Rect(0,0,15,18));
		
		this.body.setVelocity(0.8, 0.8);
		this.body.gravity = 0;

		this.renderable.addAnimation('walk', [0,1,2,3], 100);
		this.renderable.addAnimation('ghost', [4,5,6], 100);
		this.renderable.setCurrentAnimation('walk');

	},

	movement: function(direction) {
		if(direction === "left") {
			this.renderable.flipX(true);
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
				
		}else if(direction === "right") {
			this.renderable.flipX(false);
			this.body.vel.x += this.body.accel.x * me.timer.tick;	
			
		}else if(direction === "up") {
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			
		}else if(direction === "down") {
			this.body.vel.y += this.body.accel.y * me.timer.tick;
			
		}
		
	},

	update : function (dt) {
		
		this._super(me.Entity, "update", [dt]);
		this.body.update(dt);

		return true;
	},

	

	

	
});


game.Monster.width = 24;
game.Monster.height = 24;



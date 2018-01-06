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

		this.maxX = me.game.viewport.width - this.width - 160;
		this.maxY = me.game.viewport.height - this.height;


		this.renderable.addAnimation('walk', [0,1,2,3], 100);
		this.renderable.addAnimation('ghost', [4,5,6], 100);
		this.renderable.setCurrentAnimation('walk');

		this.movement("right");


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
		me.collision.check(this);
		this.collideBoundry();

		this.pos.x = this.pos.x.clamp(0, this.maxX);
		this.pos.y = this.pos.y.clamp(0, this.maxY);

		return true;
	},

	onCollision: function (res, other) {

		if (res.b.body.collisionType === me.collision.types.WORLD_SHAPE) {
			
			this.collideGround(res);
		}

		return false;
		
	},

	collideBoundry: function() {
		
		if(this.pos.x < 0 || this.pos.x > this.maxX || this.pos.y < 0 || this.pos.y > this.maxY) {
			if(game.digger.pos.y > this.pos.y) {
				this.movement("down");
			}

			if(game.digger.pos.y < this.pos.y) {
				this.movement("up");
			}

			if(game.digger.pos.x > this.pos.x) {
				this.movement("right");
			}

			if(game.digger.pos.x < this.pos.x) {
				this.movement("left");
			}
			
		}else {
			var diffPlusX = game.digger.pos.x + 100; // line of sight at 100 pixels high on x
		    var diffMinusX = game.digger.pos.x - 100; // line of sight at -100 pixels high on x
		    var diffPlusY = game.digger.pos.y + 100; // line of sight at 100 pixels high on y
		    var diffMinusY = game.digger.pos.y - 100; // line of sight at -10 pixels high on y
		    var howClose = 0; // how close is does the this start chaing you

		    
		    	if (Math.floor(this.pos.y) == (Math.floor(game.digger.pos.y))
			      || Math.floor(this.pos.y) < (Math.floor(diffPlusY))
			      && Math.floor(this.pos.y) > (Math.floor(diffMinusY)))
		    	{
			         // in the line of sight on horizontal line
			         	// this.body.vel.y = 0;
			             if (game.digger.pos.x > this.pos.x + howClose){
			             
			              	this.movement("right");

			            } else if (game.digger.pos.x < this.pos.x - howClose) {
			              
			              this.movement("left");
			              
			            }
			      }

			      if (Math.floor(this.pos.x) == (Math.floor(game.digger.pos.x))
			      || Math.floor(this.pos.x) < (Math.floor(diffPlusX))
			      && Math.floor(this.pos.x) > (Math.floor(diffMinusX))){
			        // in the line of sight on vertical line
			    		// this.body.vel.x = 0;
			            if (game.digger.pos.y > this.pos.y + howClose){
			              
			              this.movement("down");
			            } else if (game.digger.pos.y < this.pos.y - howClose){

			              this.body.vel.y -= this.body.accel.y * me.timer.tick;
			              
			              this.movement("up");
			            }
			      }
		}
	},

	collideGround: function(res) {

		if(res.a.body.vel.x > 0 || res.a.body.vel.x < 0 || res.a.body.vel.y > 0 || res.a.body.vel.y < 0)
			this.pos.sub(res.overlapV);
			if(game.digger.pos.y > this.pos.y) {
				this.movement("down");
			}

			if(game.digger.pos.y < this.pos.y) {
				this.movement("up");
			}

			if(game.digger.pos.x > this.pos.x) {
				this.movement("right");
			}

			if(game.digger.pos.x < this.pos.x) {
				this.movement("left");
			}


	},

	

	

	
});


game.Monster.width = 24;
game.Monster.height = 24;




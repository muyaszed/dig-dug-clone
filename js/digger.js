game.Digger = me.Entity.extend({
	init: function () {
		var image = me.loader.getImage("digger");
			
		this._super(me.Entity, "init", [240, 10, {
			image: image,
			width: 48,
			height: 24,

		}]);
		this.name = "theDigger";
		this.renderable.flipX(true);
		this.body.gravity = 0;
		this.body.setVelocity(1, 1);
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;

		this.maxX = me.game.viewport.width - this.width - 136;
		this.maxY = me.game.viewport.height - this.height;

		this.body.removeShape(this.body.getShape(0));
		this.body.addShape(new me.Rect(0,0,20,20));
		this.anchorPoint.set(0, 0.5);

		this.renderable.addAnimation('walk', [2, 3, 4, 5, 6], 100);
		this.renderable.addAnimation('walkV', [12], 100);
		this.renderable.addAnimation('stand', [0, 1], 300);
		this.renderable.addAnimation('standV', [1, 2], 300);
		this.renderable.addAnimation('fire', [14]);
		this.renderable.setCurrentAnimation('walk');

		this.fisrtMove = false;
		this.downPressed = false;
		this.upPressed = false;
		this.leftPressed = false;
		this.rightPressed = false;
		this.firePressed = false;
		this.anyDirectionKeyPressed = false;
	},

	update: function (dt) {
		
		this._super(me.Entity, "update", [dt]);
		console.log(this.anyDirectionKeyPressed);

		if(!this.anyDirectionKeyPressed) {
			me.audio.playTrack("bg");	
		}
		
		

		if (me.input.isKeyPressed('left')) {

			this.diggerAnim("left");
			
		}else if (me.input.isKeyPressed('right')) {
			
			this.diggerAnim("right");

		}else if (me.input.isKeyPressed('up')) {
			
			this.diggerAnim("up");
	
		}else if (me.input.isKeyPressed('down')) {
			
			this.diggerAnim("down");			

		}else if (me.input.isKeyPressed('space')) {
			me.audio.stopTrack();
			me.audio.play("fire");
			this.body.vel.x = 0;
			this.body.vel.y = 0;


			if(!this.firePressed) {

				if(this.renderable._flip.lastX) {

					if(this.leftPressed) {
						this.body.addShape(new me.Rect(-20,0,20,20));
						this.anchorPoint.set(0.5, 0.5);	
					}else if(this.upPressed) {
						this.body.addShape(new me.Rect(0,-20,20,20));
						this.anchorPoint.set(0.5, 0.5);	
					}else if(this.downPressed) {
						this.body.addShape(new me.Rect(0,20,20,20));
						this.anchorPoint.set(0.5, 0.5);
					}
					
				}else {

					if(this.rightPressed) {
						this.body.addShape(new me.Rect(20,0,20,20));
						this.anchorPoint.set(0.5, 0.5);	
					}else if(this.upPressed) {
						this.body.addShape(new me.Rect(0,-20,20,20));
						this.anchorPoint.set(0.5, 0.5);	
					}else if(this.downPressed) {
						this.body.addShape(new me.Rect(0,20,20,20));
						this.anchorPoint.set(0.5, 0.5);
					}
				}

			}

			
			if(!this.renderable.isCurrentAnimation('fire')) {

				this.renderable.setCurrentAnimation('fire');
			}

			this.firePressed = true;
			
		}else {
			this.anyDirectionKeyPressed = false;
			me.audio.stopTrack();
			this.body.vel.x = 0;
			this.body.vel.y = 0;

			if(this.firePressed) {
				
				this.body.removeShapeAt(1);

				if(this.renderable._flip.lastX) {
					if(this.leftPressed) {
						this.anchorPoint.set(0, 0.5);
					}else if(this.upPressed) {
						this.anchorPoint.set(0.5, 0);
					}else if(this.downPressed) {
						this.anchorPoint.set(0.5, 1);
					}
				}else {
					if(this.rightPressed) {
					 this.anchorPoint.set(1, 0.5);
					}else if(this.upPressed) {
						this.anchorPoint.set(0.5, 0);
					}else if(this.downPressed) {
						this.anchorPoint.set(0.5, 1);
					}
				}
				me.audio.stop("fire");
				this.firePressed = false;
			}
			
			
			if(!this.renderable.isCurrentAnimation('stand')) {
				this.renderable.setCurrentAnimation('stand');
			}
		}


		this.body.update(dt);
		me.collision.check(this);

		this.pos.x = this.pos.x.clamp(0, this.maxX);
		this.pos.y = this.pos.y.clamp(0, this.maxY);

		return true;
		
	},

	onCollision: function (res, other) {
		

		if (res.b.body.collisionType === me.collision.types.WORLD_SHAPE) {
			if(!this.renderable.isCurrentAnimation('fire')) {
				game.levelManager.removeChild(other);
			}
		}else if(res.b.body.collisionType === me.collision.types.ENEMY_OBJECT) {
			
			if(this.renderable.isCurrentAnimation('fire')) {
				res.b.body.setVelocity(0, 0);
				res.b.renderable.flicker(750,function() {
					game.levelManager.removeChild(other);
					me.audio.play("dead");
					game.data.score += 100;
				});
			}else {
				
			
				res.a.pos.sub(res.overlapV);
				res.a.renderable.flicker(750,() => {
					me.game.world.removeChild(this);

				});
				setTimeout(function() {
					
					game.data.highScore += game.data.score;	
					game.playScreen.reset();

				}, 1000);
				
			}
		}
		return false;
	},

	diggerAnim: function(position) {
			
			if(position === "up") {
				this.anyDirectionKeyPressed = true;
				this.firstMove = true;
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
				this.body.vel.x = 0;

				if(this.downPressed) {
					this.renderable.flipX(this.renderable._flip.lastX ? false : true);
					this.anchorPoint.set(0.5, 0)	
				}
				
				if(!this.upPressed && !this.downPressed) {
					
					this.renderable.currentTransform.rotate(-Math.PI/2);
					this.anchorPoint.set(0.5, 0)
				}

				this.upPressed = true;
				this.downPressed = false;
				this.leftPressed = false;
				this.rightPressed = false;
				
				
	
			}else if(position === "down") {
				this.anyDirectionKeyPressed = true;
				this.firstMove = true;
				this.body.vel.y += this.body.accel.y * me.timer.tick;
				this.body.vel.x = 0;


				if(this.upPressed) {
					this.renderable.flipX(this.renderable._flip.lastX ? false : true);	
					this.anchorPoint.set(0.5, 1)
				}

				if(!this.upPressed && !this.downPressed) {
					
					this.renderable.currentTransform.rotate(Math.PI/2);
					this.anchorPoint.set(0.5, 1)
				}

				this.downPressed = true;
				this.upPressed = false;
				this.leftPressed = false;
				this.rightPressed = false;
				

				
			}else if(position === "left") {
				this.anyDirectionKeyPressed = true;
				this.firstMove = true;
				this.body.vel.x -= this.body.accel.x * me.timer.tick;
				this.body.vel.y = 0;

				if(this.rightPressed) {
					this.renderable.flipX(true);
					this.anchorPoint.set(0, 0.5)	
				}

				if(this.downPressed) {
					this.renderable.currentTransform.rotate(-Math.PI/2);
					this.anchorPoint.set(0, 0.5)

					if(!this.renderable._flip.lastX) {
						
						this.renderable.flipX(true);
						
					}
				}

				if(this.upPressed) {
					this.renderable.currentTransform.rotate(Math.PI/2);
					this.anchorPoint.set(0, 0.5)

					if(!this.renderable._flip.lastX) {
						
						this.renderable.flipX(true);
						
					}
				}

				this.leftPressed = true;
				this.downPressed = false;
				this.upPressed = false;
				this.rightPressed = false;
							

			}else if(position === "right") {
				this.anyDirectionKeyPressed = true;
				this.body.vel.x += this.body.accel.x * me.timer.tick;
				this.body.vel.y = 0;

				if(!this.firstMove) {
					this.renderable.flipX(false);
					this.anchorPoint.set(1, 0.5)
					this.firstMove = true;
				}
				

				if(this.leftPressed) {	
					this.renderable.flipX(false);
					this.anchorPoint.set(1, 0.5)
				}

				if(this.downPressed) {
					this.renderable.currentTransform.rotate(-Math.PI/2);
					this.anchorPoint.set(1, 0.5)

					if(this.renderable._flip.lastX) {
						
						this.renderable.flipX(false);
						
					}
				}

				if(this.upPressed) {
					this.renderable.currentTransform.rotate(Math.PI/2);
					this.anchorPoint.set(1, 0.5)

					if(this.renderable._flip.lastX) {
						
						this.renderable.flipX(false);
						
					}
					

				}

				this.rightPressed = true;
				this.downPressed = false;
				this.leftPressed = false;
				this.upPressed = false;

				
				
			}


			if(!this.renderable.isCurrentAnimation('walk')) {
				this.renderable.setCurrentAnimation('walk');
			}
			
		

	},

});
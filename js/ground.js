//  js/ground.js
game.Ground = me.Entity.extend({
	init :function(x, y, color, dotColor) {
		this._super(me.Entity, "init", [x, y, {width: game.Ground.width, height: game.Ground.height}]);
		this.color = color;
		this.dotColor = dotColor;
		this.body.setVelocity(0, 0);
		this.body.collisionType = me.collision.types.WORLD_SHAPE;
		this.renderable = new (me.Renderable.extend({
			init : function() {
				this._super(me.Renderable, "init", [0, 0, game.Ground.width, game.Ground.height]);
			},

			draw : function(renderer) {
				
				renderer.setColor(color);
				renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);

				for(i=this.pos.y; i<this.height; i+=7) {
					for(j=this.pos.x; j<this.width; j+=7) {
						renderer.setColor(dotColor);
						renderer.fillRect(j, i, 1, 1);

					}
				}
			},
		}));
	},

	update : function (dt) {
		this._super(me.Entity, "update", [dt]);
		this.body.update(dt);
		return true;
	},
});

game.Ground.width = 15;
game.Ground.height = 15;



game.LevelManager = me.Container.extend({
	init : function() {
		this._super(me.Container, "init", [0, 0]);
		this.name = "levelManager";
		this.data = {
			level: {
				
				"level1": [
					// y, y-max, x, x-max, color
					[25, 100, 0, 480, "#efa615", "red"],
					[100, 120, 0, 50, "#efa615", "red"],
					[100, 120, 135, 480, "#efa615", "red"],
					[130, 240, 0, 480, "#efa615", "red"],
					[250, 340, 0,480, "#af6a15", "yellow"],
					[340, 365, 0, 300, "#af6a15", "yellow"],
					[340, 365, 390, 480, "#af6a15", "yellow"],
					[370, 480, 0, 480, "#af6a15", "yellow"]
				]
			},

			monsters: {

				"level1": [
					[65, 103],
					[305, 345]
				]
				
			},
		}
	},


	createLevel : function(levelName) {
		let _this = this;
		this.data.level[levelName].forEach(function(item) {	
			for (var i=item[0]; i < item[1]; i+=15) {
	            for(var j=item[2]; j < item[3]; j+=15) {

	                _this.addChild(me.pool.pull("ground", j, i, item[4], item[5]), 1);     
	            }
	               
	        }
		});

		this.updateChildBounds();
	},

	createMonsters : function(levelName) {
		let _this = this;
		this.data.monsters[levelName].forEach(function(monster) {
			
	      	_this.addChild(me.pool.pull("monster", monster[0], monster[1]), 3);     
	               
		});
		this.updateChildBounds();
		this.createdMonsters = true;
	},

	update :  function(dt) {
		if(this.getChildByName("monster").length === 0 && this.createdMonsters) {
			game.data.highScore += game.data.score;
			game.playScreen.reset();
		}


		this._super(me.Container, "update", [dt]);
		this.updateChildBounds();
		
		return true;
	} 
});
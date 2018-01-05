game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        game.levelManager = new game.LevelManager();
        game.levelManager.createLevel("level1");
        game.levelManager.createMonsters("level1");

        me.game.world.addChild(new me.ColorLayer("background", "#543107"), 0);
        me.game.world.addChild(game.levelManager);
        me.game.world.addChild(me.pool.pull("theDigger"));

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        me.input.bindKey(me.input.KEY.UP, 'up');
        me.input.bindKey(me.input.KEY.DOWN, 'down'); 
        me.input.bindKey(me.input.KEY.SPACE, 'space');
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
         me.input.unbindKey(me.input.KEY.LEFT, 'left');
            me.input.unbindKey(me.input.KEY.RIGHT, 'right');
            me.input.unbindKey(me.input.KEY.UP, 'up');
            me.input.unbindKey(me.input.KEY.DOWN, 'down');
            me.input.unbindKey(me.input.KEY.SPACE, 'space');
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});

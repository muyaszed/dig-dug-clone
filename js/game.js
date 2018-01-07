
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,
        highScore : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {wrapper : "screen", scale : "auto", scaleMethod : "fit", doubleBuffering: true})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        this.playScreen = new game.PlayScreen();
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, this.playScreen);

        me.pool.register("ground", game.Ground);
        me.pool.register("theDigger", game.Digger);
        me.pool.register("monster", game.Monster);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};

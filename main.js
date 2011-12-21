//game resources
var g_resources = [{
    name : "paredes",
    type : "image",
    src : "data/Texturas/paredes.png"
}, {
    name : "suelos",
    type : "image",
    src : "data/Texturas/suelos.png"
}, {
    name : "atrezzo",
    type : "image",
    src : "data/Texturas/atrezzo.png"
}, {
    name : "pueblo",
    type : "image",
    src : "data/Texturas/pueblo.png"
},{
    name : "mas sombras",
    type : "image",
    src : "data/Texturas/mas sombras.png"
},{
    name : "sombras-par",
    type : "image",
    src : "data/Texturas/sombras-par.png"
}, 

//Niveles

{
    name : "area01",
    type : "tmx",
    src : "data/Nivel01.tmx"
},  {
    name : "area02",
    type : "tmx",
    src : "data/Nivel02.tmx"
},   {
    name : "area03",
    type : "tmx",
    src : "data/Nivel03.tmx"
}, 


//Personaje
{
    name : "personajillo",
    type : "image",
    src : "data/Texturas/personajillo.png"
},
// the parallax background
{
    name : "area01_bkg0",
    type : "image",
    src : "data/area01_parallax/area01_bkg0.png"
}, {
    name : "area01_bkg1",
    type : "image",
    src : "data/area01_parallax/area01_bkg1.png"
},

// our enemty entity
{
    name : "maloojo",
    type : "image",
    src : "data/Texturas/maloojo.png"
},

{
    name : "malonota",
    type : "image",
    src : "data/Texturas/malonota.png"
},

{
    name : "maloneurona",
    type : "image",
    src : "data/Texturas/maloneurona.png"
},

{
    name : "maloneuronagrande",
    type : "image",
    src : "data/Texturas/maloneuronagrande.png"
},

{
    name : "maloboca",
    type : "image",
    src : "data/Texturas/maloboca.png"
},

//Boton
{
    name : "button",
    type : "image",
    src : "data/Texturas/boton.png"
},
// game font
{
    name : "32x32_font",
    type : "image",
    src : "data/Texturas/32x32_font.png"
},
// audio resources
{
    name: "cling",
    type: "audio",
    src: "data/audio/",
    channel: 2
},
{
    name: "ok",
    type: "audio",
    src: "data/audio/",
    channel: 2
},
{
    name: "boton",
    type: "audio",
    src: "data/audio/",
    channel: 2
},{
    name: "stomp",
    type: "audio",
    src: "data/audio/",
    channel: 2
},{
    name: "grito",
    type: "audio",
    src: "data/audio/",
    channel: 2
},{
    name: "error",
    type: "audio",
    src: "data/audio/",
    channel: 2
},{
    name: "stomp",
    type: "audio",
    src: "data/audio/",
    channel: 2
},


//music
{
    name : "nivel01",
    type : "audio",
    src : "data/audio/",
    channel : 1
}, {
    name : "nivel02",
    type : "audio",
    src : "data/audio/",
    channel : 1
}, {
    name : "nivel03",
    type : "audio",
    src : "data/audio/",
    channel : 1
}, {
    name : "menu",
    type : "audio",
    src : "data/audio/",
    channel : 1
},{
    name : "gameover",
    type : "audio",
    src : "data/audio/",
    channel : 1
},
// title screen
{
    name : "titulo",
    type : "image",
    src : "data/GUI/titulo.png"
},{
    name : "loading_nivel01",
    type : "image",
    src : "data/GUI/loading_nivel01.png"
},{
    name : "loading_nivel02",
    type : "image",
    src : "data/GUI/loading_nivel02.png"
},{
    name : "loading_nivel03",
    type : "image",
    src : "data/GUI/loading_nivel03.png"
},{
    name : "game_over",
    type : "image",
    src : "data/GUI/game_over.png"
}
];

var jsApp = {
    /* ---

     Initialize the jsApp

     --- */
    onload : function() {

        // init the video
        if(!me.video.init('jsapp', 954, 594, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        // initialize the "audio"
        me.audio.init("mp3,ogg");

        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);

        // set all resources to be loaded
        me.loader.preload(g_resources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
        //me.debug.renderHitBox = true;

    },
    /* ---

     callback when everything is loaded

     --- */
    loaded : function() {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.MENU, new TitleScreen());

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());
        
        //set the Ready
        me.state.set(me.state.READY, new ReadyScreen());
        me.state.set(me.state.GAMEOVER, new GameOverScreen());

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 15);

        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", PlayerEntity);
        //me.entityPool.add("CoinEntity", CoinEntity);
        me.entityPool.add("ButtonEntity01", ButtonEntity01);
        me.entityPool.add("ButtonEntity02", ButtonEntity02);
        me.entityPool.add("ButtonEntity03", ButtonEntity03);
        me.entityPool.add("EnemyEntity", EnemyEntity);
        me.entityPool.add("EnemyEntityV", EnemyEntityV);
        me.entityPool.add("LevelEntity02", LevelEntity02);
        me.entityPool.add("LevelEntity03", LevelEntity03);
        me.entityPool.add("LevelEntity04", LevelEntity04);
        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        
        
        // display the menu title
        me.state.change(me.state.MENU);
    }
};
// jsApp
/* the in game stuff*/


//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});

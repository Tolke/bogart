/*-------------------
 a player entity
 -------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({

    /* -----

    constructor

    ------ */

    init: function(x, y, settings) {

       // call the constructor
        this.parent(x, y, settings);
    
        // set the walking & jumping speed
        this.setVelocity(3, 3);
        
    
        // adjust the bounding box
        this.updateColRect(9, 46, 2, 56);
        
        // disable gravity
        this.gravity = 0;
    
    
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
                       
        this.addAnimation("down", [9,11]);
        this.addAnimation("left", [0,1,2,1]);
        this.addAnimation("up", [3,5]);
        this.addAnimation("right", [6,7,8,7]);
        this.addAnimation("stand", [7]);
        this.setCurrentAnimation('stand');

        
    },

/* -----
update the player pos
------ */
update: function() {
            hasSpeed = this.vel.y != 0 || this.vel.x != 0
            if (me.input.isKeyPressed('left'))
            {
                this.animationspeed = me.sys.fps / 10;
                this.vel.x = -this.accel.x * me.timer.tick
                this.vel.y = 0;
                this.setCurrentAnimation('left')
                this.direction = 'left'
            }
            else if (me.input.isKeyPressed('right'))
            {
                this.animationspeed = me.sys.fps / 10;
                this.vel.x = this.accel.x * me.timer.tick 
                this.vel.y = 0;
                this.setCurrentAnimation('right')
                this.direction = 'right'
            }

            else if (me.input.isKeyPressed('up'))
            {
                this.animationspeed = me.sys.fps / 10;
                this.vel.y = -this.accel.y * me.timer.tick 
                this.vel.x = 0;
                this.setCurrentAnimation('up')
                this.direction = 'up'
            }
            else if (me.input.isKeyPressed('down'))
            {
                this.animationspeed = me.sys.fps / 10;
                this.vel.y = this.accel.y * me.timer.tick 
                this.vel.x = 0;
                this.setCurrentAnimation('down')
                this.direction = 'down'
            } else {
                this.vel.x = 0;
                this.vel.y = 0;
            }

    // check for collision
    res = me.game.collide(this);
    if (res) {
        //this.flicker(40);
        if (res.type == me.game.ENEMY_OBJECT) {
                // bounce
                if(! this.flickering){
                     me.audio.play("stomp");
                     me.audio.play("grito");
                    // let's flicker in case we touched an enemy
                    if(me.game.HUD.getItemValue("vidas") == 0){
                        this.flicker(40, function (){// load a level
                            me.state.change(me.state.GAMEOVER);
                        })
                    }else{
                        this.flicker(40, function (){// load a level
                            me.game.HUD.updateItemValue("vidas", - 1);
                            me.state.change(me.state.PLAY);
                        })
                    }
                }
        }
    }
    
    // check & update player movement
    updated = this.updateMovement();


    // update animation
    if (updated) {
        // update objet animation
        this.parent(this);
    }
    return updated;
}

});



/* --------------------------
 a button Entity
 ------------------------ */

var ButtonEntity01 = me.ObjectEntity.extend({

    init : function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "button";
        settings.spritewidth = 40;

        // call the parent constructor
        this.parent(x, y, settings);

        this.updateColRect(-1, 0, 10, 50);
        // make it collidable
        this.collidable = true;

        // disable gravity
        this.gravity = 0;
        
        this.addAnimation("down", [1]);
        this.addAnimation("up", [0]);
        this.setCurrentAnimation('up');

    },
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision : function(res, obj) {

        if(this.isCurrentAnimation('up')){
            this.setCurrentAnimation('down');
            // do something when collide
            me.audio.play("boton");
            me.gamestat.updateValue("botones01", -1);
            if (me.gamestat.getItemValue("botones01") == 0){
                me.audio.play("ok");
            }
            var t=setTimeout(function(ButtonEntity){
                if((me.gamestat.getItemValue("botones01") > 0) && (!this.isCurrentAnimation('up'))){
                    ButtonEntity.setCurrentAnimation('up');
                    me.audio.play("error");
                    me.gamestat.updateValue("botones01", 1);
                }
            },40000,this);
        }
    } 

});

var ButtonEntity02 = me.ObjectEntity.extend({

    init : function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "button";
        settings.spritewidth = 40;

        // call the parent constructor
        this.parent(x, y, settings);

        this.updateColRect(-1, 0, 10, 50);
        // make it collidable
        this.collidable = true;

        // disable gravity
        this.gravity = 0;
        
        this.addAnimation("down", [1]);
        this.addAnimation("up", [0]);
        this.setCurrentAnimation('up');

    },
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision : function(res, obj) {

        if(this.isCurrentAnimation('up')){
            this.setCurrentAnimation('down');
            // do something when collide
            me.audio.play("boton");
            me.gamestat.updateValue("botones02", -1);
            if (me.gamestat.getItemValue("botones02") == 0){
                me.audio.play("ok");
            }
            var t=setTimeout(function(ButtonEntity){
                if((me.gamestat.getItemValue("botones02") > 0) && (!this.isCurrentAnimation('up'))){
                    ButtonEntity.setCurrentAnimation('up');
                    me.audio.play("error");
                    me.gamestat.updateValue("botones02", 1);
                }
            },80000,this);
        }
    } 

});

var ButtonEntity03 = me.ObjectEntity.extend({

    init : function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "button";
        settings.spritewidth = 40;

        // call the parent constructor
        this.parent(x, y, settings);

        this.updateColRect(-1, 0, 10, 50);
        // make it collidable
        this.collidable = true;

        // disable gravity
        this.gravity = 0;
        
        this.addAnimation("down", [1]);
        this.addAnimation("up", [0]);
        this.setCurrentAnimation('up');

    },
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision : function(res, obj) {

        if(this.isCurrentAnimation('up')){
            this.setCurrentAnimation('down');
            // do something when collide
            me.audio.play("boton");
            me.gamestat.updateValue("botones03", -1);
            if (me.gamestat.getItemValue("botones03") == 0){
                me.audio.play("ok");
            }
            var t=setTimeout(function(ButtonEntity){
                if((me.gamestat.getItemValue("botones03") > 0) && (!this.isCurrentAnimation('up'))){
                    ButtonEntity.setCurrentAnimation('up');
                    me.audio.play("error");
                    me.gamestat.updateValue("botones03", 1);
                }
            },100000,this);
        }
    } 

});
/* --------------------------
an enemy Entity
------------------------ */
var EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {

        this.parent(x, y, settings);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
        // adjust the bounding box
        this.updateColRect(6, 48, 6, 52);

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;
        // disable gravity
        this.gravity = 0;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
        
        this.addAnimation("down", [9,11]);
        this.addAnimation("left", [0,1,2,1]);
        this.addAnimation("up", [3,5]);
        this.addAnimation("right", [6,7,8,7]);
        this.addAnimation("stand", [7]);
        this.setCurrentAnimation('left');
        this.direction = 'left';


    },

    update: function() {

        if (this.alive) {
            if (this.pos.x <= this.startX) {
                this.animationspeed = me.sys.fps / 10;
                this.vel.x = this.accel.x * me.timer.tick * 0.75
                this.vel.y = 0;
                this.setCurrentAnimation('right');
                this.direction = 'right';
                
            } else if (this.pos.x >= this.endX) {
                this.animationspeed = me.sys.fps / 10;
                this.vel.x = -this.accel.x * me.timer.tick * 0.75
                this.vel.y = 0;
                this.setCurrentAnimation('left')
                this.direction = 'left'
                
            }
        } else {
            this.vel.x = 0;
        }
            
        // check & update movement
        updated = this.updateMovement();

        if (updated) {
            // update the object animation
            this.parent();
        }
        return updated;
    }
});



var EnemyEntityV = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.startY = y;
        this.endY = y + settings.height - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.y = y + settings.height - settings.spritewidth;
        this.walkLeft = true;
        // adjust the bounding box
        this.updateColRect(6, 48, 6, 52);

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;
        // disable gravity
        this.gravity = 0;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
        
        this.addAnimation("down", [9,11]);
        this.addAnimation("left", [0,1,2,1]);
        this.addAnimation("up", [3,5]);
        this.addAnimation("right", [6,7,8,7]);
        this.addAnimation("stand", [7]);
        this.setCurrentAnimation('left');
        this.direction = 'left';


    },

    // manage the enemy movement
    update: function() {

        if (this.alive) {
            if (this.pos.y <= this.startY) {
                this.animationspeed = me.sys.fps / 10;
                this.vel.y = this.accel.x * me.timer.tick * 0.75
                this.vel.x = 0;
                this.setCurrentAnimation('down');
                this.direction = 'down';
                
            } else if (this.pos.y >= this.endY) {
                this.animationspeed = me.sys.fps / 10;
                this.vel.y = -this.accel.x * me.timer.tick * 0.75
                this.vel.x = 0;
                this.setCurrentAnimation('up')
                this.direction = 'up'
                
            }

            //console.log(this.walkLeft);
        } else {
            this.vel.y = 0;
        }
        // check & update movement
        updated = this.updateMovement();

        if (updated) {
            // update the object animation
            this.parent();
        }
        return updated;
    }
});

/*-------------- 
 a Level entity
 --------------------- */
var LevelEntity02 = me.LevelEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
    },
    onCollision: function(res, obj) {
        if ((me.gamestat.getItemValue("botones01") == 0) && (!me.gamestat.getItemValue("area01_completed"))){
          me.gamestat.updateValue("area01_completed", true);
          me.state.change(me.state.READY);
          
        }else{
           me.audio.play("error"); 
        }
    }
});

var LevelEntity03 = me.LevelEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
    },
    onCollision: function(res, obj) {
        if ((me.gamestat.getItemValue("botones02") == 0) && (!me.gamestat.getItemValue("area02_completed"))){
          me.gamestat.updateValue("area02_completed", true);
          me.state.change(me.state.READY);

        }else{
           me.audio.play("error"); 
        }
    }
});
    

var LevelEntity04 = me.LevelEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
    },
    onCollision: function(res, obj) {
        if ((me.gamestat.getItemValue("botones03") == 0) && (!me.gamestat.getItemValue("area03_completed"))){
            me.gamestat.updateValue("area03_completed", true);
            me.state.change(me.state.GAMEOVER);
        }else{
           me.audio.play("error"); 
        }
    }
});  

    
/*--------------
 a score HUD Item
 --------------------- */

var ScoreObject = me.HUD_Item.extend({
    init : function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
    },
    /* -----

     draw our score

     ------ */
    draw : function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }

});

/*----------------------

 A title screen

 ----------------------*/


var TitleScreen = me.ScreenObject.extend({
    // constructor
    init : function() {
        this.parent(true);

        // title screen image
        this.title = null;

        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
        
        this.scroller = "BOGART, EL MEJOR JUEGO DEL MUNDO :D       ";
        this.scrollerpos = 600;
                //gamestats
        
    },
    // reset function
    onResetEvent : function() {
        me.game.disableHUD();
        me.audio.playTrack("menu");
        me.gamestat.add("area01_completed", false);
        me.gamestat.add("area02_completed", false);
        me.gamestat.add("area03_completed", false);
        
        
        if(this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("titulo");
            
            // font to display the menu items
            this.font = new me.BitmapFont("32x32_font", 32);
            this.font.set("left");

            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont.set("left");

        }

        // reset to default value
        this.scrollerpos = 640;

        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({
            scrollerpos : -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        // play something
        me.audio.play("cling");

    },
    // some callback for the tween objects
    scrollover : function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos : -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },
    // update function
    update : function() {
        // enter pressed ?
        if(me.input.isKeyPressed('enter')) {
            me.state.change(me.state.READY);
        }
        return true;
    },
    // draw function
    draw : function(context) {
        context.drawImage(this.title, 0, 0);

        this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },
    // destroy function
    onDestroyEvent : function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.audio.stopTrack();
        //just in case
        this.scrollertween.stop();
    },
});



var PlayScreen = me.ScreenObject.extend({

    onResetEvent : function() {
        me.gamestat.add("botones01", 4);
        me.gamestat.add("botones02", 5);
        me.gamestat.add("botones03", 6);
        // play the audio track
        if(me.gamestat.getItemValue("area02_completed")){
                me.audio.playTrack("nivel03");
                me.levelDirector.loadLevel("area03");
            }else if(me.gamestat.getItemValue("area01_completed")){
                me.audio.playTrack("nivel02");
                me.levelDirector.loadLevel("area02");
            }else{
                me.audio.playTrack("nivel01");
                me.levelDirector.loadLevel("area01");
            }
        me.game.sort();
       

    },
    /* ---

     action to perform when game is finished (state change)

     --- */
    onDestroyEvent : function() {
        // remove the HUD
       // me.game.disableHUD();

        // stop the current audio track
        me.audio.stopTrack();
    }
});



var ReadyScreen = me.ScreenObject.extend({
    // constructor
    init : function() {
        this.parent(true);

        // title screen image
        this.title = null;
        
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");

    },
    // reset function
    onResetEvent : function() {
        me.game.disableHUD();
        me.game.addHUD(0, 540, 900, 60);
        // add a new HUD item
        me.game.HUD.addItem("vidas", new ScoreObject(900, 10));
        me.game.HUD.updateItemValue("vidas", 3);
       if(me.gamestat.getItemValue("area02_completed")){
            this.title = me.loader.getImage("loading_nivel03");
        }else if(me.gamestat.getItemValue("area01_completed")){
            this.title = me.loader.getImage("loading_nivel02");
        }else{
            this.title = me.loader.getImage("loading_nivel01");
        }

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        // play something
        me.audio.play("cling");

    },
    // update function
    update : function() {
        // enter pressed ?
        if(me.input.isKeyPressed('enter')) {
                me.state.change(me.state.PLAY);
        }
        return true;
    },
    // draw function
    draw : function(context) {
        context.drawImage(this.title, 0, 0);
        //this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
    },
    // destroy function
    onDestroyEvent : function() {
        me.input.unbindKey(me.input.KEY.ENTER);
    },
});

var GameOverScreen = me.ScreenObject.extend({
    // constructor
    init : function() {
        this.parent(true);

        // title screen image
        this.title = null;
        
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");

    },
    // reset function
    onResetEvent : function() {
        me.game.disableHUD();
        me.audio.playTrack("gameover");
        this.title = me.loader.getImage("game_over");
       
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        // play something
        me.audio.play("cling");

    },
    // update function
    update : function() {
        // enter pressed ?
        if(me.input.isKeyPressed('enter')) {
                me.state.change(me.state.MENU);
        }
        return true;
    },
    // draw function
    draw : function(context) {
        context.drawImage(this.title, 0, 0);
        this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
    },
    // destroy function
    onDestroyEvent : function() {
        me.input.unbindKey(me.input.KEY.ENTER);
    },
});
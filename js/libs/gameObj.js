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
        
        // set the walking speed
        //this.setFriction(0.5, 0.5);
    
        // adjust the bounding box
        this.updateColRect(7, 50, -1, 0);
        
        // disable gravity
        this.gravity = 0;

        //this.firstUpdates = 0;
    
    
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
        if (res.type == me.game.ENEMY_OBJECT) {
                // bounce
                me.audio.play("stomp");
                // let's flicker in case we touched an enemy
                
                if(me.game.HUD.getItemValue("score") > 0){
                    me.game.HUD.updateItemValue("score", -2);
                    this.flicker(45);
                }else{
                    this.flicker(45, function (){me.game.remove(this)});
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

var ButtonEntity = me.ObjectEntity.extend({

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


        this.setCurrentAnimation('down');
         // do something when collide
        me.audio.play("cling");
        var t=setTimeout(function(ButtonEntity){ButtonEntity.setCurrentAnimation('up')},60000,this);

    } 

});
/* --------------------------
an enemy Entity
------------------------ */
var EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        //settings.image = "wheelie_right";
        //settings.spritewidth = 64;

        // call the parent constructor
        this.parent(x, y, settings);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
        // adjust the bounding box
        this.updateColRect(-1, 0, 10, 50);

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;
        // disable gravity
        this.gravity = 0;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {

        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one

    },

    // manage the enemy movement
    update: function() {

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }

            //console.log(this.walkLeft);
            this.doWalk(this.walkLeft);
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

        this.scroller = "A SMALL STEP BY STEP TUTORIAL FOR GAME CREATION WITH MELONJS       ";
        this.scrollerpos = 600;
    },
    // reset function
    onResetEvent : function() {
        if(this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("title_screen");
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
            me.state.change(me.state.PLAY);
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

        //just in case
        this.scrollertween.stop();
    },
});

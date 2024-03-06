/*
Game.js : Casper Shaheen

The Game class is the hub of all the Basic
Platformer game's logic, updates, looping,
and start-stop code. This class serves to 
glue together all the rest of the platformer's
components.
*/

class Game {
    constructor() {
        
        // Create a Canvas object for drawing (wraps HTML5 canvas).
        this.canvas = new Canvas('c');
        this.canvas.setWidth(800);
        this.canvas.setHeight(600);

        // Create an Input object (wraps document event listeners).
        this.input = new Input();

        // Running starts as false before start.
        this.running = false;
        
        // Create a Timer object (wraps document timer).
        this.timer = new Timer();
        
        // Create Handler object to update game objects.
        this.handler = new Handler();

        // Set the initial game state.
        this.init();
    }

    // Helper function to create a map from a string array.
    initMap() {
        let map =  ["                    ",
                    "                    ",
                    "                    ",
                    "                    ",
                    "                    ",
                    "          ###       ",
                    "                    ",
                    "                    ",
                    "                    ",
                    "     ###            ",
                    "                ### ",
                    "                    ",
                    "GGGGGGGGGGGGGGGGGGGG",
                    "DDDDDDDDDDDDDDDDDDDD",
                    "DDDDDDDDDDDDDDDDDDDD"];
        // Iterate over the array and add objects to the game
        for(let x = 0; x < map[0].length; ++x) {
            for(let y = 0; y < map.length; ++y) {
                let color = '';
                // The character determines the color of the block
                switch(map[y][x]) {
                    case '#':
                        this.handler.addObject(
                            new Block(x * 40, y * 40, 40, 40, 'grey', this)
                        );
                        break;
                    case 'D':
                        this.handler.addObject(
                            new Block(x * 40, y * 40, 40, 40, '#805e4f', this)
                        );
                        break;
                    case 'G':
                        this.handler.addObject(
                            new Block(x * 40, y * 40, 40, 40, '#71c788', this)
                        );
                        break;
                    default:
                }
            }
        }
    }
    

    /* 
    -- init() ---
    parameters: none
    returns: void
    -------------
    Description: The initializer method for the Game
    class. Adds objects to the Game's handler field and 
    initializes the Game's map.
    */
    init() {
        // Add a bunch of floaters.
        for(let i = 0; i < 30; ++i) {
            this.handler.addObject(new Floater(
                Math.random() * this.canvas.getWidth(),
                Math.random() * this.canvas.getHeight(),
                Math.random() * 100 * Math.cos(Math.random() * 2 * Math.PI),
                Math.random() * 100 * Math.sin(Math.random() * 2 * Math.PI),
                3, 3,
                '#ffed87', this
            ));
        }
        // Add a Player object to the Handler
        this.handler.addObject(new Player(250, 250, this));
        // Initialize the Game's map
        this.initMap();
    }

    start() {   
        // Set running
        this.running = true;
        // Bind the method to this object, for some reason...
        this.run = this.run.bind(this);
        // Start the loop by requesting an animation frame
        window.requestAnimationFrame(this.run);
    }

    stop() {
        this.running = false;
    }

    run() {
        let delta = (this.timer.getCurrentTime() - this.timer.getLastTime()) / 1000;
        this.timer.grab();
        this.update(delta);
        this.render();
        if(this.running) window.requestAnimationFrame(this.run);
    }

    update(delta) {
        // Update the game object
        this.handler.physicsUpdate(delta);
        this.handler.update(delta);
    }

    render() {
        // Clear the screen
        this.canvas.setFillColor('#83c8fc');
        this.canvas.clear();

        // Draw the game object
        this.handler.render(this.canvas);
    }
}
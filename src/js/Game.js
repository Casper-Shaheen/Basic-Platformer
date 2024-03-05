class Game {
    constructor() {
        
        // Game graphics canvas
        this.canvas = new Canvas('c');
        this.canvas.setWidth(800);
        this.canvas.setHeight(600);

        // Setup Input
        this.input = new Input();

        // Running state
        this.running = false;
        
        // Game timer
        this.timer = new Timer();
        
        // Game object handler
        this.handler = new Handler();

        // Set initial game state
        this.init();
    }

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
        for(let x = 0; x < map[0].length; ++x) {
            for(let y = 0; y < map.length; ++y) {
                let color = '';
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
    

    init() {
        // for(let i = 0; i < 100; ++i) {
        //     this.handler.addObject(new Floater((Math.random() * (this.canvas.getWidth() - 10)), (Math.random() * (this.canvas.getHeight() - 10)), Math.random() * 150 * Math.cos(Math.random() * 2 * Math.PI), Math.random() * 150 * Math.sin(2 * Math.random() * Math.PI), 5, 5, 'salmon', this));
        // }
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
        this.handler.addObject(new Player(250, 250, this));
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
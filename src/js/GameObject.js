/*
GameObject.js : Casper Shaheen

The GameObject class is the base object of all things
in the Game class. Every entity, including players, enemies,
blocks, weapons, ammo, pickups, drops, healthbars, ui, etc,
extends the GameObject class.

All this class contains is the bare-bones of what every 
object no matter its purpose requires, an id, and a list of
tags which identify its features. 
*/

class GameObject {
    constructor() {
        this.tags = [];
        this.id = crypto.randomUUID();
    }
}
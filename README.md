# Basic-Platformer
A Basic platform game written with HTML CSS and Javascript.

# GameObject Inheritance Tree
GameObject
    |
    |------>
    |
    v
    Hittable
    |
    |
    |
    v
    Physical
    |
    |------> Player
    |
    |
    |------> Ammo
    |
    |
    |------> Enemy ---------------.
    |        |                    |
    v        v                    v
             Specific Enemy       Other enemy

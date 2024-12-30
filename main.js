kaboom({
    font: "sink",
    background: [0, 0, 220, 1],
});

loadSprite("player", "Sprites/player.png");
loadSprite("ghost", "Sprites/ghost.png");
loadSprite("proof", "Sprites/proof.jpg");
loadSound("gameover", "Sounds/gameover.mp3");
loadSound("points", "Sounds/ting.mp3");

debug.log("Welcome! Use left and right arrow keys to move the player and avoid the ghosts. Collect 10 proofs of the ghost to win the game!")

const speed = 300;
const proofSpeed = 190;
const ghostSpeed = 200;
let score = 0;

const player = add([
    sprite("player"),
    pos(480, 480),
    area(),
    scale(0.3),
]);


onKeyDown("left", () => {
    player.move(-speed, 0);
});

onKeyDown("right", () => {
    player.move(+speed, 0);
});

setInterval(() => {
    for (let i = 0; i < 2; i++) {
        let a = add([
            sprite("ghost"),
            pos(rand(0, width()), 0),
            scale(0.1),
            area(),
            "ghost",
        ]);
    a.onUpdate(() => {
        a.move(0, proofSpeed);
        if (a.pos.y >= height()) {
            destroy(a);
        }
    });
    }
}, 2000);

setInterval(() => {
    let b = add([
        sprite("proof"),
        pos(rand(0, width()), 0),
        scale(0.3),
        area(),
        "proof",
    ]);
    b.onUpdate(() => {
        b.move(0, proofSpeed);
        if (b.pos.y >= height()) {
            destroy(b);
        }
    });
}, 6000);


player.onCollide("ghost", (a) => {
    destroy(a);
    debug.log("Game Over, refresh to play again!");
    play("gameover");
    destroy(player);
});

player.onCollide("proof", (b) => {
    destroy(b);
    score += 1;
    play("points");
    debug.log("Score: " + score);
});

player.onUpdate(() => {
    if (score === 10) {
        debug.log("Congratulations you win! Refresh to play again!");
        destroy(player);
    }
});
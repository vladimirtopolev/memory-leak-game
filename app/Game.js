import { Ship } from './Ship.js';
import { Asteroid } from './Asteroid.js';
import { random } from "./helper.js";

export class Game {
    constructor(app) {
        this.app = app;
        this.container = app.gameDiv;
        this.asteroids = [];
        this.bullets = [];
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth / 2;
        this.canvas.height = window.innerHeight / 2;
        this.canvas.style.backgroundColor = '#000000';
        this.container.appendChild(this.canvas);
    }

    createShip() {
        this.ship = new Ship(this);
        this.ship.render();
    }

    createAsteroids() {
        for (let i = 0; i <= 20; i++) {
            const asteroid = new Asteroid(
                random(0, this.canvas.width),
                random(0, this.canvas.height),
                random(0, 360),
                random(10, 50),
                this.canvas
            );
            asteroid.render();
            this.asteroids.push(asteroid);
        }
    }

    findAsteroid(x, y) {
        return this.asteroids.find(asteroid =>
            Math.pow(asteroid.x - x, 2) + Math.pow(asteroid.y - y, 2) < Math.pow(asteroid.radius, 2));
    }

    breakAsteroid(oldAsteroid) {
        this.asteroids.splice(this.asteroids.indexOf(oldAsteroid), 1);
        if (oldAsteroid.radius > 10) {
            for (let i = 0; i <= 1; i++) {
                const asteroid = new Asteroid(
                    oldAsteroid.x,
                    oldAsteroid.y,
                    random(0, 360),
                    oldAsteroid.radius/2,
                    this.canvas
                );
                this.asteroids.push(asteroid);
            }
        }
    }

    frame(dt) {
        const ctx = this.canvas.getContext('2d');

        ctx.clearRect(0, 0, this.width, this.height);
        this.ship.render();

        this.bullets.forEach((bullet, idx) => {
            const asteroid = this.findAsteroid(bullet.x, bullet.y);
            if (asteroid) {
                this.breakAsteroid(asteroid);
                this.bullets.splice(idx, 1);
            } else {
                bullet.render();
            }
        });

        this.asteroids.forEach(asteroid => {
            asteroid.render();
        });

        if (this.findAsteroid(this.ship.x, this.ship.y)) {
            this.stop();
        }
    }

    start() {
        this.createCanvas();
        this.createShip();
        this.createAsteroids();

        this.ship.render(this.canvas);

        let tick = () => {
            this.animationFrameRequest = requestAnimationFrame(tick);
            this.frame();
        };
        tick();
    }

    stop() {
        cancelAnimationFrame(this.animationFrameRequest);
        this.app.show();
    }
}
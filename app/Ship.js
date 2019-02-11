import {Bullet} from './Bullet.js';
import {inRad} from "./helper.js";

export class Ship {
    constructor(game){
        this.deltaSpin = 40;

        this.canvas = game.canvas;
        this.bullets = game.bullets;

        this.spin = 0;

        this.maxHeight = 30;
        this.maxWidth = 15;

        this.x = this.canvas.width/2;
        this.y = this.canvas.height/2;

        this.game = game;

        window.addEventListener('keydown', (e)=> {
            switch(e.which){
                // right arrow
                case 39: {
                    this.spin+=this.deltaSpin;
                    break;
                }
                // left arrow
                case 37: {
                    this.spin-=this.deltaSpin;
                    break;
                }
                // space
                case 32: {
                    this.strike();
                }
            }
        })
    }

    strike(){
        const angle = this.spin;
        const x = this.canvas.width/2;
        const y = this.canvas.height/2;

        const x0 = x + Math.sin(inRad(this.spin));
        const y0 = y - Math.cos(inRad(this.spin));
        this.bullets.push(new Bullet(x0, y0, this.spin, this.canvas))
    }


    render() {
        this.renderShip();

    }

    renderShip(){
        const shipW = this.maxWidth;
        const shipH = this.maxHeight;

        const x0 = 0;
        const y0 = 0;

        const ctx = this.canvas.getContext('2d');
        ctx.translate(this.canvas.width/2, this.canvas.height/2);
        ctx.rotate(inRad(this.spin));

        ctx.beginPath();
        ctx.moveTo(x0, y0 + shipH/2);
        ctx.lineTo(x0 - shipW/2, y0 - shipH/2);
        ctx.lineTo(x0 + shipW/2, y0 -shipH/2 );
        ctx.lineTo(x0, y0 + shipH/2);
        ctx.fillStyle ="#0000ff";
        ctx.fill();

        ctx.rotate(inRad(-this.spin));
        ctx.translate(-this.canvas.width/2, -this.canvas.height/2);
    }
}
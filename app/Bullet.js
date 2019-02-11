import {inRad} from "./helper.js";

export class Bullet {
    constructor(initX, initY, angle, canvas) {
        this.hash = Array(100000).join('*');

        this.distance = 3;
        this.radius = 2.5;

        this.x = initX;
        this.y = initY;
        this.angle = angle + 90;
        this.canvas = canvas;


    }

    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle ="#ff0000";
        ctx.fill();


        this.x+=this.distance*Math.cos(inRad(this.angle));
        this.y+=this.distance*Math.sin(inRad(this.angle));
    }


}
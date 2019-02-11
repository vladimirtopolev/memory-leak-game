import { inRad } from "./helper.js";

export class Asteroid {
    constructor(x,y, angle, radius, canvas){
        this.distance = 1;
        this.canvas = canvas;

        this.x = x;
        this.y = y;
        this.angle = angle;
        this.radius = radius;
    }

    render(){
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle ="#ffffff";
        ctx.fill();


        this.x+=this.distance*Math.cos(inRad(this.angle));
        this.y+=this.distance*Math.sin(inRad(this.angle));

        if (this.x + this.radius < 0) {
            this.x = this.canvas.width - this.radius
        }
        if (this.x - this.radius > this.canvas.width) {
            this.x = - this.radius;
        }

        if (this.y + this.radius < 0) {
            this.y = this.canvas.height + this.radius;
        }

        if (this.y - this.radius > this.canvas.height) {
            this.y = - this.radius;
        }
    }
}
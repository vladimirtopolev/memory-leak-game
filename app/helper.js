function inRad(degree) {
    return degree * Math.PI / 180;
}

function random(min, max){
    return Math.random() * (max - min) + min;
}

export {
    inRad,
    random
}
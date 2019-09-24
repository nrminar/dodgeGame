const layer = [];
const lines = [];
let play;
let hit = false;
let closestGroup = [];
let timeCount = -15;
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var keyCode = evt.keyCode;
    if (keyCode >= 37 && keyCode <= 40) {
        return false;
    }
}
function addLayer(x = 800, y = 100){
    console.log('hi from addLayer')
    layer.push(new comet(random(0, x), random(0, y)));
    timeCount++;
}
function compare(a, b){
    let difference = a.distance - b.distance;
    console.log('in compare:', difference);
    return difference;
}
function findMin(comet){
    // let tempArr = layer.sort(compare)
    if(lines.length < 8)
    {
    lines.push(comet);
    return;
    }
//     for(let i = 0; i< lines.length; i++){
        
//         if(lines[i].distance > comet.distance){
//             lines.splice(i, 1);
//             lines.push(comet);

//            // lines.push(new closeLine(comet.pos.x, comet.pos.y));           
//         }
//     }
}
function setup() {
   createCanvas(800, 600);
   stroke(0);
   noFill();
   background(400, 600, 0);
   for(let i=0; i<15; i++){
        addLayer(800,300);
   }
   play = new player(0,0);
   setInterval(addLayer,1000);
}
function draw() {
    background(400, 600, 0);
    play.show();
    play.update();
    for(let comet of layer) {
        comet.collide(play);
        comet.show();
        comet.update();
        // findMin(comet);
        // stroke(0);
        // fill(0);
        // line(play.pos.x, play.pos.y, comet.pos.x, comet.pos.y);
    }
    for(let line of lines){
        
    }
    text(layer.length, 50, 50)
 }
class comet{
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 30;
        this.distance = 0;
    }
    show(){
       stroke(0);
       fill(255);
       circle(this.pos.x, this.pos.y, this.r);
   }
   update(){
       if(this.pos.y > 800){
        this.pos.y = 0;
        this.pos.x = random(0,800);
       }
       if(layer.length <= 25){
        this.pos.y += 3;
       }else if(25 < layer.length){
        this.pos.y += 5;
       }
       this.distance = dist(play.pos.x, play.pos.y, this.pos.x, this.pos.y);
    }
   collide(obj){
    if(collideCircleCircle(this.pos.x, this.pos.y, this.r, obj.pos.x, obj.pos.y, 40)){
        if(window.confirm(`You lost with a score of: ${timeCount} Would you like to play again?`)){
            location.reload();
        }else{
            console.log('no new game')
        }
        noLoop();
    }
   }
}
class player{
    constructor(x,y){
        this.pos = createVector(x + 400, y + 400);
    }
    show(){
        stroke(0);
        fill(0);
        circle(this.pos.x,this.pos.y, 40);
    }
    update(){
        if (keyIsDown(LEFT_ARROW)) {
            play.pos.x -= 5;
        }
        if(keyIsDown(RIGHT_ARROW)){
            play.pos.x += 5;
        }
        if (keyIsDown(UP_ARROW)) {
            play.pos.y -= 5;
        }
        if(keyIsDown(DOWN_ARROW)){
            play.pos.y += 5;
        }
        // for(let i=0; i<layer.length; i++){
        //     findMin(layer[i]);
        // }
        layer.sort(compare);
    }
}
class closeLine{
    constructor(x, y){
        this.pos = createVector(x, y)
        this.distance = dist(play.pos.x, play.pos.y, this.pos.x, this.pos.y);
    }
    show(){
        stroke(0);
        fill(0);
        line(play.pos.x, play.pos.y, this.pos.x, this.pos.y);
    }
    update(index){
        let close = closestGroup[index];
        this.pos.x = close.pos.x;
        this.pos.y = close.pos.y;
    }
}





// function findMax(){
//     for(let i = 0; i<layer.length; i++){
//         if(closestGroup.length < 8){
//             closestGroup.push(layer[i]);
//             console.log('The closest ones:', closestGroup);
//         }
//         for(let j = 0; j<closestGroup.length; j++){
//             if(closestGroup[j].distance > layer[i].distance){
//                 closestGroup.splice(j, 1, layer[i]);
//                 console.log('changed one:', closestGroup);
//             }else{
//                 console.log('didnt make it')
//             }
//         }
//     }
// }


// function minner(array){
//     console.log('in minner');
//     let min = array[0];
//     for(let i=1; i<layer.length; i++){
//         if(array[i].distance < min.distance){
//             min = array[i];
//         }
//     }
//     console.log(min.distance)
//     return min;
// }
// function nearest(){
//     let tempArr = layer;
//     console.log('in nearest', minner(tempArr).distance);
//     for(let i=0; i<tempArr.length; i++){
//         console.log(closestGroup);
//         if(closestGroup.length<8 && (tempArr[i].distance === minner(tempArr).distance)){
//             closestGroup.push(tempArr[i]);
//             tempArr.splice(i,1);
//         }
//     }
// }
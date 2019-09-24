const package = [];
let leftWalk;
function setup() {
   createCanvas(800, 600);
   background(255);
   stroke(0);
   noFill();
   leftWalk = new crossWalk(300, 200, 300, 500);
   //var mx = map(mouseX, 0, width, 2, 10);
   for(let x =100; x < 600; x+=50)
   {
       package.push(new car(100, x, 40))
   }
}
function draw() {
   background(255);
   leftWalk.show()
   for (let p of package) {
           p.show();
           p.update();
   }
}
class crossWalk{
   constructor(x, y, x1, y2) {
       this.pos1 = createVector(x, y);
       this.pos2 = createVector(x1, y2);
   }
   show()
   {
       stroke(0);
       noFill();
       line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
     //  line(200, 300, 200, 400);
   }
}
class car {
   constructor(x, y, r) {
       this.pos = createVector(x, y);
       this.r = r;
   }
   show()
   {
      // strokeWeight(3);
       stroke(0);
       fill(255);
       ellipse(this.pos.x, this.pos.y, this.r);
   }
   update() {
       if (!collideLineCircle(leftWalk.pos1.x, leftWalk.pos1.y, leftWalk.pos2.x, leftWalk.pos2.y, this.pos.x, this.pos.y, this.r)) {
       this.pos.y += 5 ;
       }
   }
}

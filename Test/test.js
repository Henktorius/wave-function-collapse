let size = 10;
let thickness = 3;
function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  background(255);
  strokeWeight(thickness);
  for(let y = 0; y < size; y++)
  {
    for(let x = 0; x < size; x++)
    {
      rect((width/size)*x, (height/size)*y, width/size, height/size);
      //rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size, thickness); // Shape 2

      //rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size); // Shape 3

      //rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 4
      //rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, thickness, height/size/2+thickness);

      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 5
      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size/2+thickness);

      // rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 6
      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size/2+thickness);

      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 7
      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, thickness, height/size/2+thickness);

      // rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size, thickness); // Shape 8
      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size/2+thickness);

      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 9
      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size);

      // rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size, thickness); // Shape 10
      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, thickness, height/size/2+thickness);

      // rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 11
      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size);

      // rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size, thickness); // Shape 12
      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size);

      // rect((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 13
      // fill(0);
      // circle((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2, thickness*4);
      // noFill();

      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, thickness, height/size/2+thickness); // Shape 14
      // fill(0);
      // circle((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2, thickness*4);
      // noFill();

      // rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 15
      // fill(0);
      // circle((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2, thickness*4);
      // noFill();

      // rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size/2+thickness); // Shape 16
      // fill(0);
      // circle((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2, thickness*4);
      // noFill();
    }
  }
}

function draw() {

}

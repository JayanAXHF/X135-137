function start() {
  objectDetector = ml5.objectDetector("cocossd", GotSomeUseNow);
}

video = "";
let status = "";
let objects = [];

function preload() {
  video = createVideo("video.mp4");
  video.hide();
}

function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
}

function draw() {
  image(video, 0, 0, 480, 380);

  if (status != "") {
    objectDetector.detect(video, Results);
    document.getElementById("objStatus").innerHTML = "Status : detecting ";
    document.getElementById("objNumber").innerHTML =
      "Number of objects :  " + objects.length;

    for (let index = 0; index < objects.length; index++) {
      fill("#008080");
      let percentage = floor(objects[index].confidence * 100);
      text(
        objects[index].label + percentage + " %",
        objects[index].x + 15,
        objects[index].y + 15
      );
      noFill();
      stroke("#008080");
      rect(
        objects[index].x,
        objects[index].y,
        objects[index].width,
        objects[index].height
      );
    }
  }
}

function GotSomeUseNow() {
  console.log("Got some use now");
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function Results(error, results) {
  if (error) {
  }
  console.log(results);
  objects = results;
}

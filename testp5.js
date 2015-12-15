/**
 * Created by zhaonan on 15/12/4.
 */
var h;
var t;
var img;
var myFont;
var data;
var isDone = false;
var url;
var secondTimer;

var t_bg;
var flag_bg = false;
var c_bg;
var c_b;
var c_a;

function preload() {

    frameRate(30);


    img = loadImage("img/rain.png");
    myFont = loadFont('assert/Montserrat-Hairline.otf');

    url = "http://10.208.7.10/arduino/analog/2";
    data = loadJSON(url, dataDone, dataError, "jsonp");

    t_bg=0;
}

function updateData() {
    //noLoop();
    data = loadJSON(url, dataDone, dataError, "jsonp");
    //loop();
}

function dataDone() {
    console.log("dataDone ", data);
    data = data.join("");
    data = JSON.parse(data);
    console.log("dataDone ", data);
    isDone = true;

}

function dataError() {

}

function setup() {
    createCanvas(1280, 730);
    background(218, 238, 233);

}

function draw() {
    background(218, 238, 233);

    lerpChange();

    secondTimer = second();

    //ellipse(innerWidth/2,innerHeight/2, 80, 80);


    if (isDone &&
        data.pin2.humidity != null &&
        data.pin2.temperature != null) {

        h = data.pin2.humidity;
        t = data.pin2.temperature;
        console.log(h,t);

    }

    var humidity_scale = map(h, 30, 80, 0.9, 1.5);
    var h_gradient = h;


    push();
    translate(width/2, height/2+1);
    imageMode(CENTER);
    scale(humidity_scale);
    image(img, 0, 0, 374, 553);
    //image(img, width/2, height/2, 374, 553);
    pop();

    fill(255);
    textFont(myFont,36);
    textAlign(CENTER, CENTER);
    text("Humidity:"+h+"%", width/2, height/2+64);

    textAlign(CENTER, CENTER);
    text("Tempreture:"+t+"°C", width/2, height/2+109);

    //text(secondTimer,width/2,height/2+150);


    if (frameCount % 150 == 0) {
        isDone = false;
        updateData();

    }

    //if (secondTimer % 2 == 0) {
    //    isDone = false;
    //    console.log("one round");
    //    updateData();
    //}

    time();

}

function lerpChange(){

    c_a = color(255,255,255);
    //c_a = color(236, 248, 247);
    c_b = color(218, 238, 233);

    if (t_bg > 1 || t_bg < 0) {
        flag_bg = !flag_bg;
    }
    c_bg = lerpColor(c_a, c_b, t_bg);
    noStroke();
    fill(c_bg);
    rect(0,0,width,height);
    if (flag_bg == false) {
        t_bg += 0.01;
    }else{
        t_bg -= 0.01;
    }

}

function time(){
    var positionX = 33*1.5;
    var positionY = 45*1.5;

    textAlign(LEFT, CENTER);
    textSize(100);
    var h = hour();
    var min = minute();
    var s = second();
    var d = day();
    var mon = month();
    fill(123,190,173);
    //textFont();

    var t = nf(h, 2) + " " + nf(min, 2) + " " + nf(s, 2);     //the time
    text(t,positionX, positionY+80);

    var weeknumber = d % 7;
    if (weeknumber == 0){
        dayofweek ="Monday";// "Friday";
    } else if (weeknumber == 1){
        dayofweek = "Tuesday";//"Saturday";
    } else if (weeknumber == 2){
        dayofweek = "Wednesday";//"Sunday";
    } else if (weeknumber == 3){
        dayofweek = "Thursday";//"Monday";
    } else if (weeknumber == 4){
        dayofweek = "Friday";//"Tuesday";
    } else if (weeknumber == 5){
        dayofweek = "Saturday";//"Wednesday";
    } else if (weeknumber == 6){
        dayofweek = "Sunday";//"Thursday";
    }
    textSize(40);
    text(dayofweek + ", "+ nf(mon,2) + " "+nf(d,2), positionX, positionY);//text(""+weather.getLastUpdated(), wx, wy-230);
}
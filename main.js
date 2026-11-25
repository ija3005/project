//Time loop -- Iman Atiq -- 33904090//

/*References:
Magnific. “Self Reflection Icon.” Available at: 
https://www.magnific.com/icon/self-reflection_5576211

ClipArtMax. “No Cell Phone Icon.” Available at: 
https://www.clipartmax.com/download/m2i8b1i8i8Z5d3m2_no-cell-phone-icon-download-mobile-phone/#

toppng. “Instagram Like Icon.” Available at:
https://toppng.com/show_download/163294/instagram-like-png-like-instagram

VHV.RS. “Praying Hands Emoji.” Available at:
https://www.vhv.rs/viewpic/hoTJiJw_praying-hands-emoji-png-transparent-png/

Icons8. “Earth with Moon Icons.” Available at:
https://icons8.com/icons/set/earth-with-moon 

ClipArtMax. "Rest Icon". Available at:
https://www.clipartmax.com/download/m2H7H7N4d3G6H7b1_rest-icon-png/#
*/






let particles = []; //stores all the particles in an array.
let ambientParticles = []; //stores background particles that move slowly.
let timelineActions = [];//will store each action chosen by user.

let stateMessage = "Choose an action to begin shaping the loop.";

//values for the timeline//
let anxiety = 0;
let validation = 0;
let awareness = 0;
let stress = 0;
let calm = 0;

let loopSpeed = 0.01; //controls speed of the loop
let loopSize = 1;
let chaosAmount = 0; //to control how unstable the movement becomes.

//links to the anxiety number, validation and awareness number in the html file.
let anxietyValue;
let validationValue;
let awarenessValue;

let anxietyBar;
let validationBar;
let awarenessBar;
let stressBar;
let calmBar
let stressValue;
let calmValue;


let phoneIcon;
let likeIcon;
let prayIcon;
let restIcon;
let reflectIcon;



function preload() {
    phoneIcon = loadImage("images/phone.png");
    likeIcon = loadImage("images/like.png");
    prayIcon = loadImage("images/pray.png");
    restIcon = loadImage("images/moon.png");
    reflectIcon = loadImage("images/reflection.png");
}



function setup() {
    let canvas = createCanvas(1100, 580);
    canvas.parent("canvas-container");

    angleMode(RADIANS);
    imageMode(CENTER);

    //Creates floating background particles
    for (let i = 0; i < 80; i++) {
        ambientParticles.push(new AmbientParticle());
    }

    //Connects the text and bars from the HTML to JavaScript
    anxietyValue = document.getElementById("anxietyValue");
    validationValue = document.getElementById("validationValue");
    awarenessValue = document.getElementById("awarenessValue");
    stressValue = document.getElementById("stressValue");
    calmValue = document.getElementById("calmValue");

    
    stressState = document.getElementById("stressState");
    calmState = document.getElementById("calmState");

    stressBar = document.getElementById("stressBar");
    calmBar = document.getElementById("calmBar");
    anxietyBar = document.getElementById("anxietyBar");
    validationBar = document.getElementById("validationBar");
    awarenessBar = document.getElementById("awarenessBar");

    //Connects each button to its action
    document.getElementById("scrollBtn").addEventListener("click", function () {
        addAction("scroll");
    });

    document.getElementById("postBtn").addEventListener("click", function () {
        addAction("post");
    });

    document.getElementById("prayBtn").addEventListener("click", function () {
        addAction("pray");
    });

    document.getElementById("reflectBtn").addEventListener("click", function () {
        addAction("reflect");
    });

    document.getElementById("restBtn").addEventListener("click", function () {
        addAction("rest");
    });

    document.getElementById("resetBtn").addEventListener("click", function () {
        resetProject();
    });
}






function draw() {
    background(3, 6, 18, 35);

    drawAmbientParticles();

    translate(width / 2, height / 2 - 50);

    drawGlowBackground();
    drawInfinityLoop();
    drawLoopLabels();
    drawCentrePulse();

    //This updates and draws all the particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].move();
        particles[i].draw();

        if (particles[i].life <= 10) {
            particles.splice(i, 1);
        }
    }

    drawTimeline();

    updateValues();
}


//Will add a new action into the system
function addAction(type) {
    timelineActions.push(type);

    if (type === "scroll") {
        anxiety += 7;
        validation += 3;
        awareness += 1;
        stress += 5;
        calm -= 2;

        loopSpeed += 0.002;
        chaosAmount += 1.5;

        stateMessage = "Scrolling increases stimulation, attention and visual speed.";

        addParticles(24, color(60, 140, 255), type);
    }

    if (type === "post") {
        validation += 9;
        anxiety += 4;
        awareness += 1;
        stress += 4;
        calm -= 1;

        chaosAmount += 1.2;

        stateMessage = "Posting creates expression, visibility and pressure.";

        addParticles(30, color(170, 90, 255), type);
    }

    if (type === "pray") {
        awareness += 9;
        anxiety -= 3;
        validation += 1;
        calm += 7;
        stress += 1;

        loopSpeed -= 0.001;
        chaosAmount -= 0.8;

        stateMessage = "Prayer shifts attention inward, but repetition still shapes the loop.";

        addParticles(32, color(255, 180, 45), type);
    }

    if (type === "reflect") {
        awareness += 8;
        anxiety += 2;
        validation -= 1;
        calm += 5;
        stress += 2;

        loopSize += 0.018;
        chaosAmount -= 0.4;

        stateMessage = "Reflection creates awareness, but can also bring tension.";

        addParticles(30, color(255, 210, 90), type);
    }

    if (type === "rest") {
        anxiety -= 5;
        validation -= 2;
        awareness += 4;
        calm += 8;
        stress -= 4;

        loopSpeed -= 0.0015;
        chaosAmount -= 1.2;

        stateMessage = "Rest slows the system and creates space between actions.";

        addParticles(22, color(190, 170, 255), type);
    }

    //Keeps values between 0 and 100
    anxiety = constrain(anxiety, 0, 100);
    validation = constrain(validation, 0, 100);
    awareness = constrain(awareness, 0, 100);
    stress = constrain(stress, 0, 100);
    calm = constrain(calm, 0, 100);

    loopSpeed = constrain(loopSpeed, 0.004, 0.035);
    chaosAmount = constrain(chaosAmount, 0, 20);
    loopSize = constrain(loopSize, 0.8, 1.3);
}



//This is to create the particles when the actions are clicked
function addParticles(amount, col, type) {
    for (let i = 0; i < amount; i++) {
        particles.push(new RitualParticle(col, type));
    }
}



//This draws the infinity loop in the main area
function drawInfinityLoop() {
    noFill();

    let blueStrength = map(anxiety + validation, 0, 200, 70, 230);
    let orangeStrength = map(awareness, 0, 100, 60, 240);

    let rightStretch = map(anxiety, 0, 100, 1, 1.18);
    let leftStretch = map(awareness, 0, 100, 1, 1.18);

    //Draws the blue digital side
    for (let j = 0; j < 9; j++) {
        beginShape();

        stroke(80, 150, 255, blueStrength - j * 13);
        strokeWeight(1.8);

        for (let t = 0; t < TWO_PI; t += 0.02) {
            let x = sin(t) * 390 * loopSize;
            let y = sin(t) * cos(t) * 230 * loopSize;

            if (x > 0) {
                x = x * rightStretch;
            }

            if (x < 0) {
                x = x * leftStretch;
            }

            let movement = frameCount * loopSpeed;
            let shake = sin(t * 8 + frameCount * 0.04 + j) * chaosAmount;

            x += sin(t + movement * 40 + j) * 14;
            y += cos(t * 2 + movement * 40 + j) * 14;

            y += shake;

            vertex(x, y);
        }

        endShape();
    }

    //This draws a warmer second loop to show the awareness
    stroke(255, 180, 45, orangeStrength);
    strokeWeight(2.5);

    beginShape();

    for (let t = 0; t < TWO_PI; t += 0.025) {
        let x = sin(t) * 370 * loopSize;
        let y = sin(t) * cos(t) * 215 * loopSize;

        if (x < 0) {
            x = x * leftStretch;
        }

        x += sin(t + frameCount * 0.015) * awareness * 0.12;
        y += cos(t * 2 + frameCount * 0.015) * awareness * 0.08;

        vertex(x, y);
    }

    endShape();
}


//adds soft light behind the loop
function drawGlowBackground() {
    noStroke();

    fill(255, 180, 45, 30 + awareness * 0.3);
    ellipse(-295, 0, 390 + awareness, 290 + awareness * 0.5);

    fill(60, 130, 255, 32 + anxiety * 0.25);
    ellipse(295, 0, 410 + anxiety, 300 + anxiety * 0.5);

    fill(160, 90, 255, 22 + validation * 0.18);
    ellipse(0, 0, 350 + validation * 0.4, 240 + validation * 0.25);
}








//Draws labels around the loop to make the meaning clearer.
function drawLoopLabels() {
    noStroke();
    textAlign(CENTER);

    fill(255, 190, 70, 220);
    textSize(14);
    text("AWARENESS", -330, -210);

    fill(90, 160, 255, 220);
    text("ANXIETY", 330, -210);

    fill(185, 130, 255, 220);
    text("VALIDATION", 0, 175);

    fill(230, 230, 255, 150);
    textSize(11);
    text("Cause & Effect", 0, -175);
}


//Draws the pulsing centre point where both sides cross.
function drawCentrePulse() {
    let pulseSize = 20 + sin(frameCount * 0.08) * 8;

    let intensity = anxiety + validation + awareness;

    noStroke();

    fill(255, 255, 255, 45 + intensity * 0.25);
    ellipse(0, 0, pulseSize * 2.6);

    fill(180, 120, 255, 80 + validation);
    ellipse(0, 0, pulseSize);

    fill(255, 220, 160, 100);
    ellipse(0, 0, pulseSize * 0.4);
}


//Draws the timeline at the bottom of the canvas
function drawTimeline() {
    push();

    translate(-width / 2, height / 2 - 120);

    //This will draw out the digital path
    stroke(80, 150, 255, 140);
    strokeWeight(2);

    line(80, 0, width - 80, 0);

    //spiritual path
    stroke(255, 180, 45, 140);

    line(80, 70, width - 80, 70);

    noStroke();

    fill(120, 170, 255);
    textSize(14);

    text("Digital / reactive", 80, -25);

    fill(255, 190, 70);
    text("Spiritual / reflective", 80, 105);


    for (let i = 0; i < timelineActions.length; i++) {
        let x = map(i, 0, max(timelineActions.length - 1, 1), 120, width - 120);
        

        let action = timelineActions[i];

        if (action === "scroll" || action === "post") {
            fill(80, 150, 255);

            ellipse(x, 0, 34, 34);

            drawActionIcon(action, x, 0, 24);

            stroke(80, 150, 255, 70);
            line(x, -30, x, 30);
        }

        if (action === "pray" || action === "reflect" || action === "rest") {
            fill(255, 180, 45);

            ellipse(x, 70, 34, 34);

            drawActionIcon(action, x, 70, 24);

            stroke(255, 180, 45, 70);
            line(x, 40, x, 100);
        }
    }

    noStroke();

    fill(210, 210, 235, 180);

    textAlign(CENTER);
    textSize(15);

    text(stateMessage, width / 2, 135);

    pop();
}


//Draws the image icon for each action.
function drawActionIcon(action, x, y, size) {

    if (action === "scroll") {
        image(phoneIcon, x, y, size, size);
    }

    if (action === "post") {
        image(likeIcon, x, y, size, size);
    }

    if (action === "pray") {
        image(prayIcon, x, y, size, size);
    }

    if (action === "reflect") {
        image(reflectIcon, x, y, size, size);
    }

    if (action === "rest") {
        image(restIcon, x, y, size, size);
    }
}


//Draws slow background particles so the canvas feel interactive.
function drawAmbientParticles() {
    for (let i = 0; i < ambientParticles.length; i++) {
        ambientParticles[i].move();
        ambientParticles[i].draw();
    }
}


//Updates the numbers and bars in the HTML
function updateValues() {
    anxietyValue.textContent = anxiety;
    validationValue.textContent = validation;

    if (awarenessValue) {
        awarenessValue.textContent = awareness;
        awarenessBar.style.width = awareness + "%";
    }

    if (stressValue) {
        stressValue.textContent = stress;
        stressBar.style.width = stress + "%";
    }

    if (calmValue) {
        calmValue.textContent = calm;
        calmBar.style.width = calm + "%";
    }

    anxietyBar.style.width = anxiety + "%";
    validationBar.style.width = validation + "%";

    if (stressState && anxiety > 35) {
        stressState.classList.add("show");
    }

    if (calmState && awareness > 25) {
        calmState.classList.add("show");
    }
}


//sets the reset button to clear the whole process and start again.
function resetProject() {
    particles = [];
    timelineActions = [];

    anxiety = 0;
    validation = 0;
    awareness = 0;
    stress = 0;
    calm = 0;

    loopSpeed = 0.01;
    loopSize = 1;
    chaosAmount = 0;

    stateMessage = "Choose an action to begin shaping the loop.";

    if (stressState) {
        stressState.classList.remove("show");
    }

    if (calmState) {
        calmState.classList.remove("show");
    }
}


//This class creates each small moving particle
class RitualParticle {

    constructor(col, type) {
        this.t = random(TWO_PI);

        this.speed = random(0.003, 0.012);

        this.size = random(4, 10);

        this.life = 420;

        this.col = col;

        this.offset = random(-35, 35);

        this.type = type;
    }

    move() {
        this.t += this.speed + loopSpeed;

        this.life -= 0.35;
    }

    draw() {
        let x = sin(this.t) * 390 * loopSize;

        let y = sin(this.t) * cos(this.t) * 230 * loopSize;

        if (this.type === "pray" || this.type === "reflect") {
            x = x - 35;
        }

        if (this.type === "scroll" || this.type === "post") {
            x = x + 35;
        }

        x += random(-chaosAmount, chaosAmount);

        y += random(-chaosAmount, chaosAmount);

        y += this.offset;

        noStroke();

        fill(red(this.col), green(this.col), blue(this.col), this.life);

        ellipse(x, y, this.size);
    }
}


//This class creates small background particles.
class AmbientParticle {

    constructor() {
        this.x = random(width);

        this.y = random(height);

        this.size = random(1, 3);

        this.speed = random(0.1, 0.4);

        this.alpha = random(30, 90);
    }

    move() {
        this.y += this.speed;

        if (this.y > height) {
            this.y = 0;

            this.x = random(width);
        }
    }

    draw() {
        noStroke();

        fill(120, 160, 255, this.alpha);

        ellipse(this.x, this.y, this.size);
    }
}



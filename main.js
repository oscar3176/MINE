array_1 = [
    "circle",
    "clock",
    "torch",
    "leg",
    "rain",
    "river",
    "line",
    "stitches",
    "octagon",
    "square",
];

timer_counter = 0;
timer_check = "";
time = 0;
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = "";

random_num = Math.floor((Math.random()*array_1.length)+1);
quick_draw_data_set = array_1[random_num];
console.log(quick_draw_data_set);
document.getElementById("objectToBeDrawn").innerHTML = "Object To Be Drawn = " + quick_draw_data_set;

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");

}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById("label").innerHTML = "Label: " + results[0].label;
    document.getElementById("confidence").innerHTML = " Confidence: " + Math.round(results[0].confidence*100) + "%";
}

function update_canvas() {
    
    background("white");
    random_num = Math.floor(Math.random()*array_1.length-1);
    quick_draw_data_set = array_1[random_num];
    sketch = quick_draw_data_set;
    console.log(sketch);
    document.getElementById("objectToBeDrawn").innerHTML = "Object To Be Drawn = " + quick_draw_data_set;
    timer_counter = 0;
    time = 0;
    timer_check = "";
    answer_holder = "";
}


function draw() {
    check_sketch();
    
    if (drawn_sketch == sketch) {
        answer_holder = "set";
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
    }

    strokeWeight(6);
    stroke("black");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    
  
    }

    function check_sketch() {
        
        timer_counter++;
        document.getElementById("timer").innerHTML = "Timer:" + time + " (sec)";
        console.log(time + " (sec)");
        if (timer_counter > 100) {
            timer_counter = 0;
            time++;
        }
        if (time == 120) {
            timer_check = "completed";
        }
        if (timer_check == "completed" || answer_holder == "set") {
            timer_check = "";
            answer_holder = "";
            update_canvas();
        }
         }
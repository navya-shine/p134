img = "";
status = "";
objects = [];
sound = "";

function preload()
{
    sound = loadSound("mixkit-emergency-alert-alarm-1007.wav");
}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Staus : Dectecting Objects";
}
function modelLoaded()
{
    console.log('Model Loaded');
    status = true;
    
}
function draw()
{
    image(video,0,0,380,380);

    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetecter.detect(video , gotPoses);

        for(i=0; i < objects.length; i++)
        {
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :" + objects.length;
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        
        if(objects = "person"){
            document.getElementById("status").innerHTML = "Staus : Dectected";
            sound = song.stop();
        }else{
            document.getElementById("status").innerHTML = "Staus : Not Dectected";
            sound = song.play();
        }

        if(objects.length < 0 ){
            document.getElementById("status").innerHTML = "Staus : Baby Not Dectected";
            sound = song.play();
        }

    }
}
function gotPoses(error, results)
{
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
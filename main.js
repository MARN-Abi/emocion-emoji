prediccion1 = "";
prediccion2 = "";
Webcam.set(
{
width: 350, 
height: 300,
image_format:"jpg", 
jpg_quality: 90
}
);
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML="<img id='capture_image'src='  " + data_uri+"'> ";

});
}
console.log("ml5version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/iHvFsY2tV/model.json", modelLoaded);
function modelLoaded(){
console.log("tu modelo fue cargado");
}

function speak(){
var synth=window.speechSynthesis;
speakdata="La primer prediccion es "+prediccion1;
speakdata2 = "Y la segunda prediccion es"+ prediccion2;
var utterThys=new SpeechSynthesisUtterance(speakdata + speakdata2);
synth.speak(utterThys);
}

function check(){
img=document.getElementById ("capture_image");
classifier. classify(img,gotResult);
}
function gotResult(error,results){
if(error){
console.error(error);
}
else{
console.log (results);
 document.getElementById("result_emotion_name").innerHTML= results[0].label;
 document.getElementById("result_emotion_name2").innerHTML=results[1].label;
 prediccion1=results[0].label;
 prediccion2=results[1].label;
speak();
 if(results[0].label=="Feliz"){
    document.getElementById("update_emoji").innerHTML="&#128522;";
 }
 if (results[0].label=="triste"){
    document.getElementById("update_emoji").innerHTML = "&#128532;";
 }
if (results[0].label== "enojado"){
    document.getElementById("update_emoji").innerHTML= "&#128548; ";
}
if(results[1].label=="Feliz"){
    document.getElementById("update_emoji2").innerHTML="&#128522;";
 }
 if (results[1].label=="triste"){
    document.getElementById("update_emoji2").innerHTML = "&#128532;";
 }
if (results[1].label== "enojado"){
    document.getElementById("update_emoji2").innerHTML= "&#128548; ";
}
}
}
function showStudents(){
  document.getElementById("response").innerHTML = ""
  var request = new XMLHttpRequest;
  request.open("get", "http://127.0.0.1:4567/students");
  request.send();
  request.addEventListener("load", displayResponse, false);
}

function showStudent(){
  document.getElementById("response").innerHTML = ""
  var request = new XMLHttpRequest;
  request.open("get", "http://127.0.0.1:4567/students/3");
  request.send();
  request.addEventListener("load", displaySingleResponse, false);
}

function editStudent(){
  document.getElementById("response").innerHTML = ""
  var request = new XMLHttpRequest;
  request.open("get", "http://127.0.0.1:4567/students/edit/2/JOHN/99/JOHNNY");
  request.send();
  request.addEventListener("load", displaySingleResponse, false);
}

function insertStudent(){
  document.getElementById("response").innerHTML = ""
  var request = new XMLHttpRequest;
  request.open("post", "http://127.0.0.1:4567/students/insert/NEWSTUDENT/100/nstudent");
  request.send();
  request.addEventListener("load", displaySingleResponse, false);
}

function foo(){
  var testP = document.createElement("P");
  var testTxt = document.createTextNode("This is a test");
  testP.appendChild(testTxt);
  document.getElementById("response").appendChild(testP)
}

var displayResponse = function(event){
  objects = JSON.parse(event.target.response);
  for (i = 0; i < objects.length; i ++){
    var p = document.createElement("P");
    var txt = document.createTextNode(JSON.stringify(objects[i]));
    p.appendChild(txt);
    document.getElementById("response").appendChild(p)
  }
}

var displaySingleResponse = function(event){
  object = JSON.parse(event.target.response);
    var p = document.createElement("P");
    var txt = document.createTextNode(JSON.stringify(object));
    p.appendChild(txt);
    document.getElementById("response").appendChild(p)
}
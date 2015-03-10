function showStudents(){
  document.getElementById("response").innerHTML = "";
  var request = new XMLHttpRequest;
  request.open("get", "http://127.0.0.1:4567/students");
  request.send();
  request.addEventListener("load", displayResponse, false);
}

function showStudent(){
  document.getElementById("response").innerHTML = "";
  var formElement = document.getElementById("showStudentForm");
  var request = new XMLHttpRequest;
  request.open("post", "http://127.0.0.1:4567/student");
  request.send(new FormData(formElement));
  request.addEventListener("load", displaySingleResponse, false);
}

function editStudent(){
  document.getElementById("response").innerHTML = ""
  var formElement = document.getElementById("editStudentForm");
  var request = new XMLHttpRequest;
  request.open("post", "http://127.0.0.1:4567/students/edit");
  request.send(new FormData(formElement));
  request.addEventListener("load", displaySingleResponse, false);
  document.getElementById("editStudentForm").reset()
  
}

function insertStudent(){
  document.getElementById("response").innerHTML = ""
  var formElement = document.getElementById("addStudentForm");
  var request = new XMLHttpRequest;
  request.open("post", "http://127.0.0.1:4567/students/insert");
  request.send(new FormData(formElement));
  request.addEventListener("load", displaySingleResponse, false);
  document.getElementById("addStudentForm").reset()
}

function deleteStudent(){
  document.getElementById("response").innerHTML = ""
  var formElement = document.getElementById("deleteStudentForm");
  var request = new XMLHttpRequest;
  request.open("post", "http://127.0.0.1:4567/students/delete");
  request.send(new FormData(formElement));
  request.addEventListener("load", displaySingleResponse, false);
  document.getElementById("deleteStudentForm").reset()
}

function foo(){
  var testP = document.createElement("P");
  var testTxt = document.createTextNode("This is a test");
  testP.appendChild(testTxt);
  document.getElementById("response").appendChild(testP)
}

var displayResponse = function(event){
  var objects = JSON.parse(event.target.response);
  for (i = 0; i < objects.length; i ++){
    var p = document.createElement("P");
    var txt = document.createTextNode(JSON.stringify(objects[i]));
    p.appendChild(txt);
    document.getElementById("response").appendChild(p)
  }
}

var displaySingleResponse = function(event){
  var object = JSON.parse(event.target.response);
  var p = document.createElement("P");
  var txt = document.createTextNode(JSON.stringify(object));
  p.appendChild(txt);
  document.getElementById("response").appendChild(p)
}

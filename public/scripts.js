function showStudents(){
  var request = new XMLHttpRequest;
  request.open("get", "http://127.0.0.1:4567/students");
  request.send();
  request.addEventListener("load", displayStudents, false);
}

function foo(){
  var testP = document.createElement("P");
  var testTxt = document.createTextNode("This is a test");
  testP.appendChild(testTxt);
  document.getElementById("response").appendChild(testP)
}

var displayStudents = function(event){
   objects = JSON.parse(event.target.response);
  for (i = 0; i < objects.length; i ++){
    var p = document.createElement("P");
    var txt = document.createTextNode(JSON.stringify(objects[i]));
    p.appendChild(txt);
    document.getElementById("response").appendChild(p)
  }
}

// function formatObject(object){
//   var objectString = object.id +
// }
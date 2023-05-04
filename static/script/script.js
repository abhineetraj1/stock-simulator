arr_cst=[50];

function generate() {
  var a = Math.floor(Math.random()*20  + 50);
  if (a<55 && a>85) {
    generate();
  } else {
    return a;
  }
}

function crte() {
  var a = document.createElement("div");
  a.className = "stk-bar stk-grn";
  var b = generate();
  if (b < arr_cst[arr_cst.length-1]) {
    a.style="height:"+b+"%;background:red;";
  } else {
    a.style="height:"+b+"%;background:green;";
  }
  document.getElementById("shr").innerHTML=b;
  arr_cst.push(b);
  document.getElementById('stk').appendChild(a);
}

function delete_c() {
  if ((document.getElementsByClassName('stk-bar').length*13) > (screen.width/2)) {
    var n = 0;
    while (n < 5) {
      document.getElementsByClassName('stk-bar')[n].remove();
      n=n+1;
    }
  }
}

setInterval(function () {
  crte();
  delete_c();
},700)

function buy() {
  var c = prompt("Enter amount you want to invest");
  if (parseInt(c) == false) {
    alert("Enter amount in number");
  } else if (c == ""){
    //Do nothing;
  } else if (c == null) {
    //Do nothing;
  } else {
    var c= parseInt(c);
    if (document.getElementById("balance").innerHTML.length > 2) {
      var a = parseInt(document.getElementById("balance").innerHTML);
      var shr_pr= parseInt(document.getElementById("shr").innerHTML);
      if (parseInt(c) > a) {
        alert("Exceeded balance level");
      } else {
        var b = Math.floor((c/shr_pr)*100)/100;
        document.getElementById("shares").innerHTML = b;
        document.getElementById("balance").innerHTML=a-c;
        store(a-c,b);
      }
    }
  }
}
function sell() {
  if (document.getElementById("shares").innerHTML != "0") {
    var a = parseInt(document.getElementById("shares").innerHTML);
    var shr_pr= parseInt(document.getElementById("shr").innerHTML);
    var c = parseInt(document.getElementById("balance").innerHTML);
    var b= a*shr_pr;
    document.getElementById("balance").innerHTML=(Math.floor(b*100)/100)+c;
    document.getElementById("shares").innerHTML=0;
    store((Math.floor(b*100)/100)+c, 0);
  }
}
function store(blc,shr) {
  var a = new XMLHttpRequest();
  if (blc != NaN && shr != NaN) {
    a.open("GET","/store/"+details[0]+"/"+details[1]+"/"+blc+"/"+shr, true);
    a.send();
    a.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         if (a.responseText != "ok") {
          alert("Session expired");
          window.location.href="/";
         }
      }
    };
  }
}

function settings() {
  document.body.onkeypress =null;
  var a = [document.createElement("div") ,document.createElement("p"), document.createElement("input"), document.createElement("button"), document.createElement("hr"),  document.createElement("input"), document.createElement("button"), document.createElement("hr"), document.createElement("button"), document.createElement("button")];
  a[0].id="settings-cont";
  a[1].style="text-align: center;font-size: 25px;color: white;";
  a[1].innerHTML = "Settings";
  a[2].className = "settings-input";
  a[2].type="text";
  a[2].name="username";
  a[2].placeholder="Enter new username";
  a[3].className="settings-btn";
  a[3].innerHTML="Change";
  a[3].onclick = function () {
    var m = new XMLHttpRequest();
    m.open("GET","/change/"+details[0]+"/"+details[1]+"/user/"+document.getElementsByClassName("settings-input")[0].value);
    m.send();
    m.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (m.responseText == "ok") {
          alert("Username changed");
          document.getElementsByClassName("settings-input")[0].value="";
        }
      }
    }
  }
  a[5].className="settings-input";
  a[5].type="password";
  a[5].name="password";
  a[5].placeholder="Enter new password";
  a[6].className="settings-btn";
  a[6].innerHTML="Change";
  a[6].onclick = function () {
    var m = new XMLHttpRequest();
    m.open("GET","/change/"+details[0]+"/"+details[1]+"/pss/"+document.getElementsByClassName("settings-input")[1].value);
    m.send();
    m.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (m.responseText == "ok") {
          alert("Password changed");
          document.getElementsByClassName("settings-input")[1].value="";
        }
      }
    }
  }
  a[8].className="settings-btn";
  a[8].style="background: red;";
  a[8].innerHTML="Delete your account";
  a[8].onclick=function () {
    var m = document.createElement("a");
    m.href="/delete/"+details[0]+"/"+details[1];
    m.click();
  }
  a[9].className="settings-btn";
  a[9].style="background: red;";
  a[9].innerHTML="Close settings";
  a[9].onclick = function () {
    document.getElementById('settings-cont').remove();
    document.body.onkeypress = function (e) {
    if (e.key == "b") {
      buy();
    } else if (e.key=="s"){
      sell();
    } else {
      null;
    }
  }
  }
  a[0].appendChild(a[1]);
  a[0].appendChild(a[2]);
  a[0].appendChild(a[3]);
  a[0].appendChild(a[4]);
  a[0].appendChild(a[5]);
  a[0].appendChild(a[6]);
  a[0].appendChild(a[7]);
  a[0].appendChild(a[8]);
  a[0].appendChild(a[9]);
  document.body.appendChild(a[0]);
}
document.body.onkeypress = function (e) {
  if (e.key == "b") {
    buy();
  } else if (e.key=="s"){
    sell();
  } else {
    null;
  }
}
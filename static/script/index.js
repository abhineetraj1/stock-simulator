function sign(g) {
	var a = [document.createElement("form"),document.createElement("input"),document.createElement("input"),document.createElement("button"),document.createElement("p"), document.createElement("button")];
	a[0].id="frm";
	a[0].method="POST";
	a[4].style="font-size:20px;font-weight:bold;text-align:center;"
	a[1].className="inp";
	a[2].className="inp";
	a[3].className="fm-btn";
	a[1].placeholder="Enter username";
	a[1].name="username";
	a[2].placeholder="Enter password";
	a[2].type="password";
	a[2].name="password";
	a[5].innerHTML="Close";
	a[5].className="fm-btn";
	a[5].onclick = function (e) {
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('frm').remove();
	}
	a[0].appendChild(a[4]);
	a[0].appendChild(a[1]);
	a[0].appendChild(a[2]);
	a[0].appendChild(a[3]);
	a[0].appendChild(a[5]);
	document.body.appendChild(a[0]);
	if (g == "in") {
		a[0].action="/signin";
		a[4].innerHTML="Sign in";
		a[3].innerHTML = "Sign in";
	} else {
		a[3].innerHTML = "Sign up";
		a[0].action="/signup";
		a[4].innerHTML="Sign up";
	}
}
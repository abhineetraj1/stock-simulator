import os
import shutil
from flask import *
from flask import render_template

app = Flask(__name__, static_folder="static", template_folder=os.getcwd())

@app.route("/", methods=["GET","POST"])
def index_o():
	if request.method == "GET":
		return render_template("index.html", msg="none")
	else:
		w=[request.form["email"], request.form["message"]]
		open("contact.txt","a").write(f"\n\nEmail:{w[0]}\nMessage:{w[1]}")
		return render_template("index.html", msg="none")

@app.route("/signup", methods=["GET","POST"])
def signup():
	if request.method == "POST":
		w = [request.form["username"],request.form["password"]]
		if w[0] in os.listdir("accounts"):
			return render_template("index.html", msg="Account with this username already exists")
		else:
			os.mkdir(f"accounts/{w[0]}")
			open(f"accounts/{w[0]}/pass.txt","w").write(w[1])
			open(f"accounts/{w[0]}/balance.txt","w").write("10000")
			open(f"accounts/{w[0]}/share.txt","w").write("0")
			return render_template("dashboard.html",username=w[0], password=w[1],balance="10000", share="0")
	else:
		return render_template("index.html", msg="none")

@app.route("/signin", methods=["GET","POST"])
def signin():
	if request.method == "GET":
		return render_template("index.html",msg="none")
	else:
		w=[request.form["username"],request.form["password"]]
		if w[0] not in os.listdir("accounts"):
			return render_template("index.html", msg="Account with this username doesn't exist")
		else:
			if open(f"accounts/{w[0]}/pass.txt","r").read() == w[1]:
				return render_template("dashboard.html",username=w[0], password=w[1],balance=open(f"accounts/{w[0]}/balance.txt","r").read(), share=open(f"accounts/{w[0]}/share.txt","r").read())
			else:
				return render_template("index.html", msg="Your password is wrong")

@app.route("/store/<user>/<pss>/<amt>/<shr>")
def store(user,pss,amt,shr):
	if user not in os.listdir("accounts"):
		return "account not found"
	else:
		if open(f"accounts/{user}/pass.txt","r").read() == pss:
			open(f"accounts/{user}/balance.txt","w").write(amt)
			open(f"accounts/{user}/share.txt","w").write(shr)
			return "ok"
		else:
			return "password error"

@app.route("/change/<user>/<pss>/<typ>/<nw>")
def change_o(user, pss, typ, nw):
	if user not in os.listdir("accounts"):
		return redirect("/")
	else:
		if open(f"accounts/{user}/pass.txt","r").read() == pss:
			if typ == "pss":
				open(f"accounts/{user}/pass.txt","w").write(nw)
				return "ok"
			elif typ == "user":
				if nw not in os.listdir("accounts"):
					os.rename(f"accounts/{user}", f"accounts/{nw}")
					return "ok"
				else:
					return "already exists"
		else:
			return redirect("/")

@app.route("/delete/<user>/<pss>")
def delete(user, pss):
	if user not in os.listdir("accounts"):
		return redirect("/")
	else:
		if open(f"accounts/{user}/pass.txt","r").read() == pss:
			shutil.rmtree(f"accounts/{user}")
			return redirect("/")
		else:
			return redirect("/")

@app.errorhandler(404)
def err(e):
	return render_template("404.html")

if __name__ == '__main__':
	app.run()
# Made by Abhineet Raj (htttps://github.com/abhineetraj1) Copyright@2023
let dis = document.querySelector(".display"),
	disImg = document.querySelector(".display-image"),
	note = document.querySelector("#note"),
	btnP = document.querySelector("#btnP"),
	membres = document.querySelector(".people svg"),
	memb = document.querySelector(".peo-info"),
	comments = document.querySelector(".comments svg"),
	crud = document.querySelector(".crud"),
	myName = document.querySelector("#user"),
	myComment = document.querySelector("#comment"),
	post = document.querySelector("#add"),
	container = document.querySelector(".container"),
	emoji = document.querySelectorAll(".emoji span"),
	crudDis = document.querySelectorAll(".display-crud");
let svgDark = document.querySelector(".darkMode svg"),
	svgColor = document.querySelector(".colorMode svg");

//////---------dark mode------//////
const btnDark = document.querySelector("#btn1");
btnDark.addEventListener("click", (e) => {
	if (btnDark.checked == true) {
		document.body.setAttribute("data-theme", "dark");
		svgDark.style.color = "white";
	} else {
		document.body.setAttribute("data-theme", "");
		svgDark.style.color = "black";
	}
});

/////-----------color mode --------------///
const btnColor = document.querySelector("#btn2");
btnColor.addEventListener("click", (e) => {
	if (btnColor.checked == true) {
		document.body.setAttribute("data-theme", "color");
		svgDark.style.color = "black";
		svgColor.style.fill = "white";
	} else {
		document.body.setAttribute("data-theme", "");
		svgColor.style.fill = "rgba(0, 255, 157, 0.979)";
	}
});
//----------JS Pure--------//
membres.addEventListener("click", () => {
	memb.classList.add("active");
	dis.classList.add("active");
	container.style.display = "none";
	window.addEventListener("click", (e) => {
		if (e.target == memb) {
			memb.classList.remove("active");
		}
	});
});

btnP.addEventListener("click", () => {
	let inputP = document.querySelector("#inputP");

	if (inputP.value == "") {
		inputP.style.border = "2px solid red";
	} else {
		//disImg.classList.add("active");
		memb.classList.remove("active");
		disImg.style.boxShadow = "0 0 30px black";
		note.classList.add("active");
		disImg.style.backgroundImage = "url('27.jpg')";

		if (inputP.value === "day") {
			disImg.style.backgroundImage = "url('friends.jpg')";
			note.innerHTML = "chkon sawrna had tswira ?";
		}
		if (inputP.value === "jo") {
			disImg.style.backgroundImage = "url('jawad.jpg')";
			note.innerHTML = "a7san djo f 3alam ";
		}
		if (inputP.value === "rabie") {
			disImg.style.backgroundImage = "url('rabi3.jpg')";
			note.innerHTML = "Hello My teacher";
		}
		if (inputP.value === "nilo") {
			disImg.style.backgroundImage = "url('nilo.jpg')";
			note.innerHTML = "My little Sister";
		}
		if (inputP.value === "simo") {
			disImg.style.backgroundImage = "url('simo.jpg')";
			note.innerHTML = "labas labas awald KHALTI";
		}
		if (inputP.value === "7km") {
			disImg.style.backgroundImage = "url('7km.jpg')";
			note.innerHTML = "ba9a 4ir 7 KM";
		}
		if (inputP.value === "dahiya") {
			disImg.style.backgroundImage = "url('fdqh.jpg')";
			note.innerHTML = "wach wach";
		}
		if (inputP.value === "za3im") {
			disImg.style.backgroundImage = "url('za3im.jpg')";
			note.innerHTML = "tbarkLAH 3la za3im";
		}
		if (inputP.value === "grand") {
			disImg.style.backgroundImage = "url('grand.jpg')";
			note.innerHTML = "hadchi bomstak hhh";
		}
                if (inputP.value === "ismail") {
			disImg.style.backgroundImage = "url('ismail.jpg')";
			note.innerHTML = "kijak hadchi aba ismail";
		}
	}
});
//----------------------CRUD DB------------------------///

//Write Dynamic Data
comments.addEventListener("click", () => {
	crud.classList.add("active");
	dis.classList.remove("active");
	container.style.display = "inline";
	window.addEventListener("click", (e) => {
		if (e.target == crud && e.target != emoji) {
			crud.classList.remove("active");
		}
	});
});

crud.addEventListener("submit", (e) => {
	e.preventDefault();

	let Name = crud.name.value;
	let Comment = crud.comment.value;
	if (Name == "") {
		crud.name.placeholder = "write your Name!";
		myName.style.border = "2px solid red";
		myName.style.fontWeight = "100";
	} else {
		myName.style.border = "none";

		if (Comment == "") {
			crud.comment.placeholder = "write..";
		} else {
			crud.classList.remove("active");
			writeUser(Name, Comment);
			crud.reset();
			console.log(Comment);
		}
	}
});

myComment.addEventListener("input", () => {
	let Comment = crud.comment.value;
	let test =
		Comment.length > 0
			? (post.style.opacity = "1")
			: (post.style.opacity = "0.1");
});
emoji.forEach((em) => {
	em.addEventListener("click", (e) => {
		let emo = e.currentTarget.dataset.sett;
		//myComment.value = emo;
		myComment = document.querySelector("#comment");
		myComment.value += emo;
		let test =
			myComment.value.length > 0
				? (post.style.opacity = "1")
				: (post.style.opacity = "0.1");
		myComment.focus();
	});
});
var database = firebase.database();
var usersRef = firebase.database().ref("users/");
//Write Data
function writeUser(name, comment) {
	let userId = usersRef.push().key;
	console.log(name);
	usersRef
		.child(userId)
		.set({
			name: name,
			comment: comment,
		})
		.then(
			(onFulllFilled) => {
				console.log("writed");
				crud.reset();
			},
			(onRejected) => {
				console.log(onRejected);
			}
		);
}
//Read Data
usersRef.on("value", (snapshot) => {
	const users = snapshot.val();
	container.innerHTML = "";
	for (const user in users) {
		let dr = `
	<div class="display-crud"data-id="${user}">
		<div class="del-name">
			<h2 class="user-name">${users[user].name}</h2>
			<span class="delete"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
			<title>Trash
			</title>
			<path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32">
			</path>
			<path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352">
			</path>
			<path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32">
			</path>
			</svg></span>
		</div>
	    <p class="para">${users[user].comment}</p>
	</div>`;
		container.innerHTML += dr;
	}
	//Delete Data
	let deleteBtns = document.querySelectorAll(".delete");
	deleteBtns.forEach((delbtns) => {
		delbtns.addEventListener("click", () => {
			let userID = delbtns.parentElement.parentElement.dataset.id;
			let result = confirm("are you sure?");
			if (result) {
				usersRef
					.child(userID)
					.remove()
					.then(() => {
						console.log("deleted");
					});
			}
		});
	});
});

const url = "http://localhost:7070/signUp";

const form = {
	name: document.querySelector("#name"),
	surname: document.querySelector("#lname"),
	gender: document.querySelector("#gender"),
	email: document.querySelector("#email"),
	passwordHash: document.querySelector("#password"),
	img: document.getElementById("#pic").files[0],
};

const formData = new FormData();
formData.append("img", selectedImage);
formData.append(
	"body",
	`{\"name\": \"${form.name.value}\", \"surname\":\"${form.surname.value}\", \"gender\": \"${form.gender.value}\", \"email\": \"${form.email.value}\", \"passwordHash\": \"${form.passwordHash.value}\",}`
);
const config = {
	headers: {
		"Content-Type": "multipart/form-data",
		Accept: "application/json",
		type: "formData",
	},
};
let button = form.submit.addEventListener("click", (e) => {
	e.preventDefault();
	// var token ;
	fetch(url, {
		method: "POST",
		config,
		formData,
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				alert("Error");
			} else {
				window.location.replace("../Html/registarionComplete.html");
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

////Empty fields Validation
function Validate() {
	if (document.getElementById("name").value == "") {
		var typ = document.getElementById("first");
		typ.style.border = "0.4px solid red";
		typ.addEventListener("focus", myFocusFunction, true);
		return false;
	}
	if (document.getElementById("lname").value == "") {
		var typ = document.getElementById("last");
		typ.style.border = "0.4px solid red";
		typ.addEventListener("focus", myFocusFunction, true);
		return false;
	}
	if (document.getElementById("gender").value == "") {
		var typ = document.getElementById("genders");
		typ.style.border = "0.4px solid red";
		typ.addEventListener("focus", myFocusFunction, true);
		return false;
	}
	if (document.getElementById("pic").value == "") {
		var typ = document.getElementById("file");
		typ.style.border = "0.4px solid red";
		typ.addEventListener("focus", myFocusFunction, true);
		return false;
	}
	if (document.getElementById("password").value == "") {
		var typ = document.getElementById("pass");
		typ.style.border = "0.4px solid red";
		typ.addEventListener("focus", myFocusFunction, true);
		return false;
	}
	return true;

	function myFocusFunction() {
		document.getElementById("first").style.border = "red";
		document.getElementById("last").style.border = "red";
		document.getElementById("genders").style.border = "red";
		document.getElementById("file").style.border = "red";
		document.getElementById("pass").style.border = "red";
	}
}

//Email Validation
function ValidateEmail(inputText) {
	var typ = document.getElementById("mail");
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText.value.match(mailformat)) {
		return true;
	} else {
		typ.style.border = "0.4px solid red";
		typ.addEventListener("focus", myFocusFunction, true);
		return false;
	}
	function myFocusFunction() {
		document.getElementById("mail").style.border = "red";
	}
}

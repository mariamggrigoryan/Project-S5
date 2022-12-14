const url = "http://localhost:7070/signIn";
const form = {
	email: document.querySelector("#email"),
	password: document.querySelector("#password"),
	submit: document.querySelector("#btn2"),
};

let button = form.submit.addEventListener("click", (e) => {
	e.preventDefault();
	fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: form.email.value,
			password: form.password.value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				alert("Error Password or Username");
			} else {
				window.location.replace("../../Stylist/HTML/stylistMain.html");
			}
			localStorage.setItem("token", `${data.token}`);
		})
		.catch((err) => {
			console.log(err);
		});
});

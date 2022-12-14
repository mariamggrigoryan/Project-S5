const URL1 = "http://localhost:7070/stylist";

export async function loadUser() {
	fetch(URL1, {
		method: "GET",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-token": localStorage.token,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("data", data);
			if (data.error) {
				console.log("Error from getting User");
			}
			var first_name = data.name;
			var last_name = data.surname;
			var fullName = first_name + " " + last_name;
			var avatar = data.avatarUrl;
			const fullname = document.getElementById("fullname");
			fullname.innerHTML += fullName;
		})
		.catch((err) => {
			console.log(err);
		});
}
